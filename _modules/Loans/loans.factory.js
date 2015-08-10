(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('LoansFactory', LoansFactory);

    LoansFactory.$inject = ['$http', '$q', 'API_URL', 'AppFactory'];

    /* @ngInject */
    function LoansFactory($http, $q, API_URL, AppFactory) {
        var user = JSON.parse(localStorage.getItem('user'));
        var publicAPI = {
            getLoan: getLoan,
            getLoans: getLoans
        };
        return publicAPI;

        //////////
        function getLoan(id) {
            return getLoans().
                then(function(loans) {
                    return _.find(loans, function(i) {
                        return i.id == id;
                    });
                });
        }
        function getLoans() {
            return $http.get(API_URL + 'loans').then(getLoansData);
        }
        //////////
        function getLoansData(response) {
            var allLoans = response.data.data;
            return $q.all(allLoans.map(updateLoanData));
        }
        function updateLoanData(loan) {
            return $q.all({
                collateral: processCollateral(loan.other_collateral),
                crops: getCrops(loan),
                expenses: getExpenses(loan),
                loancrops: getLoanCrops(loan),
                insurance: getInsurance(loan),
                parsedComments: structureComments(loan),
                priorlien: processPriorLien(loan.prior_liens),
            })
                .then(function (updatedData) {
                    angular.extend(loan, updatedData);

                    if(testComments(loan, user) === 0) {
                        loan.has_comment = false;
                    } else if(testComments(loan, user) === 1){
                        loan.has_comment = true;
                    }

                    if(testVote(loan, user) != 0) {
                        loan.vote_pending = true;
                    } else {
                        loan.vote_pending = false;
                    }

                    //console.log('FromLoanFactory', loan);
                    return loan;
                });
        }
        //////////
        function flattenExpenses(expenses, loan) {
            var flattened = [];
            var all_acres = loan.fins.crop_acres;
            //console.log('ACRES', all_acres );

            _.map(expenses, function(item){
                var crop = item.crop.crop;
                var acres = all_acres[item.crop_id].acres;

                var stub = _.pick(item, [
                    'id',
                    'loan_id',
                    'loancrop_id',
                    'cat_id',
                    'expense',
                    'arm_adj',
                    'dist_adj',
                    'other_adj'
                ]);
                stub.arm = Number(stub.arm_adj);
                stub.dist = Number(stub.dist_adj);
                stub.other = Number(stub.other_adj);
                stub.per_acre = stub.arm + stub.dist + stub.other;
                stub.crop = crop;
                stub.acres = acres;
                stub.calc_arm = stub.arm * acres;
                stub.calc_dist = stub.dist * acres;
                stub.calc_other = stub.other * acres;
                stub.calc_total = stub.per_acre * acres;

                var finalpass = _.omit(stub, [
                        'arm_adj', 'dist_adj', 'other_adj'
                    ]);
                console.log('FINAL PASS', finalpass);

                flattened.push(finalpass);
            });

            //console.log('FLAT', flattened );
            return flattened;
        }
        function getCrops(loan) {
            var crops = [];
            _.each(loan.loancrops, function(item){
                var newbie = {
                    crop_id: item.crop.id,
                    crop: item.crop.crop
                };
                //crops.push(item.crops.crop);
                crops.push(newbie);
            });
            return crops;
        }
        function getExpenses(loan) {
            var expenses = loan.expenses;
            var farmexpenses = loan.farmexpenses;

            var exps = {
                byCat: processExpsByCat(flattenExpenses(expenses, loan)),
                byCrop: processExpsByCrop(flattenExpenses(expenses, loan)),
                byEntry: flattenExpenses(expenses, loan),
                totals: processExpsTotals(flattenExpenses(expenses, loan), farmexpenses)
            };

            //console.log('Expenses: ', exps);
            return (exps);
        }
        function getInsurance(loan) {
            var insurance = [];
            return insurance;
        }
        function getLoanCrops(loan) {
            return $http.get(API_URL + 'loans/' + loan.id + '/loancrops')
                .then(function(rsp){
                    return rsp.data.data;

                });
        }
        function processCollateral(obj) {
            var all = _.chain(obj).groupBy('type').value();
            return all;
        }
        function processExpsByCat(expenses) {
            //_.mapValues(my_obj, 'field')
            //console.log('XPS', expenses);
            if(!expenses) { return []; }
            var grped = _.chain(expenses).groupBy('expense').value();
            var cats = _.uniq(_.pluck(expenses, 'expense'));
            //corn.arm*corn.acres + bean.arm*bean.acres etc
            var totsByCat = [];
            angular.forEach(cats, function (cat) {
                if (!grped[cat]) {
                    totsByCat.push([]);
                } else {
                    var col = grped[cat];
                    //console.log('ColTots', col);
                    var colTots = {
                        cat_id: _.pluckuniq(col, 'cat_id'),
                        expense: _.pluckuniq(col, 'expense'),
                        acre_dist: _.sumCollection(col, 'dist'),
                        acre_other: _.sumCollection(col, 'other'),
                        acre_total: _.sumCollection(col, 'per_acre'),
                        calc_arm: _.sumCollection(col, 'calc_arm'),
                        calc_dist: _.sumCollection(col, 'calc_dist'),
                        calc_other: _.sumCollection(col, 'calc_other'),
                        calc_total: _.sumCollection(col, 'calc_total')
                    };
                    totsByCat.push(colTots);
                }
            });
            return totsByCat;
        }
        function processExpsByCrop(expenses) {
            var grped = _.chain(expenses).groupBy('crop').value();

            var byCrop = [];
            angular.forEach(grped, function (crop) {
                var byExp = [];
                angular.forEach(crop, function (exp) {
                    this.push(exp);
                }, byExp);
                this.push(byExp);
            }, byCrop);
            return byCrop;
        }
        function processExpsTotals(expenses, farmexpenses) {
            return {
                byCat: processExpsTotalsByCat(expenses),
                byCrop: processExpsTotalsByCrop(expenses),
                byLoan: processExpsTotalsByLoan(expenses, farmexpenses)
            };
        }
        function processExpsTotalsByCat(expenses) {
            if(!expenses) {return []; }
            var grped = _.chain(expenses).groupBy('expense').value();
            //console.log('GRPED', grped);
            var cats = _.uniq(_.pluck(expenses, 'expense'));

            var totsByCat = [];
            angular.forEach(cats, function (cat) {
                if (!grped[cat]) {
                    totsByCat.push([
                        {
                            calc_arm: 0,
                            calc_dist: 0,
                            calc_other: 0,
                            calc_total: 0
                        }
                    ]);
                } else {
                    var col = grped[cat];
                    //console.log('TOTbyCAT', cat, col);
                    var colTots = [
                        {
                            expense: cat,
                            calc_arm: _.sumCollection(col, 'calc_arm'),
                            calc_dist: _.sumCollection(col, 'calc_dist'),
                            calc_other: _.sumCollection(col, 'calc_other'),
                            calc_total: _.sumCollection(col, 'calc_total')
                        }
                    ];
                    totsByCat.push(colTots);
                }
                //console.log('ProcessedTotsByCat', totsByCat);
            });

            return totsByCat;
        }
        function processExpsTotalsByCrop(expenses) {
            var grped = _.chain(expenses).groupBy('crop').value();
            var crops = AppFactory.getAllCrops();

            var totsByCrop = [];
            angular.forEach(crops, function (crop) {
                if (!grped[crop]) {
                    totsByCrop.push([
                        {
                            acre_arm: 0,
                            acre_dist: 0,
                            acre_other: 0,
                            acre_total: 0,
                            calc_arm: 0,
                            calc_dist: 0,
                            calc_other: 0,
                            calc_total: 0
                        }
                    ]);
                } else {
                    var col = grped[crop];
                    //console.log(col);
                    var colTots = [
                        {
                            acre_arm: _.sumCollection(col, 'arm'),
                            acre_dist: _.sumCollection(col, 'dist'),
                            acre_other: _.sumCollection(col, 'other'),
                            acre_total: _.sumCollection(col, 'per_acre'),
                            calc_arm: _.sumCollection(col, 'calc_arm'),
                            calc_dist: _.sumCollection(col, 'calc_dist'),
                            calc_other: _.sumCollection(col, 'calc_other'),
                            calc_total: _.sumCollection(col, 'calc_total')
                        }
                    ];
                    totsByCrop.push(colTots);
                }
            });
            return totsByCrop;
        }
        function processExpsTotalsByLoan(expenses, farmexpenses) {
            //console.log(expenses, farmexpenses);
            return {
                arm: _.sumCollection(expenses, 'calc_arm'),
                dist: _.sumCollection(expenses, 'calc_dist'),
                other: _.sumCollection(expenses, 'calc_other'),
                total: _.sumCollection(expenses, 'calc_total')
            };
        }
        function processPriorLien(liens) {
            var merged = {
                lienholder: 'Total',
                projected_crops: _.sumCollection(liens, 'projected_crops'),
                insurance: _.sumCollection(liens, 'ins_over_discount'),
                lientotal: _.sumCollection(liens, 'total')
            };
            liens.total = merged;
            return liens;
        }
        function structureComments(loan) {
            if(!loan.comments) {return []; }
            var parsed = AppFactory.parseComments(loan.comments);
            return parsed;
        }
        function testComments(loan, user) {
            if(loan.comments.length === 0) { return 0; }

            var result = 0;

            _.each(loan.comments, function(it){
                return _.each(it.status, function(i){
                    if(i.recipient_id === user.id && i.status === 'pending') {
                        result = 1;
                    }
                });
            });

            return result;
        }
        function testVote(loan, user) {
            if (loan.committee.length !== 0) {
                _.each(loan.committee, function(i){
                    if(i.vote_status === 'pending' && Number(i.user_id) === Number(user.id)) {
                        loan.vote_pending = true;
                    } else {
                        return 0;
                    }
                });
            } else {
                return 0;
            }
        }
    } // end factory
})();