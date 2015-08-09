(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('OptimizerFactory', OptimizerFactory);

    OptimizerFactory.$inject = ['$q'];

    /* @ngInject */
    function OptimizerFactory($q) {
        var publicAPI = {
            calcInsGuarantee: calcInsGuarantee,
            calcInsValue: calcInsValue,
            getOptimizedLoan: getOptimizedLoan,
            getTotalCashRent: getTotalCashRent,
            getTotalRentOvr: getTotalRentOvr,
            getTotalWaived: getTotalWaived
        };
        return publicAPI;

        //////////
        function getOptimizedLoan(loan) {
            var deferred = $q.defer();
            var splitFarms = splitFarmsByPractice(loan);
            //splitFarms contains crops with 0 acres
            loan.optimized = splitFarms;
            deferred.resolve(loan);
            return deferred.promise;
        }
        function calcFarmAcres(farm) {
            //console.log('calcFarmAcres', farm);
            var practices = farm.practices;
            var irr = 0;
            var ni = 0;
            var percent_irrigated = 0;

            _.each(practices, function (practice) {
                if (practice.irrigated === '1') {
                    irr += Number(practice.acres);
                } else {
                    ni += Number(practice.acres);
                }
            });

            return {
                irr: irr,
                ni: ni,
                percent_irrigated: Number(irr) / (Number(irr) + Number(ni))
            };
        }
        function calcInsGuarantee(crop) {
            //console.log('Guar Crop', crop);
            return Number(crop.c_aph) * Number(crop.c_ins_price) * (Number(crop.c_ins_level)/100);
        }
        function calcInsValue(crop) {
            //console.log('Value Crop', crop);
            var guar = calcInsGuarantee(crop),
                premium = Number(crop.c_ins_premium),
                share = (crop.c_ins_share ? Number(crop.c_ins_share)/100 : 1);

            return (guar + premium) / share;
        }
        function getTotalCashRent(practices) {
            return _.sumCollection(practices, 'cash_rent');
        }
        function getTotalRentOvr(practices) {
            return _.weighted(practices, 'share_rent', 'acres');
        }
        function getTotalWaived(practices) {
            return _.sumCollection(practices, 'waived');
        }
        function makeFarmPractice(obj, loan) {
            return makePractice(obj.crop_id); //TODO: Fix
            var xps = [];
            //_.find(loan.expenses.byEntry, function(i){
            _.find(loan.expenses, function(i){
                if(obj.crop_id === i.loancrop_id){
                    xps.push(i);
                }
            });

            var exp_arm = _.sumCollection(xps, 'arm') || 0;
            var exp_dist = _.sumCollection(xps, 'dist') || 0;
            var exp_other = _.sumCollection(xps, 'other') || 0;

            var exps = {
                arm: exp_arm,
                dist: exp_dist,
                other: exp_other
            };
            //console.log('expenses', exps);

            return {
                expenses: exps,
                insurance: obj.insurance,
                c_acres: obj.acres,
                c_share_rent: obj.share_rent,
                c_aph: obj.aph,
                c_ins_share: obj.ins_share,
                c_ins_price: obj.ins_price,
                c_ins_level: obj.ins_level,
                c_ins_premium: obj.ins_premium,
                c_ins_type: obj.insurance[0].type,
                c_prod_yield: obj.prod_yield,
                c_prod_share: obj.prod_share,
                c_prod_price: obj.prod_price,
                c_var_harv: obj.harvest,
                c_rebate: obj.rebates,
                c_crop_disc: obj.crop_disc,
                c_fsa_disc: obj.fsa_disc,
                c_cropins_disc: obj.cropins_disc,
                c_nonrp_disc: obj.nonrp_disc,
                c_sco_disc: obj.sco_disc
            };
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
                c_ins_type: "RP",
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
        function processFarmCrops(cps, loan) {
            //TODO: Get crops from Database
            console.log('CPS', cps, '|| LOAN', loan);
            var returner = [], findcorn = [], findsoybeans = [], findbeansFAC = [], findsorghum = [], findwheat = [], findcotton = [], findrice = [], findpeanuts = [], findsugarcane = [], findother = [], corn = [], soybeans = [], beansFAC = [], sorghum = [], wheat = [], cotton = [], rice = [], peanuts = [], sugarcane = [], other = [];
            var crops = [
                {

                }
            ];

            findcorn = _.find(cps, function (i) {
                return i.crop_id == '1';
            });
            if (!findcorn) {
                corn = makePractice(1, loan);
            } else {
                corn = makeFarmPractice(findcorn, loan);
            }
            returner.push(corn);

            findsoybeans = _.find(cps, function (i) {
                return i.crop_id == '2';
            });
            if (!findsoybeans) {
                soybeans = makePractice(2, loan);
            } else {
                soybeans = makeFarmPractice(findsoybeans, loan);
            }
            returner.push(soybeans);

            findbeansFAC = _.find(cps, function (i) {
                return i.crop_id == '3';
            });
            if (!findbeansFAC) {
                beansFAC = makePractice(3, loan);
            } else {
                beansFAC = makeFarmPractice(findbeansFAC, loan);
            }
            returner.push(beansFAC);

            findsorghum = _.find(cps, function (i) {
                return i.crop_id == '4';
            });
            if (!findsorghum) {
                sorghum = makePractice(4, loan);
            } else {
                sorghum = makeFarmPractice(findsorghum, loan);
            }
            returner.push(sorghum);

            findwheat = _.find(cps, function (i) {
                return i.crop_id == '5';
            });
            if (!findwheat) {
                wheat = makePractice(5, loan);
            } else {
                wheat = makeFarmPractice(findwheat, loan);
            }
            returner.push(wheat);

            findcotton = _.find(cps, function (i) {
                return i.crop_id == '6';
            });
            if (!findcotton) {
                cotton = makePractice(6, loan);
            } else {
                cotton = makeFarmPractice(findcotton, loan);
            }
            returner.push(cotton);

            findrice = _.find(cps, function (i) {
                return i.crop_id == '7';
            });
            if (!findrice) {
                rice = makePractice(7, loan);
            } else {
                rice = makeFarmPractice(findrice, loan);
            }
            returner.push(rice);

            findpeanuts = _.find(cps, function (i) {
                return i.crop_id == '8';
            });
            if (!findpeanuts) {
                peanuts = makePractice(8, loan);
            } else {
                peanuts = makeFarmPractice(findpeanuts, loan);
            }
            returner.push(peanuts);

            findsugarcane = _.find(cps, function (i) {
                return i.crop_id == '9';
            });
            if (!findsugarcane) {
                sugarcane = makePractice(9, loan);
            } else {
                sugarcane = makeFarmPractice(findsugarcane, loan);
            }
            returner.push(sugarcane);

            findother = _.find(cps, function (i) {
                return i.crop_id == '10';
            });
            if (!findother) {
                other = makePractice(10, loan);
            } else {
                other = makeFarmPractice(findother, loan);
            }
            returner.push(other);

            return returner;
        }
        function splitFarmsByPractice(loan) {
            console.log('LOAN (OPFAC)', loan);

            var farms = loan.farms;
            //console.log('STARTER', farms);
            var practiced = [];
            var withZero = [];
            var byPractice = [];

            _.each(farms, function (item) {
                console.log('ITEM', item);
                var totAcres = (item.IR + item.NI);
                var fsaPayIR = item.fsa_paid * item.IR / totAcres;
                var fsaPayNI = item.fsa_paid - fsaPayIR;

                var splitIR = {
                    id: item.id,
                    county: item.county.county,
                    state: item.county.state.abr,
                    fsn: item.fsn,
                    owner: item.owner,
                    acres: Number(item.IR),
                    practice: 'IR',
                    cash_rent: Number(item.cash_rent),
                    waived: Number(item.waived),
                    share_rent: Number(item.share_rent),
                    perm_to_insure: item.perm_to_insure,
                    when_due: item.when_due,
                    fsa_paid: fsaPayIR,
                    cash_rent_acre_ARM: (Number(item.IR) !== 0 ? (Number(item.cash_rent) - Number(item.waived)) / Number(item.IR) : 0),
                    cash_rent_acre_dist: 0, //TODO: store
                    cash_rent_acre_other: 0,
                    fsa_acre: (fsaPayIR/item.IR),
                    practices: []
                };
                var splitNI = {
                    id: item.id,
                    county: item.county.county,
                    state: item.county.state.abr,
                    fsn: item.fsn,
                    owner: item.owner,
                    acres: Number(item.NI),
                    practice: 'NI',
                    cash_rent: Number(item.cash_rent),
                    waived: Number(item.waived),
                    share_rent: Number(item.share_rent),
                    perm_to_insure: item.perm_to_insure,
                    when_due: item.when_due,
                    fsa_paid: fsaPayNI,
                    cash_rent_acre_ARM: (Number(item.IR) !== 0 ? (Number(item.cash_rent) - Number(item.waived)) / Number(item.IR) : 0),
                    cash_rent_acre_dist: 0, //TODO: store
                    cash_rent_acre_other: 0,
                    fsa_acre: (fsaPayNI/item.NI),
                    practices: []
                };

                _.each(item, function (subfarm) {
                    //console.log('UNIT', unit);
                    if (subfarm.practice === 'IR') {
                        splitIR.practices.push(subfarm);
                    } else {
                        splitNI.practices.push(subfarm);
                    }
                });

                practiced.push(splitNI);
                practiced.push(splitIR);
            });
            //console.log('PRACTICED', practiced);

            /*
            Farm is divided into IRR and NI and
            includes subfarms with 0 acres and has no crops
            */
            _.each(practiced, function (item) {
                // Adding variables necessary for Optimizer
                var processed = {
                    id: item.id,
                    state: item.state,
                    county: item.county,
                    fsn: item.fsn,
                    practice: item.practice,
                    owner: item.owner,
                    acres: item.acres,
                    share_rent: item.share_rent,
                    perm_to_insure: (item.perm_to_insure ? 'Y' : 'N'),
                    cash_rent: Number(item.cash_rent),
                    waived: Number(item.waived),
                    when_due: item.when_due,
                    fsa_paid: item.fsa_paid,
                    cash_rent_acre_ARM: (item.acres !== 0 ? (Number(item.cash_rent) - Number(item.waived)) / Number(item.acres) : 0),
                    cash_rent_acre_dist: 0,
                    cash_rent_acre_other: (item.acres !== 0 ? Number(item.waived) / Number(item.acres) : 0),
                    fsa_acre: (item.acres !== 0 ? Number(item.fsa_paid) / Number(item.acres) : 0),
                    crops: processFarmCrops(item, loan)
                };
                withZero.push(processed);
            });
            //console.log('WITH ZERO', withZero);

            return _.each(withZero, function (item) {
                // Adding variables necessary for Optimizer
                item.crops = processFarmCrops(item, loan);
            });
            //console.log('WITH ZERO', withZero);

            // removes subfarms without acres
            _.each(practiced, function (item) {
                if (item.acres > 0) {
                    byPractice.push(item);
                } else {
                    // handle "potential" farms (acres = 0)
                }
            });

            //byPractice = practiced;
            //console.log('By Practice', byPractice);
            return byPractice;
        }
    } // end factory
})();