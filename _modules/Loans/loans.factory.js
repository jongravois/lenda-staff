(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('LoansFactory', LoansFactory);

    LoansFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function LoansFactory($http, $q, API_URL) {
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
                crops: getCrops(loan),
                //expenses: getCropExpenses(loan),
                //full_farm_exps: getLoanExpenses(loan),
                loancrops: getLoanCrops(loan),
                insurance: getInsurance(loan)
            })
                .then(function (updatedData) {
                    angular.extend(loan, updatedData);

                    if(testComments(loan, user) !== 0) {
                        loan.has_comment = true;
                    } else {
                        loan.has_comment = false;
                    }

                    if(testVote(loan, user) != 0) {
                        loan.vote_pending = true;
                    } else {
                        loan.vote_pending = false;
                    }
                    return loan;
                });
        }
        //////////
        function flattenExpenses(expenses) {
            var flattened = [];
            angular.forEach(expenses, function (exp) {
                var single = {
                    cat_id: Number(exp.cat_id),
                    expense: exp.expense,
                    loancrop_id: exp.loancrop_id,
                    crop: exp.loancrops.crop.crop,
                    name: exp.loancrops.crop.name,
                    acres: Number(exp.loancrops.acres),
                    arm: Number(exp.arm_adj),
                    dist: Number(exp.dist_adj),
                    other: Number(exp.other_adj),
                    per_acre: Number(exp.arm_adj) + Number(exp.dist_adj) + Number(exp.other_adj),
                    calc_arm: Number(exp.arm_adj) * Number(exp.loancrops.acres),
                    calc_dist: Number(exp.dist_adj) * Number(exp.loancrops.acres),
                    calc_other: Number(exp.other_adj) * Number(exp.loancrops.acres),
                    calc_total: (Number(exp.arm_adj) + Number(exp.dist_adj) + Number(exp.other_adj)) * Number(exp.loancrops.acres)
                };
                this.push(single);
            }, flattened);
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
        function getCropExpenses(loan) {
            var expenses = loan.expenses;
            var farmexpenses = [];

            var exps = {
                byCat: processExpsByCat(flattenExpenses(expenses)),
                byCrop: processExpsByCrop(flattenExpenses(expenses)),
                byEntry: flattenExpenses(expenses),
                totals: processExpsTotals(flattenExpenses(expenses), farmexpenses)
            };

            console.log('Expenses: ', exps);
            return (exps);
        }
        function getLoanExpenses(loan) {
            var farmexpenses = loan.farmexpenses;
            var ffExps = [];
            var crops_in_loan = getCrops(loan);
            return ffExps;
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
        function processExpsByCat(expenses) {
            var grped = _.chain(expenses).groupBy('expense').value();
            var cats = _.uniq(_.pluck(expenses, 'expense'));
            //corn.arm*corn.acres + bean.arm*bean.acres etc
            var totsByCat = [];
            angular.forEach(cats, function (cat) {
                if (!grped[cat]) {
                    totsByCat.push([]);
                } else {
                    var col = grped[cat];
                    //console.log(col);
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
            var grped = _.chain(expenses).groupBy('expense').value();
            var cats = _.uniq(_.pluck(expenses, 'expense'));

            var totsByCat = [];
            angular.forEach(cats, function (cat) {
                if (!grped[cat]) {
                    totsByCat.push([
                        {
                            arm: 0,
                            dist: 0,
                            other: 0,
                            total: 0
                        }
                    ]);
                } else {
                    var col = grped[cat];
                    //console.log(col);
                    var colTots = [
                        {
                            arm: _.sumCollection(col, 'calc_arm'),
                            dist: _.sumCollection(col, 'calc_dist'),
                            other: _.sumCollection(col, 'calc_other'),
                            total: _.sumCollection(col, 'calc_total')
                        }
                    ];
                    totsByCat.push(colTots);
                }
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
        function testComments(loan, user) {
            if(loan.comments.length !== 0) {
                return _.each(loan.comments, function(it){
                    return _.each(it.status, function(i){
                        if(i.recipient_id === user.id && i.status === 'pending') {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                });
            } else {
                return 0;
            }
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