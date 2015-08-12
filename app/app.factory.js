(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AppFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$stateParams', 'toastr', 'API_URL'];

    /* @ngInject */
    function AppFactory($http, $q, $state, $stateParamas, toastr, API_URL) {
        var publicAPI = {
            averageArray: averageArray,
            calcAcresCrop: calcAcresCrop,
            calcAdjExposure: calcAdjExposure,
            calcBreakEvenPercent: calcBreakEvenPercent,
            calcCashFlow: calcCashFlow,
            calcCropValue: calcCropValue,
            calcExposure: calcExposure,
            calcInsCoverageExcess: calcInsCoverageExcess,
            calcInsCropValue: calcInsCropValue,
            calcInsuranceGuaranty: calcInsuranceGuaranty,
            calcInsOverDisc: calcInsOverDisc,
            calcInsOverDiscNonRP: calcInsOverDiscNonRP,
            calcInsShareCrop: calcInsShareCrop,
            calcInsuranceTotalGuarantee: calcInsuranceTotalGuarantee,
            calcInsuranceTotalValue: calcInsuranceTotalValue,
            calcInsuranceValue: calcInsuranceValue,
            calcMarketValueTotal: calcMarketValueTotal,
            calcTotalArmAndFarmExpenses: calcTotalArmAndFarmExpenses,
            calcTotalExpenses: calcTotalExpenses,
            calcTotalFarmExpenses: calcTotalFarmExpenses,
            calcYieldCrop: calcYieldCrop,
            createNewFarmExpense: createNewFarmExpense,
            deleteIt: deleteIt,
            filterLoans: filterLoans,
            fixDollars: fixDollars,
            getAll: getAll,
            getAcresForCropInLoan: getAcresForCropInLoan,
            getAllCrops: getAllCrops,
            getIndicatorWidth: getIndicatorWidth,
            getOne: getOne,
            getSortedData: getSortedData,
            getRaw: getRaw,
            gtZero: gtZero,
            inArray: inArray,
            nullOrNot: nullOrNot,
            optimized: optimized,
            parseComments: parseComments,
            patchIt: patchIt,
            postIt: postIt,
            putIt: putIt,
            returnColor: returnColor,
            sortLoans: sortLoans,
            sumThese: sumThese
        };
        return publicAPI;

        /* MODEL LAYER */
        function deleteIt(npoint, id) {
            return $http.delete(API_URL+npoint+'/'+id);
        }
        function getAll(npoint) {
            return $http.get(API_URL+npoint);
        }
        function getOne(npoint, id) {
            return $http.get(API_URL+npoint+'/'+id);
        }
        function getRaw(fullendpoint) {
            return $http.get(API_URL+fullendpoint);
        }
        function patchIt(npoint, id, data) {
            return $http.patch(API_URL+npoint+'/'+id, data);
        }
        function postIt(npoint, data) {
            return $http.post(API_URL+npoint, data);
        }
        function putIt(npoint, id, data) {
            return $http.put(API_URL+npoint+'/'+id, data);
        }

        /* METHODS */
        function optimized(loan) {
            var unit_cf_calcs = [];
            var collection = loan.loancrops;
            _.each(collection, function(item){
                if(item.practices.length === 0) {
                    return [];
                } else {
                    var fin = loan.fins;
                    var unit_practice = item.practices[0];
                    var farm_lvl = unit_practice.farm;
                    var fsa = parseFloat(farm_lvl.fsa_paid);
                    var frm_acres = parseFloat(farm_lvl.NI) + parseFloat(farm_lvl.IR);
                    var prod_yield = parseFloat(unit_practice.prod_yield);
                    var prod_share = parseFloat(unit_practice.prod_share) / 100;
                    var prod_price = parseFloat(unit_practice.prod_price);
                    var arm_budget = Number(fin.arm_crop_commit[item.crop.crop]);
                    var dist_budget = Number(fin.dist_crop_commit[item.crop.crop]);
                    var other_budget = Number(fin.other_crop_commit[item.crop.crop]);
                    var crop = item.crop.crop;
                    var crop_acres = _.find(fin.crop_acres, {crop : crop});
                    var unit = {
                        state: farm_lvl.county.state.abr,
                        county: farm_lvl.county.county,
                        fsn: farm_lvl.fsn,
                        owner: farm_lvl.owner,
                        total_acres: 'unknown',
                        share_rent: unit_practice.share_rent,
                        perm_to_insure: unit_practice.perm_to_insure,
                        cash_rent: farm_lvl.cash_rent,
                        waived: farm_lvl.waived,
                        dist_rent: farm_lvl.dist_rent,
                        when_due: farm_lvl.when_due,
                        fsa_pymt: fsa,
                        practice: unit_practice.practice,
                        fsa_acre: (frm_acres > 0 ? fsa / frm_acres : 0),
                        prod_rev: prod_yield * prod_share * prod_price,
                        prod_rev_adj: prod_yield * prod_share * (parseFloat(item.var_harvest) + parseFloat(item.rebates)),
                        arm_rent_acre: (frm_acres > 0 ? parseFloat(farm_lvl.cash_rent)/frm_acres : 0),
                        dist_rent_acres: (frm_acres > 0 ? parseFloat(farm_lvl.dist_rent)/frm_acres : 0),
                        other_rent_acres: 0,
                        crop: crop,
                        crop_acres: crop_acres.acres,
                        arm_budget: arm_budget,
                        dist_budget: dist_budget,
                        other_budget: other_budget,
                        arm_fees: calcCropFee(fin.fee_onTotal, arm_budget, dist_budget, fin.total_fee_percent),
                        arm_int: (Number(fin.int_percent_arm) / 100) * arm_budget,
                        dist_int: (Number(fin.int_percent_dist) / 100) * dist_budget,
                        other_int: 0
                    };

                    unit.cf = ((unit.fsa_acre + unit.prod_rev + unit.prod_rev_adj) - ((unit.arm_budget + unit.arm_rent_acre + unit.arm_fees) + (unit.dist_budget + unit.dist_rent_acres) + unit.other_budget + unit.arm_int + unit.dist_int + unit.other_int)) * parseFloat(unit_practice.acres);

                    unit_cf_calcs.push(unit);
                    console.log('UCC', unit_cf_calcs);
                }
            });
            return unit_cf_calcs;
        }
        function averageArray(arr) {
            var removed_empty = _.compact(arr);
            return _.sum(removed_empty) / removed_empty.length;
        }
        function calcAcresCrop(cropID, loan) {
            var crop_id = Number(cropID);
            var farmpractices = loan.farmpractices;

            var crop = _.filter(farmpractices, function(i) {
                if (i.crop_id == crop_id) {
                    return i;
                }
            });

            return _.sumCollection(crop, 'acres');
        }
        function calcAdjExposure(loan) {
            return loan.fins.adjExposure;
        }
        function calcBreakEvenPercent(loan) {
            var BE = Number(calcTotalFarmIncome(loan))/Number(calcTotalCropValues(loan));
            return BE;
        }
        function calcCropFee(onTotal, arm_budget, dist_budget, fee_percent) {
            if(onTotal){
                return (Number(arm_budget) + Number(dist_budget)) * (fee_percent/100);
            } else {
                return Number(arm_budget) * (fee_percent/100);
            }
        }
        function calcExposure(loan) {
            return loan.fins.exposure;
        }
        function calcCashFlow(loan) {
            return calcTotalExpenses(loan) + loan.fins.fee_total + loan.fins.int_total;
        }
        function calcCropValue(obj) {
            if(!obj.yield){
                obj.yield = obj.ins_yield;
            }
            //console.log('calcCropValue', obj);
            return obj.acres * obj.yield * obj.price * (obj.share/100);
        }
        function calcInsCoverageExcess(loan) {
            //return Number(calcInsuranceTotalValue(loan)) - (loan.expenses.totals.byLoan.arm + loan.expenses.totals.byLoan.dist);
        }
        function calcInsCropValue(obj) {
            //(Guarantee-Premium)*(Share/100)*Acres
            return (Number(obj.guarantee) - Number(obj.premium)) * (Number(obj.share)/100) * Number(obj.acres);
        }
        function calcInsOverDisc(obj) {
            //console.log('calcInsOverDisc', obj);
            //InsValue - (CropValue * (1 - ProjectedCropDiscount))
            var insValue = Number(calcInsCropValue(obj));
            var cropValue = Number(calcCropValue(obj));
            var projectedCropDiscount = Number(obj.proj_crop_discount);

            //console.log(insValue, cropValue, projectedCropDiscount);
            var formula = insValue - (cropValue * (1 - (projectedCropDiscount/100)));

            if(Number(formula) > 0) {
                return Number(formula);
            } else {
                return 0;
            }
        }
        function calcInsOverDiscNonRP(obj) {
            //(Guar-Premium)*share/100*Acres*nonRPPercent%
            if(obj.type == 'RP') {
                return 0;
            } else {
                return (obj.guarantee - obj.premium) * (obj.share/100) * obj.acres * 20/100;
            } //end if
        }
        function calcInsShareCrop(cropID, loan) {
            var crop_id = Number(cropID);
            var farmpractices = loan.farmpractices;

            var crop = _.filter(farmpractices, function(i) {
                if (i.crop_id == crop_id) {
                    return i;
                }
            });

            return _.weighted(crop, 'ins_share', 'acres');
        }
        function calcInsuranceGuaranty(obj) {
            if(!obj.yield){
                obj.yield = obj.aph;
            }
            return (Number(obj.level) / 100) * Number(obj.price) * Number(obj.yield);
        }
        function calcInsuranceTotalGuarantee(loan) {
            if(!loan) { return; }

            // TOTAL INSURANCE VALUE
            return calcTotalOverDisc(loan);
        }
        function calcInsuranceTotalValue(loan) {
            if(!loan) { return; }

            var policies = loan.insurance.byCrop;
            return _.sumCollection(policies, 'value');
        }
        function calcInsuranceValue(obj) {
            if(!obj.yield){
                obj.yield = obj.ins_yield;
            }

            return (Number(calcInsuranceGuaranty(obj)) - Number(obj.premium)) * (Number(obj.share) / 100) * obj.acres;
        }
        function calcMarketValueTotal(loan) {
            if(!loan) { return 0; }

            //formula: calcPlannedCropValue(loan) + calcFSACollateralValue(loan) + calcIODCollateralValue(loan) + calcNRPCollateralValue(loan) + calcSuppInsValue(loan) + calcEquipmentCollateralValue(loan) + calcRECollateralTotal(loan) + calcOtherCollateralValue(loan);

            return Number(loan.fins.adj_prod) + Number(loan.fins.total_fsa_payment) + Number(loan.fins.ins_disc_prod) + Number(loan.insurance.nonrp.value) + Number(loan.supplements.totals.value) + Number(calcEquipmentCollateralValue(loan)) + Number(calcRECollateralValue(loan)) + Number(calcOtherCollateralValue(loan));
        }
        function calcTotalArmAndFarmExpenses(loan) {
            return Number(loan.expenses.totals.byLoan.arm) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalCropValues(loan) {
            return 1010000;
        }
        function calcTotalExpenses(loan) {
            return Number(loan.expenses.totals.byLoan.arm) + Number(loan.expenses.totals.byLoan.dist) + Number(loan.expenses.totals.byLoan.other) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalFarmExpenses(loan) {
            var col = loan.farmexpenses;
            var total = _.sumCollection(col, 'cost');
            return total;
        }
        function calcTotalFarmIncome(loan) {
            return 771124;
            return Number(loan.fins.commit_arm) + Number(loan.fins.commit_dist) - (Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_other_income));
        }
        function calcYieldCrop(cropID, loan) {
            var crops = loan.loancrops;
            var crop = _.find(crops, {crop_id: cropID});

            var yield_weighted = _.weighted(crop.practices, 'prod_yield', 'acres');
            return yield_weighted;
        }
        function createNewFarmExpense() {
            alert('creating a new farm expense');
        }
        function filterLoans(loans, val) {
            //console.log(loans, val);
            switch (val) {
                case 'all':
                    return loans;
                    break;
                case 'settings':
                    return _.filter(loans, function (i) {
                        return Number(i.status.id) === 1;
                    });
                    break;
                case 'fall':
                    return _.filter(loans, function (i) {
                        return i.status.id === '1' && i.season === 'F';
                    });
                    break;
                case 'spring':
                    return _.filter(loans, function (i) {
                        return i.status.id === '1' && i.season === 'S';
                    });
                    break;
            } // end switch
        }
        function fixDollars(num, digits) {
            num += 0.5;
            var numS = num.toString(),
                decPos = numS.indexOf('.'),
                substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
                trimmedResult = numS.substr(0, substrLength),
                finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
            return parseFloat(finalResult);

        }
        function getAcresForCropInLoan(loanID, cropID) {}
        function getAllCrops() {
            //TODO: Hard Coded
            return ['corn', 'soybeans', 'beansFAC', 'sorghum', 'wheat', 'cotton', 'rice', 'peanuts', 'sugarcane'];
        }
        function getIndicatorWidth(user) {
            var cnt = 0;

            if(user.viewopts.voIconAddendum) {
                cnt += 1;
            }
            if(user.viewopts.voIconCross) {
                cnt += 1;
            }
            if(user.viewopts.voIconBankruptcy) {
                cnt += 1;
            }
            if(user.viewopts.voIcon3pcredit) {
                cnt += 1;
            }
            if(user.viewopts.voIconAddedland) {
                cnt += 1;
            }
            if(user.viewopts.voIconDisbursement) {
                cnt += 1;
            }
            if(user.viewopts.voIconAttachments) {
                cnt += 1;
            }

            var retro = {
                hide: (cnt === 0 ? true : false),
                width: cnt * 19
            }; //140;
            //console.log(retro);
            return retro;
        }
        function getSortedData(state, collection) {
            var ds = [];
            if(state) {
                ds = _.sortByAll(collection, ['is_watched', 'vote_pending', 'has_comment', 'is_stale', 'disbursement_issue']).reverse();
                //console.log('true', ds);
                return ds;
            } else {
                ds = _.sortByAll(collection, ['farmer']);
                //console.log('false', ds);
                return ds;
            }
        }
        function gtZero(value) {
            if (value === 0) {
                return 'text-center';
            }
            else {
                return 'text-right';
            }
        }
        function inArray(needle, haystack) {
            if (haystack.indexOf(needle) === -1) {
                return false;
            }
            return true;
        }
        function nullOrNot(obj) {
            return !angular.isDefined(obj) || obj===null;
        }
        function parseComments(comms) {
            if(comms.length < 2) { return []; }
            var Account = _.filter(comms, function(i){
                return i.type == 'Account';
            })
            var Addendum = _.filter(comms, function(i){
                return i.type == 'Addendum';
            });
            var Analyst = _.filter(comms, function(i){
                return i.type == 'Analyst';
            });
            var Committee = _.filter(comms, function(i){
                return i.type == 'Committee';
            })
            var Loan = _.filter(comms, function(i){
                return i.type == 'Loan';
            });
            var Watch = _.filter(comms, function(i){
                return i.type == 'Watch';
            });

            return {
                Account: Account,
                Addendum: Addendum,
                Analyst: Analyst,
                Committee: Committee,
                Loan: Loan,
                Watch: Watch
            };
        }
        function returnColor(val) {
            //console.log('returnColor', val);
            /* 0-Gray, 1-Green, 2-Yellow, 3-Red, 4-Blue */
            /* 5-Orange, 6-Yellow+, 7-Orange+, 8-Red+ */
            var colors = ['gray', 'green', 'yellow', 'red', 'blue', 'orange', 'yellow_inner', 'orange_inner', 'red_inner'];
            return colors[val] || 'gray';
        }
        function sortLoans(loans, order) {
            if(order === 1 || order === '1') {
                var sorted = _(loans).chain().sortByAll('vote_pending', 'has_comment').reverse().value();
            } else {
                var sorted = _(loans).chain().sortByAll('farmer', 'applicant').value();
            }
            return sorted;
        }
        function sumThese(a, b) {
            return a + b;
        }
    } // end factory

})();