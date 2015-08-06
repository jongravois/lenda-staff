(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizersController', OptimizersController);

    OptimizersController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'FeederFactory', 'ModalService', 'OptimizerFactory'];

    function OptimizersController($rootScope, $scope, $state, $stateParams, AppFactory, FeederFactory, ModalService, OptimizerFactory) {
        $scope.AppFactory = AppFactory;
        $scope.OptimizerFactory = OptimizerFactory;

        $scope.alpine = false;
        OptimizerFactory.getMock()
            .then(function(rsp){
                $scope.loan.optimized = rsp.data;
            });

        /*$scope.optimized = OptimizerFactory.parseUnits($scope.loan);
        $scope.loan.optimized = $scope.optimized;
        $scope.unitcrops = OptimizerFactory.processCrops($scope.loan);*/

        $scope.tggl = {
            showRentRows: false,
            showOverRentRows: false,
            showInsuranceRows: false,
            showCashFlowRows: false,
            showRiskMarginRows: false,
            tcropCorn: ($scope.loan.fins.crop_acres.corn > 0 ? true : false),
            tcropSoybeans: ($scope.loan.fins.crop_acres.soybeans > 0 ? true : false),
            tcropBeansFAC: ($scope.loan.fins.crop_acres.beansFAC > 0 ? true : false),
            tcropSorghum: ($scope.loan.fins.crop_acres.sorghum > 0 ? true : false),
            tcropWheat: ($scope.loan.fins.crop_acres.wheat > 0 ? true : false),
            tcropCotton: ($scope.loan.fins.crop_acres.cotton > 0 ? true : false),
            tcropRice: ($scope.loan.fins.crop_acres.rice > 0 ? true : false),
            tcropPeanuts: ($scope.loan.fins.crop_acres.peanuts > 0 ? true : false),
            tcropSugarcane: ($scope.loan.fins.crop_acres.sugarcane > 0 ? true : false),
            tcropSunflowers: ($scope.loan.fins.crop_acres.sunflowers > 0 ? true : false)
        };

        ///////////
        $scope.showCrop = function() {
            alert('working');
        }
        $scope.addUnit = function() {
            alert('working');
        }
        $scope.calcScoMax = function(crop) {
            //console.log('crop', crop);
            if(crop.c_acres === 0) {return 0;}
            var supplements = crop.insurance[0].suppins;
            //console.log('SCOMAX CROP', crop);
            //console.log('SCOMAX SUP', supplements);
            if(supplements.length === 0) {
                return 0;
            } else {
                var supplemental = [];
                _.each(supplements, function(i){
                    var harvestPriceRecalc = 0;
                    var adjustedClaim = 0;
                    var coverageRange = 0;
                    /* listed as second Harvest Price Recalculated */
                    var expCountyRevenueAdj = 0;
                    /* listed as second Harvest Price Recalculated */

                    var HPEO = (i.harvest_price_exclusion === '1' ? true : false);
                    var aph = Number(crop.c_aph);
                    var coverageLevel = Number(crop.c_ins_level);
                    var basePrice = Number(crop.c_ins_price);
                    var harvestPrice = Number(crop.c_ins_price) + Number(crop.c_var_harv);
                    var revenueCoverage = aph * (coverageLevel/100) * basePrice;
                    if(HPEO) {
                        harvestPriceRecalc = aph * (coverageLevel/100) * basePrice;
                    } else {
                        if(basePrice > harvestPrice) {
                            harvestPriceRecalc = aph * (coverageLevel/100) * basePrice;
                        } else {
                            harvestPriceRecalc = aph * (coverageLevel/100) * harvestPrice;
                        }
                    }
                    var harvestYield = Number(crop.c_prod_yield);
                    var calcRevenue = harvestYield * harvestPrice;
                    if((revenueCoverage + (calcRevenue * -1)) < 0 ) {
                        adjustedClaim = 0;
                    } else {
                        adjustedClaim = (revenueCoverage + (calcRevenue * -1));
                    }

                    var supplement = i.supplement;
                    var lossTrigger = Number(i.loss_trigger);
                    var desiredRange =  Number(i.range);

                    if(desiredRange < (lossTrigger - coverageLevel)) {
                        coverageRange = desiredRange;
                    } else {
                        coverageRange = (lossTrigger - coverageLevel);
                    }

                    var protectionFactor = Number(i.protection_factor);
                    var expCountyYield = Number(i.expected_yield);
                    var expCountyRevenue = expCountyYield * basePrice;

                    if(HPEO) {
                        expCountyRevenueAdj = expCountyYield * basePrice;
                    } else {
                        if( basePrice > harvestPrice) {
                            expCountyRevenueAdj = expCountyYield * basePrice;
                        } else {
                            expCountyRevenueAdj = expCountyYield * harvestPrice;
                        }
                    }

                    var finalCountyYield = Number(i.final_county_yield);
                    var finalCountyRevenue = harvestPrice * finalCountyYield;
                    var maxIndemnity = (coverageRange/100) * expCountyRevenueAdj * (protectionFactor/100);

                    supplemental.push({'maxIdemnity': maxIndemnity});
                });
                return _.average(supplemental, 'maxIdemnity');
            }
        };
        $scope.calcProdRevenue = function(crop) {
            //console.log('ProdRev Crop', crop);
            return Number(crop.c_prod_yield) * Number(crop.c_prod_price) * (Number(crop.c_prod_share)/100);
        };
        $scope.calcProdRevenueAdj = function(crop) {
            //console.log('ProdRev Crop', crop);
            var yld, pshare, vhar, reba;
            if(Number(crop.c_prod_yield) === 0) {
                return 0;
            } else {
                yld = Number(crop.c_prod_yield);
            }
            if(Number(crop.c_prod_share) === 0) {
                return 0;
            } else {
                pshare = Number(crop.c_prod_share);
            }
            if(Number(crop.c_var_harv) === 0) {
                vhar = 1;
            } else {
                vhar = Number(crop.c_var_harv);
            }
            if(Number(crop.c_rebate) === 0) {
                reba = 1;
            } else {
                reba = Number(crop.c_rebate);
            }

            if( vhar + reba === 0) {
                vhar = 1;
            }

            return yld * (pshare/100) * (vhar + reba);
        };
        $scope.calcFee = function(crop) {
            var fee = ((Number(crop.expenses.arm) + Number(crop.expenses.dist)) * (1/100)) + ((Number(crop.expenses.arm) + Number(crop.expenses.dist)) * (1.5/100));
            return fee;
        };
        $scope.calcArmCommit = function(crop) {
            return crop.expenses.arm + $scope.calcFee(crop);
        };
        $scope.calcInterestARM = function(crop) {
            return (Number($scope.loan.fins.int_percent_arm)/100) * 0.375 * $scope.calcArmCommit(crop);
        };
        $scope.calcInterestDist = function(crop) {
            return (Number($scope.loan.fins.int_percent_dist)/100) * 0.375 * crop.expenses.dist;
        };
        $scope.calcDiscCrop = function(crop) {
            return Number($scope.calcProdRevenue(crop)) * (1 - (Number(crop.c_crop_disc)/100));
        };
        $scope.calcDiscFSA = function(crop, acreFSA) {
            return Number(acreFSA) * (1 - (Number(crop.c_fsa_disc)/100));
        };
        $scope.calcDiscInsOverCrop = function(crop) {
            var insval = Number(OptimizerFactory.calcInsValue(crop));
            var disccrop = Number($scope.calcDiscCrop(crop));
            var iocd = insval - disccrop;
            if(iocd < 0) {
                return 0;
            } else {
                return iocd;
            }
        };
        $scope.calcDiscIns = function(crop) {
            if(crop.c_ins_type === 'RP') {
                return Number($scope.calcDiscInsOverCrop(crop)) * (1 - (Number(crop.c_cropins_disc)/100));
            } else {
                return Number($scope.calcDiscInsOverCrop(crop)) * (1 - ((Number(crop.c_cropins_disc)/100)) + (Number(crop.c_nonrp_disc)/100));
            }
        };
        $scope.calcDiscSCO = function(crop) {
            return Number($scope.calcScoMax(crop)) * (1 - (Number(crop.c_sco_disc)/100));
        };
        $scope.calcDiscCollateral = function(crop, acre_fsa) {
            return Number($scope.calcDiscCrop(crop)) + Number($scope.calcDiscFSA(crop, acre_fsa)) + Number($scope.calcDiscInsOverCrop(crop)) + Number($scope.calcDiscIns(crop)) + Number($scope.calcDiscSCO(crop));
        };
        $scope.calcRelativeCF = function(crop, acre_fsa) {
            var revenue = Number($scope.calcProdRevenue(crop)) + Number($scope.calcProdRevenueAdj(crop)) + acre_fsa;
            var expenses = Number($scope.calcArmCommit(crop)) + Number(crop.expenses.dist) + Number(crop.expenses.other) + Number($scope.calcInterestARM(crop)) + Number($scope.calcInterestDist(crop));

            return Number(revenue) - Number(expenses);
        };
        $scope.calcRelativeRM = function(crop, acre_fsa) {
            var discountedCollateral = Number($scope.calcDiscCollateral(crop, acre_fsa));
            var fullCommittment = Number($scope.calcArmCommit(crop)) + Number(crop.expenses.dist) + Number($scope.calcInterestARM(crop)) + Number($scope.calcInterestDist(crop));
            return discountedCollateral - fullCommittment;
        };
        $scope.getCropsAcres = function(cropID) {
            switch(cropID) {
                case '0':
                    return 1000;
                    break;
                case '1':
                    return 1000;
                    break;
                case '6':
                    return 2000;
                    break;
                default:
                    return 0;
                    break;
            }
        };
        $scope.toggleAlpine = function() {
            $scope.alpine = !$scope.alpine;
            var data = {
                title: 'Alpine Optimizer',
                message: 'This is an expermental design that will allow ARM analysts easy access to loan variables to adjust and optimize loans and provide better customer service.',
                buttons: ['ok', 'cancel']
            };
            ModalService.confirm(data)
                .then(function() {
                    // OK Button Clicked
                }, function() {
                    // Cancel Button Clicked
                });
        };
        /*$scope.toggleAlpine = function() {
            return $scope.alpine = !$scope.alpine;
        };*/

    } // end function
})();
