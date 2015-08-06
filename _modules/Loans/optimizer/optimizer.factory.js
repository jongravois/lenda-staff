(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('OptimizerFactory', OptimizerFactory);

    OptimizerFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function OptimizerFactory($http, $q) {
        var publicAPI = {
            calcAcresCrop: calcAcresCrop,
            calcAPHCrop: calcAPHCrop,
            calcInsGuarantee: calcInsGuarantee,
            calcInsValue: calcInsValue,
            getCrops: getCrops,
            getMock: getMock,
            getOptimizedLoan: getOptimizedLoan,
            getTotalCashRent: getTotalCashRent,
            getTotalFSAPaid: getTotalFSAPaid,
            getTotalRentOvr: getTotalRentOvr,
            getTotalWaived: getTotalWaived,
            parseUnits: parseUnits,
            processCrops: processCrops
        };
        return publicAPI;

        //////////
        function calcAcresCrop(cropID, loan) {
            var acreage = _.sum(_.pluck(loan, 'acres'));
            console.log('calcAcresCrop', loan, 'acres', acreage);

        }
        function calcAPHCrop(cropID) {
            switch(cropID) {
                case '0':
                    return 932;
                    break;
                case '1':
                    return 50;
                    break;
                case '6':
                    return 932;
                    break;
                default:
                    return 0;
                    break;
            }
        }
        function parseUnits(loan) {
            //console.log('PU-Loan', loan);
            var optimized = [];
            var processor = _.each(loan.farms, function(item){
                _.each(item.units, function(i){
                    //console.log('eye', i);
                    i.fsn = item.fsn;
                    i.practice = (i.IR === 0 ? 'NI' : 'IR');
                    i.acres = Number(i.IR)+Number(i.NI);
                    i.perm2ins = (i.perm_to_insure ? 'Y' : 'N');
                    i.cash_rent = item.cash_rent;
                    i.dist_rent = 0;
                    i.waived = item.waived;
                    i.when_due = item.when_due;
                    i.fsa_paid = item.fsa_paid;
                    i.cash_rent_acre_ARM = item.cash_rent/(Number(i.IR)+Number(i.NI));
                    i.cash_rent_acre_dist = 0;
                    i.cash_rent_acre_other = 0;
                    i.fsa_acre = item.fsa_paid/(Number(i.IR)+Number(i.NI));
                    optimized.push(i);
                });
            });
            //console.log('farms', loan.farms, 'PU-P', optimized);
            return optimized;
        }
        function getOptimizedLoan(loan) {
            var deferred = $q.defer();
            var splitFarms = splitFarmsByPractice(loan);
            //splitFarms contains crops with 0 acres
            deferred.resolve(splitFarms);
            return deferred.promise;
        }
        function calcFarmAcres(farm) {
            var practices = farm.farmpractices;
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
        function getCrops() {
            return [
                {id: 1, crop: 'corn', name: 'Corn'},
                {id: 2, crop: 'soybeans', name: 'Soybeans'},
                {id: 3, crop: 'beanFAC', name: 'Soybeans FAC'},
                {id: 4, crop: 'sorghum', name: 'Sorghum'},
                {id: 5, crop: 'wheat', name: 'Wheat'},
                {id: 6, crop: 'cotton', name: 'Cotton'},
                {id: 7, crop: 'rice', name: 'Rice'},
                {id: 8, crop: 'peanuts', name: 'Peanuts'},
                {id: 9, crop: 'sugarcane', name: 'Sugar Cane'},
                {id: 10, crop: 'sunflowers', name: 'Sunflowers'},
            ];
        }
        function getMock() {
            return $http.get('./_modules/Loans/optimizer/optimizer.json');
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
        function getTotalFSAPaid(practices) {
            return _.sumCollection(practices, 'fsa_paid');
        }
        function getTotalRentOvr(practices) {
            return _.weighted(practices, 'share_rent', 'acres');
        }
        function getTotalWaived(practices) {
            return _.sumCollection(practices, 'waived');
        }
        function makeFarmPractice(obj, loan) {
            //console.log('obj', obj);
            //console.log('loan', loan);

            var xps = [];
            _.find(loan.expenses.byEntry, function(i){
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
        function processCrops(loan) {
            var returner = [];
            var crops = getCrops();

            _.each(loan.optimized, function(item){
                console.log('item', item);
                var bo = _.includes(_.pluck(item.practices, 'crop_id'), "6");
                console.log(bo);
            });
            return returner;
        }
        function processFarmCrops(cps, loan) {
            //console.log('cps', cps);
            var returner = [], findcorn = [], findsoybeans = [], findbeansFAC = [], findsorghum = [], findwheat = [], findcotton = [], findrice = [], findpeanuts = [], findsugarcane = [], findother = [], corn = [], soybeans = [], beansFAC = [], sorghum = [], wheat = [], cotton = [], rice = [], peanuts = [], sugarcane = [], other = [];

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
                return i.crop_id == '3';
            });
            if (!findsorghum) {
                sorghum = makePractice(3, loan);
            } else {
                sorghum = makeFarmPractice(findsorghum, loan);
            }
            returner.push(sorghum);

            findwheat = _.find(cps, function (i) {
                return i.crop_id == '4';
            });
            if (!findwheat) {
                wheat = makePractice(4, loan);
            } else {
                wheat = makeFarmPractice(findwheat, loan);
            }
            returner.push(wheat);

            findcotton = _.find(cps, function (i) {
                return i.crop_id == '5';
            });
            if (!findcotton) {
                cotton = makePractice(5, loan);
            } else {
                cotton = makeFarmPractice(findcotton, loan);
            }
            returner.push(cotton);

            findrice = _.find(cps, function (i) {
                return i.crop_id == '6';
            });
            if (!findrice) {
                rice = makePractice(6, loan);
            } else {
                rice = makeFarmPractice(findrice, loan);
            }
            returner.push(rice);

            findpeanuts = _.find(cps, function (i) {
                return i.crop_id == '7';
            });
            if (!findpeanuts) {
                peanuts = makePractice(7, loan);
            } else {
                peanuts = makeFarmPractice(findpeanuts, loan);
            }
            returner.push(peanuts);

            findsugarcane = _.find(cps, function (i) {
                return i.crop_id == '8';
            });
            if (!findsugarcane) {
                sugarcane = makePractice(8, loan);
            } else {
                sugarcane = makeFarmPractice(findsugarcane, loan);
            }
            returner.push(sugarcane);

            findother = _.find(cps, function (i) {
                return i.crop_id == '9';
            });
            if (!findother) {
                other = makePractice(9, loan);
            } else {
                other = makeFarmPractice(findother, loan);
            }
            returner.push(other);

            return returner;
        }
    } // end factory
})();