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
            calcAcresByCrop: calcAcresByCrop,
            calcAcresCrop: calcAcresCrop,
            calcAddendumDiff: calcAddendumDiff,
            calcAddendumFee: calcAddendumFee,
            calcAddendumFeeDiff: calcAddendumFeeDiff,
            calcAddendumPCDiff: calcAddendumPCDiff,
            calcAdjExposure: calcAdjExposure,
            calcArmInterest: calcArmInterest,
            calcArmProcFee: calcArmProcFee,
            calcArmDistProcFee: calcArmDistProcFee,
            calcArmSrvcFee: calcArmSrvcFee,
            calcArmDistSrvcFee: calcArmDistSrvcFee,
            calcArmTotalFee: calcArmTotalFee,
            calcBookAdj: calcBookAdj,
            calcBreakEvenPercent: calcBreakEvenPercent,
            calcCashFlow: calcCashFlow,
            calcCropAcres: calcCropAcres,
            calcCropAph: calcCropAph,
            calcCropDiscCrop: calcCropDiscCrop,
            calcCropDiscOver: calcCropDiscOver,
            calcCropDiscOverD: calcCropDiscOverD,
            calcCropFee: calcCropFee,
            calcCropIncome: calcCropIncome,
            calcCropInsValBySummary: calcCropInsValBySummary,
            calcCropMPCIbySummary: calcCropMPCIbySummary,
            calcCropProdPrice: calcCropProdPrice,
            calcCropProdShare: calcCropProdShare,
            calcCropProdYield: calcCropProdYield,
            calcCropSco: calcCropSco,
            calcCropSupInsbySummary: calcCropSupInsbySummary,
            calcCropTotal: calcCropTotal,
            calcCropTotsCrop: calcCropTotsCrop,
            calcCropTotsInsVal: calcCropTotsInsVal,
            calcCropTotsMOC: calcCropTotsMOC,
            calcCropTotsMPCI: calcCropTotsMPCI,
            calcCropTotsMPCIBySummary: calcCropTotsMPCIBySummary,
            calcCropTotsSco: calcCropTotsSco,
            calcCropTotsSupIns: calcCropTotsSupIns,
            calcCropTotsTot: calcCropTotsTot,
            calcDistInterest: calcDistInterest,
            calcDistProcFee: calcDistProcFee,
            calcDistSrvcFee: calcDistSrvcFee,
            calcDistTotalFee: calcDistTotalFee,
            calcCropValue: calcCropValue,
            calcExposure: calcExposure,
            calcFSACollateralValue: calcFSACollateralValue,
            calcHvstAdj: calcHvstAdj,
            calcInsCoverageExcess: calcInsCoverageExcess,
            calcInsCropValue: calcInsCropValue,
            calcInsuranceGuaranty: calcInsuranceGuaranty,
            calcInsOverDisc: calcInsOverDisc,
            calcInsOverDiscNonRP: calcInsOverDiscNonRP,
            calcInsOverDYield: calcInsOverDYield,
            getInsTypesBySummary: getInsTypesBySummary,
            calcInsShareCrop: calcInsShareCrop,
            calcInsuranceTotalByCropSummary: calcInsuranceTotalByCropSummary,
            calcInsuranceTotalGuarantee: calcInsuranceTotalGuarantee,
            calcInsuranceTotalValue: calcInsuranceTotalValue,
            calcInsuranceValue: calcInsuranceValue,
            calcInsValueByCropSummary: calcInsValueByCropSummary,
            calcInterestARM: calcInterestARM,
            calcInterestDist: calcInterestDist,
            calcIODCollateralValue: calcIODCollateralValue,
            calcLoanFee: calcLoanFee,
            calcMarketValueTotal: calcMarketValueTotal,
            calcMPCIbyCrop: calcMPCIbyCrop,
            calcMPCIbyCropSummary: calcMPCIbyCropSummary,
            calcOCDbyType: calcOCDbyType,
            calcOCDTByType: calcOCDTByType,
            calcOCMVbyType: calcOCMVbyType,
            calcOCPLbyType: calcOCPLbyType,
            calcOtherCollateralByType: calcOtherCollateralByType,
            calcRHPEbyCrop: calcRHPEbyCrop,
            calcRHPEDiscount: calcRHPEDiscount,
            calcAdjProd: calcAdjProd,
            calcInsbyCrop: calcInsbyCrop,
            calcPlannedCropValue: calcPlannedCropValue,
            calcProjectedCrops: calcProjectedCrops,
            calcProjectedDiscCrops: calcProjectedDiscCrops,
            calcRebateAdj: calcRebateAdj,
            calcRPbyCrop: calcRPbyCrop,
            calcSuppCoverage: calcSuppCoverage,
            calcSupInsbyCropSummary: calcSupInsbyCropSummary,
            calcSuppInsMax: calcSuppInsMax,
            calcSuppInsTotal: calcSuppInsTotal,
            calcTotalAcres: calcTotalAcres,
            calcTotalArmAndFarmExpenses: calcTotalArmAndFarmExpenses,
            calcTotalBookedAdj: calcTotalBookedAdj,
            calcTotalCollateral: calcTotalCollateral,
            calcTotalCollateralLiens: calcTotalCollateralLiens,
            calcTotalCollateralVal: calcTotalCollateralVal,
            calcTotalCommitment: calcTotalCommitment,
            calcTotalCropValues: calcTotalCropValues,
            calcTotalDiscSuppCoverage: calcTotalDiscSuppCoverage,
            calcTotalDiscMPCI: calcTotalDiscMPCI,
            calcTotalExpenses: calcTotalExpenses,
            calcTotalFarmExpenses: calcTotalFarmExpenses,
            calcTotalHarvestAdj: calcTotalHarvestAdj,
            calcTotalIncome: calcTotalIncome,
            calcTotalIncomeWithOther: calcTotalIncomeWithOther,
            calcTotalMPCI: calcTotalMPCI,
            calcTotalRebateAdj: calcTotalRebateAdj,
            calcTotalRPIns: calcTotalRPIns,
            calcTotalRPHPEIns: calcTotalRPHPEIns,
            calcTotalSupIns: calcTotalSupIns,
            calcTotalYPIns: calcTotalYPIns,
            calcYieldCrop: calcYieldCrop,
            calcYPbyCrop: calcYPbyCrop,
            calcYPCollateralValue: calcYPCollateralValue,
            calcYPDiscount: calcYPDiscount,
            createNewFarmExpense: createNewFarmExpense,
            deleteIt: deleteIt,
            filterLoans: filterLoans,
            fixDollars: fixDollars,
            getAll: getAll,
            getAllCrops: getAllCrops,
            getAverage: getAverage,
            getInsByType: getInsByType,
            getIndicatorWidth: getIndicatorWidth,
            getOne: getOne,
            getSortedData: getSortedData,
            getRaw: getRaw,
            gtZero: gtZero,
            inArray: inArray,
            makeNewLoan: makeNewLoan,
            makeXCropvals: makeXCropvals,
            makeXInsVals: makeXInsVals,
            nullOrNot: nullOrNot,
            parseComments: parseComments,
            patchIt: patchIt,
            postIt: postIt,
            processXCols: processXCols,
            putIt: putIt,
            returnColor: returnColor,
            sortLoans: sortLoans,
            submitLoan: submitLoan,
            submitLoanSolo: submitLoanSolo,
            submitToDist: submitToDist,
            sumThese: sumThese,
            withdrawLoan: withdrawLoan,
            xCashFlow: xCashFlow,
            xArmCommit: xArmCommit,
            xDistCommit: xDistCommit,
            xExposure: xExposure
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
        function averageArray(arr) {
            var removed_empty = _.compact(arr);
            return _.sum(removed_empty) / removed_empty.length;
        }
        function calcAcresByCrop(cropname, loan) {
            if(!loan) { return []; }
            var ca = loan.fins.crop_acres;
            var cp = _.find(ca, {crop: cropname});
            return cp.acres;
        }
        function calcAcresCrop(cropID, loan) {
            if(!loan) { return []; }
            var loanpractices = loan.loanpractices;
            var total = 0;

            _.each(loanpractices, function(i) {
                if (Number(i.crop_id) === Number(cropID)) {
                    total += Number(i.acres);
                }
            });

            return total;
        }
        function calcAddendumDiff(al, loan) {
            if(al.addendum_type === '1') { return 0; }
            return Number(loan.fins.principal_arm) - Number(al.principal_arm);
        }
        function calcAddendumFee(al, loan) {
            if(al.addendum_type === '1') {
                return al.fee_total;
            } else {
                //TODO: array position is hard coded
                var adds = loan.addendums;
                var sorted = _.sortBy(adds, 'app_date').reverse();
                var old_fees = Number(sorted[0]['fee_total']);

                return Number(sorted[0]['fee_total']) - Number(sorted[1]['fee_total']);
            }
        }
        function calcAddendumFeeDiff(al, loan) {
            if(al.addendum_type === '1') { return 0; }
            return Number(loan.fins.fee_total) - Number(al.fee_total);
        }
        function calcAddendumPCDiff(al, loan) {
            if(al.addendum_type === '1') { return 0; }
            return 100 - (Number(al.principal_arm) * 100 / Number(loan.fins.principal_arm));
        }
        function calcAdjExposure(loan) {
            if(! loan ) { return 0; }
            return loan.fins.adjExposure;
        }
        function calcAdjProd(loan) {
            if(!loan) { return 0; }

            //each cropsInLoan -- (acres+prod_yield+prod_price+prod_share/100) + bkAdj + harvestAdj
            var total = 0;
            var lc = loan.loancrops;
            _.each(lc, function(i){
                var acres = i.acres;
                var bkqty = i.bkqty;
                var bkprice = i.bkprice;
                var hvst = i.var_harvest;
                _.each(i.practices, function(p){
                    var crops = Number(acres) + Number(p.prod_yield) + Number(p.prod_price) + (Number(p.prod_share)/100);
                    var bk_adj = (Number(bkprice) - Number(p.prod_price)) * bkqty;
                    var hvst_adj = Number(acres) * Number(p.prod_yield) * Number(hvst);
                    total += crops + bk_adj - hvst_adj;
                });
            });
            return total;
        }
        function calcArmInterest(loan) {
            var terms = loan.terms;
            var num_terms = terms.length;
            var days = terms[num_terms-1].est_days;
            var rate = terms[num_terms-1].int_percent_arm;
            var commit = loan.fins.principal_arm;

            return (days/365) * (rate/100) * commit;
        }
        function calcArmProcFee(loan) {
            var commit = Number(loan.fins.commit_arm);
            var rate = Number(loan.terms[loan.terms.length-1].fee_processing_arm);

            return commit * rate;
        }
        function calcArmDistProcFee(loan) {
            var arm_commit = Number(loan.fins.commit_arm);
            var dist_commit = Number(loan.fins.commit_dist);
            var rate = Number(loan.terms[loan.terms.length-1].fee_processing_arm);

            return (arm_commit + dist_commit) * rate;
        }
        function calcArmSrvcFee(loan) {
            var commit = Number(loan.fins.commit_arm);
            var rate = Number(loan.terms[loan.terms.length-1].fee_service_arm);

            return commit * rate;
        }
        function calcArmDistSrvcFee(loan) {
            var arm_commit = Number(loan.fins.commit_arm);
            var dist_commit = Number(loan.fins.commit_dist);
            var rate = Number(loan.terms[loan.terms.length-1].fee_service_arm);

            return (arm_commit + dist_commit) * rate;
        }
        function calcArmTotalFee(loan) {
            if(loan.fins.fee_onTotal) {
                return Number(calcArmDistProcFee(loan)) + Number(calcArmDistSrvcFee(loan));
            } else {
                return Number(calcArmProcFee(loan)) + Number(calcArmSrvcFee(loan));
            }
        }
        function calcBookAdj(loancrop) {
            var bka = (Number(loancrop.bkprice) - Number(calcCropProdPrice(loancrop))) * Number(loancrop.bkqty);
            if(bka < 0) {
                return 0;
            } else {
                return bka;
            }
        }
        function calcBreakEvenPercent(loan) {
            if(!loan) { return 0; }

            var BE = Number(calcTotalFarmIncome(loan))/Number(calcTotalCropValues(loan));
            return BE;
        }
        function calcCashFlow(loan) {
            if(! loan ) { return 0; }
            var total_income = Number(calcTotalIncome(loan));
            var total_commitment = Number(calcTotalExpenses(loan));
            var est_interest = Number(loan.fins.int_total);

            return  total_income - total_commitment - est_interest;
        }
        function calcCropAcres(loancrop) {
            var practices = loancrop.practices;
            return _.sumCollection(practices, 'acres');
        }
        function calcCropAph(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'aph', 'acres');
        }
        function calcCropDiscCrop(obj, loan) {
            var crp = _.find(loan.loancrops, {crop_id: obj.crop_id});
            var crop_val = Number(calcCropIncome(crp));
            return crop_val * ((100 - loan.fins.discounts.percent_crop)/100);
        }
        function calcCropDiscOver(obj, loan) {
            var m = Number(calcCropMPCIbySummary(obj, loan));
            var c = Number(calcCropDiscCrop(obj, loan));

            if(m - c < 0) {
                return 0;
            } else {
                return m - c;
            }
        }
        function calcCropDiscOverD(obj, loan) {
            return Number(calcCropDiscOver(obj, loan)) * ((100 - Number(loan.fins.discounts.percent_insoyield))/100);
        }
        function calcCropFee(onTotal, arm_budget, dist_budget, fee_percent) {
            if(onTotal){
                return (Number(arm_budget) + Number(dist_budget)) * (fee_percent/100);
            } else {
                return Number(arm_budget) * (fee_percent/100);
            }
        }
        function calcCropIncome(loancrop) {
            return Number(calcCropValue(loancrop)) + Number(calcBookAdj(loancrop)) - Number(calcHvstAdj(loancrop));
        }
        function calcCropInsValBySummary(obj, loan) {
            return Number(calcCropMPCIbySummary(obj, loan)) + Number(calcCropSupInsbySummary(obj, loan));
        }
        function calcCropMPCIbySummary(obj, loan) {
            //console.log('cMPCI', obj);
            var cMPCI = 0;
            var acres = Number(calcAcresCrop(obj.crop_id, loan));
            var mpci_acre = Number(calcMPCIbyCropSummary(obj));
            var premium = Number(obj.premium);
            var ins_share = Number(obj.ins_share)/100;
            cMPCI = (mpci_acre - premium) * acres * ins_share;
            return cMPCI;
        }
        function calcCropProdPrice(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'prod_price', 'acres');
        }
        function calcCropProdShare(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'prod_share', 'acres');
        }
        function calcCropProdYield(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'prod_share', 'acres');
        }
        function calcCropSco(obj, loan) {
            return Number(calcCropSupInsbySummary(obj, loan)) * ((100 - Number(loan.fins.discounts.percent_suppins))/100);
        }
        function calcCropSupInsbySummary(obj, loan) {
            var acres = Number(calcAcresCrop(obj.crop_id, loan));
            var ex_rev = Number(obj.exp_yield) * (Number(obj.ins_level)/100);
            var csi_acre = (Number(obj.stax_desired_range)/100) * (Number(obj.stax_protection_factor)/100) * Number(ex_rev);
            var ins_share = Number(obj.ins_share)/100;

            return csi_acre * acres * ins_share;
        }
        function calcCropTotal(obj, loan) {
            return Number(calcCropDiscCrop(obj, loan)) + Number(calcCropDiscOverD(obj, loan)) + Number(calcCropSco(obj, loan));
        }
        function calcCropTotsCrop(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropDiscCrop(is, loan));
            });
            return retro;
        }
        function calcCropTotsInsVal(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropInsValBySummary(is, loan));
            });
            return retro;
        }
        function calcCropTotsMOC(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropDiscOver(is, loan));
            });
            return retro;
        }
        function calcCropTotsMPCI(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropMPCIbySummary(is, loan));
            });
            return retro;
        }
        function calcCropTotsMPCIBySummary(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcMPCIbyCropSummary(is, loan));
            });
            return retro;
        }
        function calcCropTotsSco(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropSco(is, loan));
            });
            return retro;
        }
        function calcCropTotsSupIns(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropSupInsbySummary(is, loan));
            });
            return retro;
        }
        function calcCropTotsTot(loan) {
            var retro = 0;
            _.each(loan.ins_summary, function(is){
                retro += Number(calcCropTotal(is, loan));
            });
            return retro;
        }
        function calcCropValue(loancrop) {
            var acres = Number(calcCropAcres(loancrop));
            var prod_yld = Number(calcCropProdYield(loancrop));
            var prod_price = Number(calcCropProdPrice(loancrop));
            var prod_share = (Number(calcCropProdShare(loancrop))/100);

            //console.log('CalcCropValue', acres, prod_yld, prod_price, prod_share);
            return acres * prod_yld * prod_price * prod_share;
        }
        function calcDistInterest(loan) {
            var terms = loan.terms;
            var num_terms = terms.length;
            var days = terms[num_terms-1].est_days;
            var rate = terms[num_terms-1].int_percent_dist;
            var commit = loan.fins.principal_dist;

            return (days/365) * (rate/100) * commit;
        }
        function calcDistProcFee(loan) {
            var commit = Number(loan.fins.commit_dist);
            var rate = Number(loan.terms[loan.terms.length-1].fee_processing_dist);

            return commit * rate;
        }
        function calcDistSrvcFee(loan) {
            var commit = Number(loan.fins.commit_dist);
            var rate = Number(loan.terms[loan.terms.length-1].fee_service_dist);

            return commit * rate;
        }
        function calcDistTotalFee(loan) {
            return Number(calcDistProcFee(loan)) + Number(calcDistSrvcFee(loan));
        }
        function calcExposure(loan) {
            if(! loan ) { return 0; }
            var total_collateral = Number(calcTotalCollateral(loan));
            var total_arm_and_dist = Number(calcTotalArmDistCommitment(loan));

            return total_collateral - total_arm_and_dist;
        }
        function calcFSACollateralValue(loan) {
            if(!loan) { return 0; }

            return Number(loan.fins.total_fsa_pay) * (100 - Number(loan.fins.discounts.percent_fsa))/100;
        }
        function calcHvstAdj(loancrop) {
            //acres*yield*-harvest
            var hvsta = Number(calcCropAcres(loancrop)) * Number(calcCropProdYield(loancrop)) * Number(loancrop.var_harvest);
            return hvsta;
        }
        function calcInsCoverageExcess(loan) {
            if(!loan) { return 0; }

            //return Number(calcInsuranceTotalValue(loan)) - (loan.expenses.totals.byLoan.arm + loan.expenses.totals.byLoan.dist);
        }
        function calcInsbyCrop(loancrop, loan) {
            if(!loan) { return 0; }
            return Number(calcRPbyCrop(loancrop)) + Number(calcRHPEbyCrop(loancrop)) + Number(calcYPbyCrop(loancrop)) + Number(calcSupInsbyCropSummary(loancrop, loan));
        }
        function calcInsCropValue(obj) {
            //(Guarantee-Premium)*(Share/100)*Acres
            return (Number(obj.guarantee) - Number(obj.premium)) * (Number(obj.share)/100) * Number(obj.acres);
        }
        function calcInsOverDisc(obj, loan) {
            if(!loan) { return 0; }
            if(!loan.fins || !loan.fins.discounts) { return 0; }
            var insValue = Number(calcInsbyCrop(obj, loan));
            var cropValue = Number(calcCropValue(obj));
            var projectedCropDiscount = Number(loan.fins.discounts.percent_crop);

            var formula = insValue - cropValue;

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
        function calcInsOverDYield(loan) {
            if(!loan) { return 0; }
            var lc = loan.loancrop;
            var retro = 0;

            _.each(lc, function(i){
                var mpci = Number(calcMPCIbyCrop(i));
                var premium = Number(i.practices[0].ins_premium);
                var ins_share = Number(i.practices[0].ins_share)/100;
                var acres = Number(i.acres);
                var prod_yield = Number(i.practices[0].prod_yield);
                var prod_price = Number(i.practices[0].prod_price);
                var prod_share = Number(i.practices[0].prod_price)/100;
                var discCrop = Number(loan.fins.discounts.percent_crop)/100;

                var val = ((mpci-premium) * ins_share * acres) - (acres * prod_yield * prod_price * prod_share * (1 - discCrop));

                if(val > 0) {
                    retro += val;
                }
            });
            return retro;
        }
        function getInsTypesBySummary(obj, loan) {
            //console.log('Type', obj);
            return 'RP YP'
        }
        function calcInsShareCrop(cropID, loan) {
            if(!loan) { return 0; }
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
        function calcInsuranceTotalByCropSummary(loan) {
            if(!loan) { return 0; }
            if(!loan.ins_summary) {return 0; }
            var total = 0;

            _.each(loan.ins_summary, function(i){
                total += Number(calcInsValueByCropSummary(i, loan));
            });

            return total;
        }
        function calcInsuranceTotalGuarantee(loan) {
            if(!loan) { return 0; }

            // TOTAL INSURANCE VALUE
            return calcTotalOverDisc(loan);
        }
        function calcInsuranceTotalValue(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(lc){
                total += calcInsbyCrop(lc, loan);
            });
            return total;
        }
        function calcInsuranceValue(obj) {
            if(!obj.yield){
                obj.yield = obj.ins_yield;
            }

            return (Number(calcInsuranceGuaranty(obj)) - Number(obj.premium)) * (Number(obj.share) / 100) * obj.acres;
        }
        function calcInsValueByCropSummary(obj, loan) {
            if(!loan) { return 0; }
            var mpciLessPremium = calcMPCIbyCropSummary(obj) - Number(obj.premium);
            var supIns = calcSupInsbyCropSummary(obj, loan);
            var acres = Number(calcAcresCrop(obj.crop_id, loan));
            return (mpciLessPremium + supIns) * acres;
        }
        function calcInterestARM(int_percent, loan) {
            var int_percent = Number(int_percent);
            var arm_commit = Number(loan.fins.commit_arm);
            var est_days = Number(loan.est_days);

            var calc = int_percent * (est_days/365) * arm_commit;
            return calc;
        }
        function calcInterestDist(int_percent, loan) {
            var dist_commit = Number(loan.fins.commit_dist);
            var est_days = Number(loan.fins.est_days);

            var calc = int_percent * (est_days/365) * dist_commit;
            return calc;
        }
        function calcIODCollateralValue(loan) {
            if(!loan) { return 0; }
            return (Number(calcTotalMPCI(loan)) * (100 - Number(loan.fins.discounts.percent_insoyield))/100);
        }
        function calcLoanFee(loan) {
            if(loan.has_addendum) {
                var adds = loan.addendums;
                var sorted = _.sortBy(adds, 'app_date').reverse();
                var old_fees = Number(sorted[0]['fee_total']);

                return Number(loan.fins.fee_total) - old_fees;
            } else {
                return loan.fins.fee_total;
            }
        }
        function calcMarketValueTotal(loan) {
            if(!loan) { return 0; }

            //formula: calcPlannedCropValue(loan) + calcFSACollateralValue(loan) + calcIODCollateralValue(loan) + calcNRPCollateralValue(loan) + calcSuppInsValue(loan) + calcEquipmentCollateralValue(loan) + calcRECollateralTotal(loan) + calcOtherCollateralValue(loan);

            return Number(loan.fins.adj_prod) + Number(loan.fins.total_fsa_payment) + Number(loan.fins.ins_disc_prod) + Number(loan.insurance.nonrp.value) + Number(loan.supplements.totals.value) + Number(calcEquipmentCollateralValue(loan)) + Number(calcRECollateralValue(loan)) + Number(calcOtherCollateralValue(loan));
        }
        function calcMPCIbyCrop(loancrop) {
            var level = _.weighted('loancrop.practices', 'ins_level');
            var ins_price = _.weighted('loancrop.practices', 'ins_price');
            var aph = _.weighted('loancrop.practices', 'aph');

            return Number(level) * Number(ins_price)/100 * Number(aph);
        }
        function calcMPCIbyCropSummary(obj) {
            //per acre calculation
            return Number(obj.ins_level/100) * Number(obj.ins_price) * Number(obj.ins_share);
        }
        function calcOCDbyType(type, loan) {
            if (!loan) { return 0; }

            var collateral = loan.other_collateral;
            var vals = [];

            _.each(collateral, function (i) {
                if (i.type === type) {
                    var nwb = {
                        discount: i.discount,
                        mkt_value: i.mkt_value
                    }
                    vals.push(nwb);
                }
            });

            var market = calcOCMVbyType(type, loan);
            var disc = _.weighted(vals, 'discount', 'mkt_value');
            return market * ((100-disc)/100);
        }
        function calcOCDTByType(type, loan) {
            var discounted = calcOCDbyType(type, loan);
            var liened = calcOCPLbyType(type, loan);
            var total = Number(discounted - liened);
            if(total < 0) {
                return 0;
            } else {
                return total;
            }
        }
        function calcOCMVbyType(type, loan) {
            if (!loan) { return 0; }

            var collateral = loan.other_collateral;
            var total = 0;

            _.each(collateral, function (i) {
                if (i.type === type) {
                    total += Number(i.mkt_value);
                }
            });

            return total;
        }
        function calcOCPLbyType(type, loan) {
            if (!loan) {
                return 0;
            }

            var collateral = loan.other_collateral;
            var total = 0;

            _.each(collateral, function (i) {
                if (i.type === type) {
                    total += Number(i.prior_lien);
                }
            });

            return total;
        }
        function calcOtherCollateralByType(type, loan) {
            if(!loan) { return 0; }

            var collateral = loan.other_collateral;
            var total = 0;

            _.each(collateral, function(i){
                if(i.type === type) {
                    var val = Number(i.mkt_value) * ((100 - Number(i.discount))/100) - Number(i.prior_lien);
                    if(val >= 0) {
                        total += val;
                    }
                }
            });
            
            return total;
        }
        function calcPlannedCropValue(loan) {
            if(!loan) { return 0; }
            return (Number(calcProjectedCrops(loan)) * (100 - Number(loan.fins.discounts.percent_crop))/100) - Number(loan.fins.prior_lien_total);
        }
        function calcProjectedCrops(loan) {
            if(!loan) { return 0; }
            var toti = 0;
            _.each(loan.loancrops, function(item){
                var cropval = calcCropIncome(item);
                toti += cropval;
            });
            if(toti < 0) {
                return 0;
            } else {
                return toti;
            }
        }
        function calcProjectedDiscCrops(loan) {
            var crops = Number(calcProjectedCrops(loan));
            var disc = Number(loan.fins.discounts.percent_crop);
            var total = Number(crops * ((100 - disc)/100));
            return total;
        }
        function calcRHPEbyCrop(loancrop) {
            var RIP = [];
            _.each(loancrop.practices, function(p){
                if(p.ins_type === 'RPHPE') {
                    RIP.push(p);
                }
            });

            var acres = _.sumCollection(RIP, 'acres');
            var lvl = _.weighted(RIP, 'ins_level', 'acres');
            var ins_level = lvl/100;
            var ins_price = _.weighted(RIP, 'ins_price', 'acres');
            var aph = _.weighted(RIP, 'aph', 'acres');
            var premium = _.weighted(RIP, 'ins_premium', 'acres');
            var shr = _.weighted(RIP, 'ins_share', 'acres');
            var ins_share = shr/100;

            return ((ins_level * ins_price * aph) - premium) * ins_share * acres;
        }
        function calcRHPEDiscount(loan) {
            if(!loan) { return 0; }
            var lc = loan.loancrops;
            var retro = 0;

            _.each(lc, function(i){
                return _.each(i.practices, function(p){
                    if(p.type === 'RHPE') {
                        var mpci = Number(calcMPCIbyCrop(p));
                        var premium = Number(p.ins_premium);
                        var ins_share = Number(p.ins_share/100);
                        var aph = Number(p.aph);
                        var disc = loan.fins.discounts.percent_rphpe;
                        var val = ((mpci - premium) * ins_share * aph) * disc;

                        retro += val;
                    }
                });
            });

            return retro;
        }
        function calcRebateAdj(obj) {
            return Number(obj.acres) * Number(obj.practices[0].aph) * obj.rebates * 0.0020;
        }
        function calcRPbyCrop(loancrop) {
            var RIP = [];
            _.each(loancrop.practices, function(p){
                if(p.ins_type === 'RP') {
                    RIP.push(p);
                }
            });

            var acres = _.sumCollection(RIP, 'acres');
            var lvl = _.weighted(RIP, 'ins_level', 'acres');
            var ins_level = lvl/100;
            var ins_price = _.weighted(RIP, 'ins_price', 'acres');
            var aph = _.weighted(RIP, 'aph', 'acres');
            var premium = _.weighted(RIP, 'ins_premium', 'acres');
            var shr = _.weighted(RIP, 'ins_share', 'acres');
            var ins_share = shr/100;

            return ((ins_level * ins_price * aph) - premium) * ins_share * acres;
        }
        function calcSuppCoverage(loan) {
            if(!loan) { return 0; }
            // foreach loancrop, (covRnge*prot*ExRev) * ins_share * acres
            // ExRev =IF(covRnge+ins_level>0.9,|don't allow|,ExYield*ins_price)
            var retro = 0;

            _.each(loan.ins_summary, function(i){
                var expRev = i.exp_yield * i.ins_price;
                var sup = i.stax_desired_range * i.stax_protection_factor/100 * expRev;
                retro += sup;
            });
            return retro;
        }
        function calcSupInsbyCropSummary(obj, loan) {
            if(!loan) {return 0; }
            var policies = [];
            if(!loan.inspols) {
                return 0;
            } else {
                policies = _.filter(loan.inspols, {crop_id: obj.crop_id});
                var stax = 0;
                var sco = 0;

                _.each(policies, function(p){
                    if(p.options === 'STAX') {
                        stax += (Number(p.stax_desired_range)/100) * (Number(p.exp_yield) * Number(p.ins_price)) * (Number(p.stax_protection_factor)/100);
                    } else {
                        if(p.aph && p.options === 'SCO') {
                            sco += (Number(p.stax_desired_range)/100) * (Number(p.aph) * Number(p.ins_price));
                        }
                    }
                });
                return stax + sco;
            }
        }
        function calcSuppInsMax(obj) {
            //console.log('MAX', obj);
            //coverage range/100 * expected yield * price
            var max = 0;
            return 50;
        }
        function calcSuppInsTotal(obj) {
            //console.log('INSPOLS', obj);

            var max = calcSuppInsMax(obj);
            return 999999;
        }
        function calcTotalAcres(loan) {
            if(!loan) { return 0; }
            var retro = 0;
            _.each(loan.loanpractices, function(lp){
                retro += Number(lp.acres);
            });
            return retro;
        }
        function calcTotalArmAndFarmExpenses(loan) {
            if(!loan) { return 0; }
            return Number(loan.expenses.totals.byLoan.arm) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalAllCommitment(loan) {
            if(!loan) { return 0; }

            var commit_arm = Number(loan.fins.commit_arm);
            var fee_total = Number(loan.fins.fee_total);
            var int_arm = Number(loan.fins.int_arm);
            var commit_dist = Number(loan.fins.commit_dist);
            var int_dist = Number(loan.fins.int_dist);
            var commit_other = Number(loan.fins.commit_other);

            //console.log('AllCommittment', commit_arm, fee_total, int_arm, commit_dist, int_dist, commit_other);

            return commit_arm + fee_total + int_arm + commit_dist + int_dist + commit_other;
        }
        function calcTotalArmDistCommitment(loan) {
            if(!loan) { return 0; }

            return Number(loan.fins.commit_arm) + Number(loan.fins.fee_total) + Number(loan.fins.int_arm) + Number(loan.fins.commit_dist) + Number(loan.fins.int_dist);
        }
        function calcTotalBookedAdj(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                total += Number(calcBookAdj(i));
            });
            return total;
        }
        function calcTotalCollateral(loan) {
            if(!loan) { return 0; }
            var crops = Number(calcProjectedCrops(loan));
            var fsaPaid = 0;
            var discountedMPCI = Number(calcTotalDiscMPCI(loan));
            var supCoverage = Number(calcSuppCoverage(loan));
            var equipment = Number(calcOCMVbyType('equipment', loan));
            var realEstate = Number(calcOCMVbyType('realestate', loan));
            var other = Number(calcOCMVbyType('other', loan));

            return crops + fsaPaid + discountedMPCI + supCoverage + equipment + realEstate + other;
        }
        function calcTotalCollateralLiens(loan) {
            if(!loan) { return 0; }
            var crops = Number(loan.fins.prior_lien_total);
            var equipment = Number(calcOCPLbyType('equipment', loan));
            var realEstate = Number(calcOCPLbyType('realestate', loan));
            var other = Number(calcOCPLbyType('other', loan));

            return crops + equipment + realEstate + other;
        }
        function calcTotalCollateralVal(loan) {
            if(!loan) { return 0; }
            var crops = Number(calcPlannedCropValue(loan));
            var insOverDiscountedYield = Number(calcIODCollateralValue(loan));
            var supCoverage = Number(calcTotalSupIns(loan));
            var equipment = Number(calcOtherCollateralByType('equipment', loan));
            var realEstate = Number(calcOtherCollateralByType('realestate', loan));
            var other = Number(calcOtherCollateralByType('other', loan));
            var fsaPaid = Number(calcFSACollateralValue(loan));

            return crops + fsaPaid + insOverDiscountedYield + supCoverage + equipment + realEstate + other;
        }
        function calcTotalCommitment(loan) {
            if(!loan) { return 0; }
            return calcTotalAllCommitment(loan);
        }
        function calcTotalCropValues(loan) {
            if(!loan) { return 0; }
            var toti = 0;
            _.each(loan.loancrops, function(item){
                var cropval = calcCropValue(item);
                toti += cropval;
            });
            return toti;
        }
        function calcTotalDiscMPCI(loan) {
            var mpci = Number(calcTotalMPCI(loan));
            var disc = Number(loan.fins.discounts.percent_insoyield);

            return mpci * ((100 - disc)/100);
        }
        function calcTotalDiscSuppCoverage(loan) {
            var supp = Number(calcSuppCoverage(loan));
            var disc = Number(loan.fins.discounts.percent_suppins);

            return supp * ((100 - disc)/100);
        }
        function calcTotalExpenses(loan) {
            if(!loan) { return 0; }
            return Number(loan.expenses.totals.byLoan.arm) + Number(loan.expenses.totals.byLoan.dist) + Number(loan.expenses.totals.byLoan.other) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalFarmExpenses(loan) {
            if(!loan) { return 0; }
            var col = loan.farmexpenses;
            var total = _.sumCollection(col, 'cost');
            return total;
        }
        function calcTotalHarvestAdj(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                total += Number(calcHvstAdj(i));
            });
            return total * -1;
        }
        function calcTotalIncome(loan) {
            if(!loan) { return 0; }
            var toti = 0;
            _.each(loan.loancrops, function(item){
                var cropval = calcCropIncome(item);
                toti += cropval;
            });
            return toti + Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect);
        }
        function calcTotalIncomeWithOther(loan) {
            return Number(calcTotalIncome(loan)) + Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect);
        }
        function calcTotalMPCI(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                if(calcInsOverDisc(i, loan) > 0) {
                    total += calcInsOverDisc(i, loan);
                }
            });
            return total;
        }
        function calcTotalFarmIncome(loan) {
            if(!loan) { return 0; }

            return Number(loan.fins.commit_arm) + Number(loan.fins.commit_dist) - (Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect));
        }
        function calcTotalRebateAdj(loan) {
            var lc = loan.loancrops;
            var total = 0;

            _.each(lc, function(l){
                total += Number(calcRebateAdj(l));
            });

            return total;
        }
        function calcTotalRPIns(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                total += Number(calcRPbyCrop(i));
            });
            return total;
        }
        function calcTotalRPHPEIns(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                total += Number(calcRHPEbyCrop(i));
            });
            return total;
        }
        function calcTotalSupIns(loan) {
            if(!loan) { return 0; }

            return Number(calcSuppCoverage(loan)) * ((100 - Number(loan.fins.discounts.percent_suppins))/100);
        }
        function calcTotalYPIns(loan) {
            if(!loan) { return 0; }
            var total = 0;
            _.each(loan.loancrops, function(i){
                total += Number(calcYPbyCrop(i));
            });
            return total;
        }
        function calcYieldCrop(cropID, loan) {
            if(!loan) { return 0; }
            var crops = loan.loancrops;
            var crop = _.find(crops, {crop_id: cropID});

            var yield_weighted = _.weighted(crop.practices, 'prod_yield', 'acres');
            return yield_weighted;
        }
        function calcYPbyCrop(loancrop) {
            var RIP = [];
            _.each(loancrop.practices, function(p){
                if(p.ins_type === 'YP') {
                    RIP.push(p);
                }
            });

            var acres = _.sumCollection(RIP, 'acres');
            var lvl = _.weighted(RIP, 'ins_level', 'acres');
            var ins_level = lvl/100;
            var ins_price = _.weighted(RIP, 'ins_price', 'acres');
            var aph = _.weighted(RIP, 'aph', 'acres');
            var premium = _.weighted(RIP, 'ins_premium', 'acres');
            var shr = _.weighted(RIP, 'ins_share', 'acres');
            var ins_share = shr/100;

            return ((ins_level * ins_price * aph) - premium) * ins_share * acres;
        }
        function calcYPCollateralValue(loan) {
            if(!loan) { return 0; }
            return (Number(calcTotalYPIns(loan)) * (100 - Number(loan.fins.discounts.percent_nonrp))/100);
        }
        function calcYPDiscount(loan) {
            if(!loan) { return 0; }
            var lc = loan.loancrops;
            var retro = 0;

            _.each(lc, function(i){
                _.each(i.practices, function(p){
                    if(p.type === 'YP') {
                        var mpci = Number(calcMPCIbyCrop(p));
                        var premium = Number(p.ins_premium);
                        var ins_share = Number(p.ins_share/100);
                        var aph = Number(p.aph);
                        var disc = loan.fins.discounts.percent_rphpe;
                        var val = ((mpci - premium) * ins_share * aph) * disc;

                        retro += val;
                    }
                });
            });

            return retro;
        }
        function createNewFarmExpense() {
            alert('creating a new farm expense');
        }
        function filterLoans(loans, val) {
            if(!loans) { return []; }

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
        function getAllCrops() {
            //TODO: Hard Coded
            return ['corn', 'soybeans', 'beansFAC', 'sorghum', 'wheat', 'cotton', 'rice', 'peanuts', 'sugarcane'];
        }
        function getAverage(arr) {
            var a = 0;
            var c = 0;
            _.each(arr, function(i){
                if(!_.isNull(i) && !_.isNaN(i)) {
                    a += i;
                    c += 1;
                }
            });
            return a/c;
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
        function getInsByType(loancrop) {
            var practices = loancrop.practices;
            var byType = _.chain(practices)
                        .groupBy('ins_type')
                        .value();
            return byType;
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
        function makeNewLoan(loanid, user, globals) {
            //console.log('NEW', loanid, user, globals);
            switch(Number(loanid)) {
                case 1:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "12/15/" + globals.globvars[0].crop_year,
                        due_date: "12/15/" + globals.globvars[0].crop_year,
                        loan_type_id: 1,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
                case 3:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "12/15/" + globals.globvars[0].crop_year,
                        due_date: "12/15/" + globals.globvars[0].crop_year,
                        loan_type_id: 3,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
                case 4:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "12/15/" + globals.globvars[0].crop_year,
                        due_date: "12/15/" + globals.globvars[0].crop_year,
                        loan_type_id: 4,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
                case 5:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        loan_type_id: 5,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };;
                    break;
                case 6:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        loan_type_id: 6,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
                case 7:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        due_date: "03/15/" + Number(globals.globvars[0].crop_year) + 1,
                        loan_type_id: 7,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
                default:
                    return {
                        app_date: moment().format('MM/DD/YYYY'),
                        default_due_date: "12/15/" + globals.globvars[0].crop_year,
                        due_date: "12/15/" + globals.globvars[0].crop_year,
                        loan_type_id: 2,
                        status_id: 1,
                        crop_year: globals.globvars[0].crop_year,
                        season: globals.globvars[0].season,
                        loc_id: user.loc_id,
                        region_id: user.location.region_id,
                        user_id: user.id,
                        applicant: {},
                        applicant_id: null,
                        farmer: {},
                        farmer_id: null
                    };
                    break;
            }
        }
        function makeXCropvals(loan) {
            var lc = loan.loancrops;
            var corn = _.find(lc, function(c){
                if(Number(c.crop_id) === 1) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var beans =  _.find(lc, function(c){
                if(Number(c.crop_id) === 2) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var sorghum = _.find(lc, function(c){
                if(Number(c.crop_id) === 4) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var wheat = _.find(lc, function(c){
                if(Number(c.crop_id) === 5) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var cotton = _.find(lc, function(c){
                if(Number(c.crop_id) === 6) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var rice = _.find(lc, function(c){
                if(Number(c.crop_id) === 7) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var peanuts = _.find(lc, function(c){
                if(Number(c.crop_id) === 8) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var cane = _.find(lc, function(c){
                if(Number(c.crop_id) === 9) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });
            var sunflowers = _.find(lc, function(c){
                if(Number(c.crop_id) === 10) {
                    return calcCropValue(c);
                } else {
                    return 0;
                }
            });

            var cropvals = {
                corn: (!corn ? 0 : calcCropValue(corn)),
                soybeans: (!beans ? 0 : calcCropValue(beans)),
                sorghum: (!sorghum ? 0 : calcCropValue(sorghum)),
                wheat: (!wheat ? 0 : calcCropValue(wheat)),
                cotton: (!cotton ? 0 : calcCropValue(cotton)),
                rice: (!rice ? 0 : calcCropValue(rice)),
                peanuts: (!peanuts ? 0 : calcCropValue(peanuts)),
                sugarcane: (!cane ? 0 : calcCropValue(cane)),
                sunflowers: (!sunflowers ? 0 : calcCropValue(sunflowers))
            };

            return cropvals;
        }
        function makeXInsVals(loan) {
            var iv = loan.ins_summary;
            var corn = _.find(iv, function(v){
                if(Number(v.crop_id) === 1) {
                    return v;
                }
            });
            var beans =  _.find(iv, function(v){
                if(Number(v.crop_id) === 2) {
                    return v;
                }
            });
            var sorghum = _.find(iv, function(v){
                if(Number(v.crop_id) === 4) {
                    return v;
                }
            });
            var wheat = _.find(iv, function(v){
                if(Number(v.crop_id) === 5) {
                    return v;
                }
            });
            var cotton = _.find(iv, function(v){
                if(Number(v.crop_id) === 6) {
                    return v;
                }
            });
            var rice = _.find(iv, function(v){
                if(Number(v.crop_id) === 7) {
                    return v;
                }
            });
            var peanuts = _.find(iv, function(v){
                if(Number(v.crop_id) === 8) {
                    return v;
                }
            });
            var cane = _.find(iv, function(v){
                if(Number(v.crop_id) === 9) {
                    return v;
                }
            });
            var sunflowers = _.find(iv, function(v){
                if(Number(v.crop_id) === 10) {
                    return v;
                }
            });

            var insvals = {
                corn: (!corn ? 0 : calcInsValueByCropSummary(corn, loan)),
                soybeans: (!beans ? 0 : calcInsValueByCropSummary(beans, loan)),
                sorghum: (!sorghum ? 0 : calcInsValueByCropSummary(sorghum, loan)),
                wheat: (!wheat ? 0 : calcInsValueByCropSummary(wheat, loan)),
                cotton: (!cotton ? 0 : calcInsValueByCropSummary(cotton, loan)),
                rice: (!rice ? 0 : calcInsValueByCropSummary(rice, loan)),
                peanuts: (!peanuts ? 0 : calcInsValueByCropSummary(peanuts, loan)),
                sugarcane: (!cane ? 0 : calcInsValueByCropSummary(cane, loan)),
                sunflowers: (!sunflowers ? 0 : calcInsValueByCropSummary(sunflowers, loan))
            };

            return insvals;
        }
        function nullOrNot(obj) {
            return !angular.isDefined(obj) || obj===null;
        }
        function parseComments(comms) {
            if(comms.length < 2) { return []; }
            var Loan = _.filter(comms, function(i){
                return i.type == 'Loan';
            });
            var Addendum = _.filter(comms, function(i){
                return i.type == 'Addendum';
            });

            var Others = _.filter(comms, function(i){
                return i.type !== 'Addendum' && i.type !== 'Loan';
            })

            return {
                Loan: Loan,
                Addendum: Addendum,
                Others: Others
            };
        }
        function processXCols(loan, loans) {
            //console.log('LOAN', loan);
            var xcols = [];
            _.each(loan.xcols, function(x){
                _.each(loans, function(l){
                    if(Number(l.id) === Number(x.id)) {
                        var newbie = {
                            id: Number(l.id),
                            applicant: l.applicant.applicant,
                            cash_flow: l.fins.cash_flow,
                            collateral_crops: Number(calcPlannedCropValue(l)),
                            collateral_fsa: Number(calcOCDTByType('fsa', l)),
                            collateral_equipment: Number(calcOCDTByType('equipment', l)),
                            collateral_mpci: Number(calcTotalDiscMPCI(l)),
                            collateral_other: Number(calcOCDTByType('other', l)),
                            collateral_realestate: Number(calcOCDTByType('realestate', l)),
                            collateral_stax_sco: Number(calcTotalDiscSuppCoverage(l)),
                            commit_arm: l.fins.commit_arm,
                            commit_dist: l.fins.commit_dist,
                            commit_other: l.fins.commit_other,
                            crop_acres: l.fins.crop_acres,
                            crop_values: makeXCropvals(l),
                            exposure: l.fins.exposure,
                            expenses: l.expenses,
                            interest_arm: Number(calcArmInterest(l)),
                            interest_dist: Number(calcDistInterest(l)),
                            mpci_value: Number(calcCropTotsMPCIBySummary(l)),
                            origination_fee: Number(calcArmDistProcFee(l))/10,
                            service_fee: Number(calcArmDistSrvcFee(l))/10,
                            stax_sco_value: Number(calcCropTotsSco(l)),
                            total_acres: Number(l.fins.total_acres)
                        };
                        xcols.push(newbie);
                    }
                });
            });
            //console.log('XCOLS', xcols);
            return xcols;
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
        function submitLoan(loan) {
            alert('Submitting loan id #' + loan.id + ' to committee');
        }
        function submitLoanSolo(loan) {
            alert('Solo submitting loan id #' + loan.id + ' to committee');
        }
        function submitToDist(loan) {
            alert('Submitting loan id #' + loan.id + ' to distributor');
        }
        function sumThese(a, b) {
            return a + b;
        }
        function withdrawLoan(loan) {
            alert('Withdraw loan id #' + loan.id);
        }
        function xArmCommit(xc, loans) {
            var retro = 0;
            _.filter(loans, function(l){
                if(Number(l.id) === Number(xc.id)) {
                    retro += Number(l.fins.principal_arm);
                }
            });
            return retro;
        }
        function xCashFlow(xc, loans) {
            var retro = 0;
            _.filter(loans, function(l){
                if(Number(l.id) === Number(xc.id)) {
                    retro += Number(l.fins.cash_flow);
                }
            });
            return retro;
        }
        function xDistCommit(xc, loans) {
            var retro = 0;
            _.filter(loans, function(l){
                if(Number(l.id) === Number(xc.id)) {
                    retro += Number(l.fins.principal_dist);
                }
            });
            return retro;
        }
        function xExposure(xc, loans) {
            var retro = 0;
            _.filter(loans, function(l){
                if(Number(l.id) === Number(xc.id)) {
                    retro += Number(l.fins.exposure);
                }
            });
            return retro;
        }
    } // end factory

})();