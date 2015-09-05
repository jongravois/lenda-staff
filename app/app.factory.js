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
            calcAdjExposure: calcAdjExposure,
            calcBookAdj: calcBookAdj,
            calcBreakEvenPercent: calcBreakEvenPercent,
            calcCashFlow: calcCashFlow,
            calcCropAcres: calcCropAcres,
            calcCropAph: calcCropAph,
            calcCropProdPrice: calcCropProdPrice,
            calcCropProdShare: calcCropProdShare,
            calcCropValue: calcCropValue,
            calcExposure: calcExposure,
            calcHvstAdj: calcHvstAdj,
            calcInsCoverageExcess: calcInsCoverageExcess,
            calcInsCropValue: calcInsCropValue,
            calcInsuranceGuaranty: calcInsuranceGuaranty,
            calcInsOverDisc: calcInsOverDisc,
            calcInsOverDiscNonRP: calcInsOverDiscNonRP,
            calcInsOverDYield: calcInsOverDYield,
            calcInsShareCrop: calcInsShareCrop,
            calcInsuranceTotalByCropSummary: calcInsuranceTotalByCropSummary,
            calcInsuranceTotalGuarantee: calcInsuranceTotalGuarantee,
            calcInsuranceTotalValue: calcInsuranceTotalValue,
            calcInsuranceValue: calcInsuranceValue,
            calcInsValueByCropSummary: calcInsValueByCropSummary,
            calcMarketValueTotal: calcMarketValueTotal,
            calcMPCIbyCrop: calcMPCIbyCrop,
            calcMPCIbyCropSummary: calcMPCIbyCropSummary,
            calcOtherCollateralByType: calcOtherCollateralByType,
            calcRHPEDiscount: calcRHPEDiscount,
            calcAdjProd: calcAdjProd,
            calcRPbyCrop: calcRPbyCrop,
            calcSupInsbyCropSummary: calcSupInsbyCropSummary,
            calcSuppInsMax: calcSuppInsMax,
            calcSuppInsTotal: calcSuppInsTotal,
            calcTotalArmAndFarmExpenses: calcTotalArmAndFarmExpenses,
            calcTotalExpenses: calcTotalExpenses,
            calcTotalFarmExpenses: calcTotalFarmExpenses,
            calcTotalIncome: calcTotalIncome,
            calcYieldCrop: calcYieldCrop,
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
            nullOrNot: nullOrNot,
            optimized: optimized,
            parseComments: parseComments,
            patchIt: patchIt,
            postIt: postIt,
            putIt: putIt,
            returnColor: returnColor,
            sortLoans: sortLoans,
            submitLoan: submitLoan,
            submitLoanSolo: submitLoanSolo,
            submitToDist: submitToDist,
            sumThese: sumThese,
            withdrawLoan: withdrawLoan
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
                    //console.log('UCC', unit_cf_calcs);
                }
            });
            return unit_cf_calcs;
        }
        function averageArray(arr) {
            var removed_empty = _.compact(arr);
            return _.sum(removed_empty) / removed_empty.length;
        }
        function calcAcresByCrop(cropname, loan) {
            var ca = loan.fins.crop_acres;
            var cp = _.find(ca, {crop: cropname});
            return cp.acres;
        }
        function calcAcresCrop(cropID, loan) {
            var loanpractices = loan.loanpractices;
            var total = 0;

            _.each(loanpractices, function(i) {
                if (Number(i.crop_id) === Number(cropID)) {
                    total += Number(i.acres);
                }
            });

            return total;
        }
        function calcAdjExposure(loan) {
            return loan.fins.adjExposure;
        }
        function calcAdjProd(loan) {
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
        function calcBookAdj(loancrop) {
            var bka = (Number(loancrop.bkprice) - Number(calcCropProdPrice(loancrop))) * Number(loancrop.bkqty);
            if(bka < 0) {
                return 0;
            } else {
                return bka;
            }
        }
        function calcBreakEvenPercent(loan) {
            var BE = Number(calcTotalFarmIncome(loan))/Number(calcTotalCropValues(loan));
            return BE;
        }
        function calcCashFlow(loan) {
            return Number(calcTotalIncome(loan)) - Number(calcTotalAllCommitment(loan));
        }
        function calcCropAcres(loancrop) {
            var practices = loancrop.practices;
            return _.sumCollection(practices, 'acres');
        }
        function calcCropAph(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'aph', 'acres');
        }
        function calcCropFee(onTotal, arm_budget, dist_budget, fee_percent) {
            if(onTotal){
                return (Number(arm_budget) + Number(dist_budget)) * (fee_percent/100);
            } else {
                return Number(arm_budget) * (fee_percent/100);
            }
        }
        function calcCropProdPrice(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'prod_price', 'acres');
        }
        function calcCropProdShare(loancrop) {
            var practices = loancrop.practices;
            return _.weighted(practices, 'prod_share', 'acres');
        }
        function calcCropValue(loancrop) {
            return Number(calcCropAcres(loancrop)) * Number(calcCropAph(loancrop)) * Number(calcCropProdPrice(loancrop)) * (Number(calcCropProdShare(loancrop))/100)
        }
        function calcExposure(loan) {
            return Number(calcTotalCollateral(loan)) - Number(calcTotalArmDistCommitment(loan));
        }
        function calcHvstAdj(loancrop) {
            var hvsta = Number(calcCropAcres(loancrop)) * Number(calcCropAph(loancrop)) * Number(loancrop.var_harvest);
            if(hvsta < 0) {
                return 0;
            } else {
                return hvsta;
            }
        }
        function calcInsCoverageExcess(loan) {
            //return Number(calcInsuranceTotalValue(loan)) - (loan.expenses.totals.byLoan.arm + loan.expenses.totals.byLoan.dist);
        }
        function calcInsCropValue(obj) {
            //(Guarantee-Premium)*(Share/100)*Acres
            return (Number(obj.guarantee) - Number(obj.premium)) * (Number(obj.share)/100) * Number(obj.acres);
        }
        function calcInsOverDisc(obj) {
            var insValue = Number(calcInsCropValue(obj));
            var cropValue = Number(calcCropValue(obj));
            var projectedCropDiscount = Number(obj.proj_crop_discount);

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
        function calcInsOverDYield(loan) {
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
        function calcInsuranceTotalByCropSummary(loan) {
            var total = 0;

            _.each(loan.ins_summary, function(i){
                total += Number(calcInsValueByCropSummary(i, loan));
            });

            return total;
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
        function calcInsValueByCropSummary(obj, loan) {
            var mpciLessPremium = calcMPCIbyCropSummary(obj) - Number(obj.premium);
            var supIns = calcSupInsbyCropSummary(obj);
            var acres = Number(calcAcresCrop(obj.crop_id, loan));
            return (mpciLessPremium + supIns) * acres;
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
            return Number(obj.ins_level/100) * Number(obj.ins_price) * Number(obj.ins_share);
        }
        function calcOtherCollateralByType(type, loan) {
            var collateral = loan.other_collateral;
            var entries = [];
            _.each(collateral, function(i){
                if(i.type === type) {
                    entries.push(i);
                }
            });

            var total = 0;
            _.each(entries, function(obj){
                var val = Number(obj.mkt_value) * ((100 - Number(obj.discount))/100) - Number(obj.prior_lien);
                if(val >= 0) {
                    total += val;
                }
            });

            return total;
        }
        function calcRHPEDiscount(loan) {
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
        function calcRPbyCrop(loancrop) {
            //(MPCI - premium)*acres*share///MPCI = level * price * yield
            return Number(calcMPCIbyCrop(loancrop));
        }
        function calcSuppCoverage(loan) {
            var fu = loan.farmunits;
            var retro = 0;

            _.each(fu, function(u){
                return _.each(fu.crops, function(c){
                    var acres = c.acres;
                    var ins_share = c.ins_share/100;
                    var cov_range = c.cov_range;
                    var aph = c.aph;
                    var ins_price = c.ins.price;
                    retro += acres * ins_share * (cov_range * aph * ins_price);
                });
            });
            return retro;
        }
        function calcSupInsbyCropSummary(obj) {
            if(obj.OPTIONS === 'STAX') {
                return (Number(obj.stax_desired_range)/100) * (Number(obj.stax_protection_factor)/100) * (Number(obj.ins_price) * Number(obj.exp_yield));
            } else {
                return (Number(obj.stax_desired_range)/100) * Number(obj.exp_yield) * Number(obj.ins_price);
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
        function calcTotalArmAndFarmExpenses(loan) {
            return Number(loan.expenses.totals.byLoan.arm) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalAllCommitment(loan) {
            return Number(loan.fins.commit_arm) + Number(loan.fins.fee_total) + Number(loan.fins.int_arm) + Number(loan.fins.commit_dist) + Number(loan.fins.int_dist) + Number(loan.fins.commit_other);
        }
        function calcTotalArmDistCommitment(loan) {
            return Number(loan.fins.commit_arm) + Number(loan.fins.fee_total) + Number(loan.fins.int_arm) + Number(loan.fins.commit_dist) + Number(loan.fins.int_dist);
        }
        function calcTotalCollateral(loan) {
            var projectedCrops = Number(calcAdjProd(loan));
            var fsaPaid = Number(loan.fins.total_fsa_pay);
            var insOverDiscountedYield = Number(calcInsOverDYield(loan));
            var RPHPEDiscount = Number(calcRHPEDiscount(loan));
            var YPDiscount = Number(calcYPDiscount(loan));
            var supCoverage = Number(calcSuppCoverage(loan));
            var equipment = Number(calcOtherCollateralByType('equipment', loan));
            var realEstate = Number(calcOtherCollateralByType('realestate', loan));
            var other = Number(calcOtherCollateralByType('other', loan));

            return projectedCrops + fsaPaid + insOverDiscountedYield + RPHPEDiscount + YPDiscount + supCoverage + equipment + realEstate + other;
        }
        function calcTotalCommitment(loan) {
            return calcTotalAllCommitment(loan);
        }
        function calcTotalCropValues(loan) {
            return calcTotalIncome(loan);
        }
        function calcTotalExpenses(loan) {
            return Number(loan.expenses.totals.byLoan.arm) + Number(loan.expenses.totals.byLoan.dist) + Number(loan.expenses.totals.byLoan.other) + Number(calcTotalFarmExpenses(loan));
        }
        function calcTotalFarmExpenses(loan) {
            var col = loan.farmexpenses;
            var total = _.sumCollection(col, 'cost');
            return total;
        }
        function calcTotalIncome(loan) {
            var toti = 0;
            _.each(loan.loancrops, function(item){
                var cropval = calcCropValue(item);
                toti += cropval;
            });
            return toti + Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect);
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
        function calcYPDiscount(loan) {
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
        function getAllCrops() {
            //TODO: Hard Coded
            return ['corn', 'soybeans', 'beansFAC', 'sorghum', 'wheat', 'cotton', 'rice', 'peanuts', 'sugarcane'];
        }
        function getAverage(arr) {
            var g = [];
            _.each(arr, function(i){
                if(!_.isNull(i) && !_.isNaN(i)) {
                    g.push(i);
                }
            });
            return _.sum(g)/g.length;
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
            console.log('NEW', loanid, user, globals);
            switch(Number(loanid)) {
                case 1:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                case 3:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                case 4:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                case 5:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                case 6:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                case 7:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        agencies: '',
                        agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment(),
                        applicant: {},
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        committee: [],
                        committee_vote: {},
                        comments: [],
                        conditions_aci: true,
                        conditions_adis: true,
                        conditions_afsa: true,
                        conditions_areb: true,
                        conditions_asa: true,
                        conditions_cd: false,
                        conditions_ccl: false,
                        conditions_pg: true,
                        controlled_disbursement: false,
                        corps: [],
                        crop_certified: 0,
                        crophail: [],
                        crop_inspection: 0,
                        crop_loan: true,
                        crop_year: 2015,
                        decision_date: "08/17/2015",
                        default_due_date: "12/15/2015",
                        dist_approved: 0,
                        disbursement_issue: false,
                        disbursements: [],
                        distributor: {},
                        dist_ucc_received: 0,
                        due_date: "12/15/2015",
                        equipment_collateral: true,
                        exceptions: [],
                        expenses: [],
                        farmer: {},
                        farmexpenses: [],
                        farms: [],
                        farmunits: [],
                        financials: {},
                        fsa_compliant: 0,
                        full_season: "Spring",
                        grade: "-",
                        has_addendum: true,
                        has_attachments: true,
                        has_distributor: true,
                        indyinc: [],
                        inspols: [],
                        is_active: true,
                        is_xcolled: true,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: true,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        limit_warning_message: null,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loanconditions: [],
                        loandistributor: {},
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        location: {},
                        loc_abr: "RAY",
                        joints: [ ],
                        other_collateral: [],
                        partners: [],
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        prior_liens: [],
                        quests: {},
                        references: [],
                        realestate_collateral: true,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 3,
                        region: "West",
                        required_3party: false,
                        season: "S",
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        },
                        transactions: []
                    };
                    break;
                default:
                    return {
                        account_classification: "-",
                        added_land: false,
                        added_land_verified: 0,
                        //agencies: '',
                        //agent: [],
                        analyst: user.name,
                        analyst_can_approve: false,
                        analyst_can_submit: false,
                        analyst_abr: user.nick,
                        analyst_email: user.email,
                        analyst_id: user.id,
                        aoi_received: 0,
                        app_date: moment().format('MM/DD/YYYY'),
                        applicant: {},
                        applicant_id: null,
                        arm_approved: 0,
                        arm_ucc_received: 0,
                        attachments: [],
                        bankruptcy_history: false,
                        bankruptcy_order_received: 0,
                        ccc_received: 0,
                        controlled_disbursement: false,
                        crop_certified: 0,
                        crop_inspection: 0,
                        crop_loan: true, //1,2,3
                        crop_year: globals.globvars[0].crop_year,
                        decision_date: null,
                        default_due_date: "12/15/" + globals.globvars[0].crop_year,
                        dist_approved: 0,
                        disbursement_issue: false,
                        dist_ucc_received: 0,
                        due_date: "12/15/" + globals.globvars[0].crop_year,
                        equipment_collateral: false,
                        farmer: {},
                        farmer_id: null,
                        fsa_compliant: 0,
                        full_season: (globals.globvars[0].season == 'S' ? 'Sping' : 'Fall'),
                        grade: "-",
                        has_addendum: false,
                        has_attachments: false,
                        has_distributor: true,
                        is_active: true,
                        is_xcolled: false,
                        is_fast_tracked: false,
                        is_stale: false,
                        is_watched: false,
                        its_list: 0,
                        leases_valid: 0,
                        lien_letter_received: 0,
                        limit_warning: 0,
                        loan_closed: 0,
                        loan_closed_date: "",
                        loan_type: "Ag-Input",
                        loan_type_id: 2,
                        loantype_abr: "AGI",
                        loc_abr: user.loc_abr,
                        location_id: user.location.location_id,
                        past_due: 0,
                        permission_to_insure_verified: 0,
                        prev_lien_verified: 0,
                        realestate_collateral: false,
                        rebate_assignment: 0,
                        received_3party: 0,
                        recommended: 0,
                        reconciliation: 0,
                        region_id: user.location.region_id,
                        required_3party: false,
                        season: globals.globvars[0].season,
                        status: {
                            id: 1,
                            status: "In-Progress",
                            iconClass: "glyphicon-wrench",
                            iconColor: "#000099"
                        }
                    };
                    break;
            }
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
    } // end factory

})();