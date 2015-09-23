(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('XcollateralsController', XcollateralsController);

        XcollateralsController.$inject = ['$rootScope', '$scope', 'AppFactory', 'LoansFactory'];

        function XcollateralsController($rootScope, $scope, AppFactory, LoansFactory){
            if(!$rootScope.loans){
                LoansFactory.getLoans()
                    .then(function (rsp) {
                        $scope.loans = rsp;
                        $rootScope.loans = rsp;
                        $scope.xcols = AppFactory.processXCols($scope.loan, $scope.loans);
                    });
            } else {
                $scope.xcols = AppFactory.processXCols($scope.loan, $scope.loans);
            }

            $scope.tggl = {
                showCropTotals: false,
                showIncome: false,
                showArmExp: false,
                showDistExp: false,
                showOtherExp: false,
                showInsurance: false,
                showCommitment: false,
                showInsSummary: false,
                showCollateral: false,
                showTerms: true
            };
            $scope.crops = AppFactory.makeXCropvals($scope.loan);
            $scope.ins = AppFactory.makeXInsVals($scope.loan);
            //console.log('INS', $scope.ins);

            $scope.getXColCropAcres = function(cID) {
                var crossed = 0;
                _.each($scope.xcols, function(x){
                    crossed += Number(x.crop_acres[cID].acres);
                });
                var curr = $scope.loan.fins.crop_acres[cID].acres;
                return crossed + Number(curr);
            };
            $scope.getXColAcreTotal = function() {
                var crossed = 0;
                _.each($scope.xcols, function(x){
                    crossed += Number(x.total_acres);
                });
                var loanAcres = AppFactory.calcTotalAcres($scope.loan);
                return crossed + Number(loanAcres);
            };
            $scope.getXArmTotalExpenses = function(xcols) {
                var retro = 0;
                for(var x=0; x<12; x++) {
                    retro += Number(xcols.expenses.totals.byCat[x][0].calc_arm);
                }
                return retro;
            };
            $scope.getXTotalArmExpenses = function(xcols) {
                var current = Number($scope.loan.fins.commit_arm);
                var exed = 0;
                _.each(xcols, function(x){
                    exed += Number($scope.getXArmTotalExpenses(x));
                });
                return current+exed;
            };
            $scope.getXDistTotalExpenses = function(xcols) {
                var retro = 0;
                for(var x=0; x<12; x++) {
                    retro += Number(xcols.expenses.totals.byCat[x][0].calc_dist);
                }
                return retro;
            };
            $scope.getXTotalDistExpenses = function(xcols) {
                var current = Number($scope.loan.fins.commit_dist);
                var exed = 0;
                _.each(xcols, function(x){
                    exed += Number($scope.getXDistTotalExpenses(x));
                });
                return current+exed;
            };
            $scope.getXOtherTotalExpenses = function(xcols) {
                var retro = 0;
                for(var x=0; x<12; x++) {
                    retro += Number(xcols.expenses.totals.byCat[x][0].calc_other);
                }
                return retro;
            };
            $scope.getXTotalOtherExpenses = function(xcols) {
                var current = Number($scope.loan.fins.commit_other);
                var exed = 0;
                _.each(xcols, function(x){
                    exed += Number($scope.getXOtherTotalExpenses(x));
                });
                return current+exed;
            };
            $scope.getXCropTotalValue = function(xcols) {
                return Number(xcols.crop_values.corn) + Number(xcols.crop_values.soybeans) + Number(xcols.crop_values.sorghum) + Number(xcols.crop_values.wheat) + Number(xcols.crop_values.cotton) + Number(xcols.crop_values.rice) + Number(xcols.crop_values.peanuts) + Number(xcols.crop_values.sugarcane) + Number(xcols.crop_values.sunflowers);
            }
            $scope.getTotalCropValue = function(crop) {
                var curr = $scope.crops[crop];
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.crop_values[crop]);
                });
                return curr+xco;
            }
            $scope.getGrandTotalCropValue = function() {
                return Number($scope.getTotalCropValue('corn')) + Number($scope.getTotalCropValue('soybeans')) + Number($scope.getTotalCropValue('sorghum')) + Number($scope.getTotalCropValue('wheat')) + Number($scope.getTotalCropValue('cotton')) + Number($scope.getTotalCropValue('rice')) + Number($scope.getTotalCropValue('peanuts')) + Number($scope.getTotalCropValue('sugarcane')) + Number($scope.getTotalCropValue('sunflowers'));
            }
            $scope.getXTotalCashFlow = function() {
                var curr = $scope.loan.fins.cash_flow;
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.cash_flow);
                });
                return curr+xco;
            }
            $scope.getXInsTotalValue = function(xcols) {
                return Number(xcols.ins_value.corn) + Number(xcols.ins_value.soybeans) + Number(xcols.ins_value.sorghum) + Number(xcols.ins_value.wheat) + Number(xcols.ins_value.cotton) + Number(xcols.ins_value.rice) + Number(xcols.ins_value.peanuts) + Number(xcols.ins_value.sugarcane) + Number(xcols.ins_value.sunflowers);
            }
            $scope.getTotalInsValue = function(crop) {
                var curr = $scope.ins[crop];
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.ins_value[crop]);
                });
                return curr+xco;
            }
            $scope.getGrandTotalInsValue = function() {
                return Number($scope.getTotalInsValue('corn')) + Number($scope.getTotalInsValue('soybeans')) + Number($scope.getTotalInsValue('sorghum')) + Number($scope.getTotalInsValue('wheat')) + Number($scope.getTotalInsValue('cotton')) + Number($scope.getTotalInsValue('rice')) + Number($scope.getTotalInsValue('peanuts')) + Number($scope.getTotalInsValue('sugarcane')) + Number($scope.getTotalInsValue('sunflowers'));
            }
            ////////////
        } // end controller
})();