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
            getLoans: getLoans,
            getPrerequisites: getPrerequisites
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
                insurance: getInsurance(loan),
                loancrops: processLoanCrops(loan),
                parsedComments: structureComments(loan),
                priorlien: processPriorLien(loan.prior_liens)
                /*,
                 xcols: processXCols(loan.xcols)*/
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
        function checkStax(policies) {
            var added = _.each(policies, function(item) {
                item.stax = !!~item.options.indexOf('STAX');
                item.showStax = false;
                return item;
            });
            return added;
        }
        function flattenExpenses(expenses, loan) {
            var flattened = [];
            var all_acres = loan.fins.crop_acres;
            //console.log('ACRES', all_acres );

            _.map(expenses, function(item){
                var crop = item.crop.crop;
                var acres = all_acres[Number(item.crop.id)-1].acres;
                //console.log('ACRES IN MAP', acres, all_acres, item);

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
                //console.log('FINAL PASS', finalpass);

                flattened.push(finalpass);
            });

            //console.log('FLAT', flattened );
            return flattened;
        }
        function getCountiesInLoan(loan) {
            var parishes = [];
            _.each(loan.farms, function(item){
                //console.log('FARMS', item);
                var newbie = {
                    county_id: item.county_id,
                    county: item.county.county,
                    state_id: item.county.state_id,
                    state_abr: item.county.state.abr,
                    state: item.county.state.state,
                    locale: item.county.locale
                };
                if(!_.some(parishes, {'county_id' : newbie.county_id})) {
                    parishes.push(newbie);
                }
            });
            var counties = _.chain(parishes)
                .groupBy('county')
                .value();
            return counties;
        }
        function getCountyCrops(loan) {
            return 999999;
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
            var policyList = loan.inspols;
            //console.log('Policies', policyList);

            var ins = {
                agencies: processAgencies(policyList),
                byCrop: processInsByCrop(loan),
                database: processForInsDB(policyList),
                //not Working
                nonrp: processNonRPInsurance(policyList),
                policies: checkStax(policyList),
                //not Working
                totals: processInsTotals(processInsByCrop(policyList))
            };
            //console.log('LoanInsurance: ', ins);
            return ins;
        }
        function getPrerequisites(id) {
            return $http.get(API_URL + 'loans/' + id + '/prereqs');
        }
        function makeFarmPractice(obj, crop, loan) {
            console.log('MFP', obj, crop);
            var xps = {
                //TODO: Not working
                arm: loan.fins.arm_crop_commit[obj.crop_crop],
                dist: loan.fins.dist_crop_commit[obj.crop_crop],
                other: loan.fins.other_crop_commit[obj.crop_crop]
            };

            var retro = {
                expenses: xps,
                c_crop_disc: Number(loan.fins.discounts.percent_crop), //√
                c_fsa_disc: Number(loan.fins.discounts.percent_fsa), //√
                c_cropins_disc: Number(loan.fins.discounts.percent_ins), //√
                c_nonrp_disc: Number(loan.fins.discounts.percent_nonrp), //√
                c_sco_disc: Number(loan.fins.discounts.percent_suppins), //√
                c_acres: Number(obj.acres), //√
                c_share_rent: Number(obj.share_rent), //√
                c_aph: Number(obj.aph), //√
                c_ins_type: obj.ins_type, //√
                c_ins_level: Number(obj.ins_level), //√
                c_ins_share: Number(obj.ins_share), //√
                c_ins_price: Number(obj.ins_price), //√
                c_ins_premium: Number(obj.ins_premium), //√
                c_supp_coverage: 'STAX', //√
                c_loss_trigger: 'Loss', //√
                c_cov_range: 'Cov', //√
                c_prot_factor: 'Prot', //√
                c_exp_yield: 'XYld', //√
                c_exp_revenue: 'XRev', //√
                c_prod_yield: Number(obj.prod_yield), //√
                c_prod_share: Number(obj.prod_share), //√
                c_prod_price: Number(obj.prod_price), //√
                c_var_harv: Number(obj.var_harv), //X
                c_rebate: Number(obj.rebate) //X
            };
            //console.log('RETRO', retro);
            return retro;
        }
        function makePractice(crop_id) {
            return {
                expenses: {
                    arm: 0,
                    dist: 0,
                    other: 0
                },
                c_crop_id: crop_id,
                c_acres: 0,
                c_aph: 0,
                c_arm_fee: 0,
                c_budget_arm: 0,
                c_budget_dist: 0,
                c_budget_other: 0,
                c_cf: 0,
                c_commit_arm: 0,
                c_commit_dist: 0,
                c_crop_disc: 0,
                c_cropins_disc: 0,
                c_disc_collateral: 0,
                c_disc_crop: 0,
                c_disc_fsa: 0,
                c_disc_ins: 0,
                c_disc_sco: 0,
                c_fsa_disc: 0,
                c_ins_disc_crop: 0,
                c_ins_guarantee: 0,
                c_ins_level: 0,
                c_ins_premium: 0,
                c_ins_price: 0,
                c_ins_share: 0,
                c_ins_type: "",
                c_ins_value: 0,
                c_interest_arm: 0,
                c_interest_dist: 0,
                c_nonrp_disc: 0,
                c_prod_price: 0,
                c_prod_rev: 0,
                c_prod_rev_adj: 0,
                c_prod_share: 0,
                c_prod_yield: 0,
                c_rebate: 0,
                c_rm: 0,
                c_sco_disc: 0,
                c_sco_max: 0,
                c_share_rent: 0,
                c_var_harv: 0
            };
        }
        function processAgencies(policies) {
            var result = [];
            var exists = {};
            var arrayOfFinalProduct = [];
            var agentExists = {};

            var firstPass = _.forEach(policies, function (policy) {
                if (!exists[policy.agent_id]) {
                    result.push(policy);
                    exists[policy.agent_id] = true;
                }
            });
            //console.log('RESULT', result);

            var secondPass = _.forEach(result, function (policy) {
                var idealProduct = {};
                var allreadyHappend = _.find(arrayOfFinalProduct, {'id': policy.agency_id});
                if (!_.isUndefined(allreadyHappend)) {
                    allreadyHappend.agents.push({
                        id: policy.agent_id,
                        agent: policy.agent.agent,
                        agent_email: policy.agent_email,
                        agent_phone: policy.agent_phone
                    });
                } else if (!agentExists[policy.agent_id]) {
                    idealProduct.agents = [];
                    idealProduct.id = policy.agent.agency_id;
                    idealProduct.agency = policy.agent.agency;
                    idealProduct.agency_address = policy.agency_address;
                    idealProduct.agency_city = policy.agency_city;
                    idealProduct.agency_state = policy.agency_state;
                    idealProduct.agency_zip = policy.agency_zip;
                    idealProduct.agency_email = policy.agency_email;
                    idealProduct.agency_phone = policy.agency_phone;
                    idealProduct.agents.push({
                        id: policy.agent_id,
                        agent: policy.agent,
                        agent_email: policy.agent_email,
                        agent_phone: policy.agent_phone
                    });
                    arrayOfFinalProduct.push(idealProduct);
                    agentExists[policy.agent_id] = true;
                }
            });
            return arrayOfFinalProduct;
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
        function processFins(loan) {
            var fins = loan.fins;
            var crops_in_loan = getCrops(loan);
            var counties_in_loan = getCountiesInLoan(loan);

            // var farms = getCropAcresInCounty('6', '1310', loan);

            var gpd_crops = _.chain(crops_in_loan)
                .groupBy('crop')
                .value();
            //console.log('GPD', gpd_crops);

            fins.total_income = 10000000;

            var loan_crops_acres = {
                working: true
            };

            fins.loan_crops_acres = loan_crops_acres;
            fins.counties_in_loan = counties_in_loan;
            fins.loan_crops_acres = loan_crops_acres;
            return fins;
        }
        function processForInsDB(policies) {
            //console.log('A POLICY', policies[2]);
            var onlyPractices = [];

            _.each(policies, function(item){
                if(item.databases.length > 0) {
                    item.fsn = item.databases[0].farms.fsn;
                    item.owner = item.databases[0].farms.owner;
                    item.ins_share = item.databases[0].ins_share;
                    item.aph = item.databases[0].aph;
                    item.perm2ins = !!item.databases[0].farms.perm_to_insure;
                    onlyPractices.push(item);
                }
            });

            return onlyPractices;
        }
        function processInsByCrop(loan) {
            var policies = loan.inspols;
            _.each(policies, function(p){
                p.crop_name = p.crop.name;
                p.crop_crop = p.crop.crop;
            });
            //console.log('POLS', policies);

            var grped = _.chain(policies).groupBy('loancrop_id').value();
            //console.log('grped', grped);
            var byCrop = [];

            angular.forEach(grped, function (row) {
                var calcer = {
                    level: _.pluckuniq(row, 'level'),
                    price: _.pluckuniq(row, 'price'),
                    yield: _.weighted(row, 'yield', 'acres'),
                    premium: _.pluckuniq(row, 'premium'),
                    share: _.weighted(row, 'share', 'acres'),
                    acres: _.sumCollection(row, 'acres'),
                    disc_prod_percent: loan.fins.disc_prod_percent
                };

                var crop = {
                    loancrop_id: _.pluckuniq(row, 'loancrop_id'),
                    crop: _.pluckuniq(row, 'crop'),
                    name: _.pluckuniq(row, 'name'),
                    type: _.pluckuniq(row, 'type'),
                    option: _.pluckuniq(row, 'option'),
                    price: _.pluckuniq(row, 'price'),
                    premium: _.pluckuniq(row, 'premium'),
                    acres: _.sumCollection(row, 'acres'),
                    share: _.weighted(row, 'share', 'acres'),
                    level: _.pluckuniq(row, 'level'),
                    ins_yield: _.weighted(row, 'yield', 'acres'),
                    proj_crop_discount: Number(loan.fins.disc_prod_percent),
                    guarantee: Number(AppFactory.calcInsuranceGuaranty(calcer)),
                    value: Number(AppFactory.calcCropValue(calcer))
                };
                this.push(crop);
            }, byCrop);
            return byCrop;
        }
        function processInsTotals(obj) {
            var lone = {acres: 0, value: 0};
            var byLoan = _.forEach(obj, function (item) {
                lone.acres += Number(item.acres);
                lone.value += Number(item.value);
            });
            return byLoan;
        }
        function processLC(loan) {
            //console.log('L', loan);
            var lci = [];
            var loancrops = getLoanCrops(loan);
            _.each(loancrops, function(item){
                var prac = item.practices;
                var newbie = _.chain(prac).flatten().groupBy('type').value();
                lci.push(newbie);
            });
            return lci;
        }
        function processLoanCrops(loan) {
            var loancrops = loan.loancrops;
            _.each(loancrops, function(lc){
                lc.insurance = [];
            });
            return loancrops;
        }
        function processNonRPInsurance(obj) {
            var nonrp = _.filter(obj, function (item) {
                if (item.type !== 'RP') {
                    return item;
                }
            });
            if (!nonrp) {
                return {
                    acres: 0,
                    value: 0
                };
            } else {
                var lone = {acres: 0, value: 0};
                // TODO: Does nonrp have value to accumulate?
                var byLoan = _.forEach(nonrp, function (item, key) {
                    lone.acres += Number(item.acres);
                    lone.value += Number(item.value);
                });
                return lone;
            }
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
        function processXCols(xcols) {
            _.each(xcols, function(x){
                getLoan(x.id)
                    .then(function(rsp){
                        var loan = rsp;
                        x.arm_commit = loan.fins.commit_arm;
                        x.cash_flow = loan.fins.cash_flow;
                        x.exposure = loan.fins.exposure;
                    });
            });
            return xcols;
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