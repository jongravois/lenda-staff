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
                showExposure: false,
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
            };
            $scope.getTotalCropValue = function(crop) {
                var curr = $scope.crops[crop];
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.crop_values[crop]);
                });
                return curr+xco;
            };
            $scope.getGrandTotalCropValue = function() {
                return Number($scope.getTotalCropValue('corn')) + Number($scope.getTotalCropValue('soybeans')) + Number($scope.getTotalCropValue('sorghum')) + Number($scope.getTotalCropValue('wheat')) + Number($scope.getTotalCropValue('cotton')) + Number($scope.getTotalCropValue('rice')) + Number($scope.getTotalCropValue('peanuts')) + Number($scope.getTotalCropValue('sugarcane')) + Number($scope.getTotalCropValue('sunflowers'));
            };
            $scope.getXTotalCashFlow = function() {
                var curr = $scope.loan.fins.cash_flow;
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.cash_flow);
                });
                return curr+xco;
            };
            $scope.getXInsTotalValue = function(xcols) {
                return Number(xcols.ins_value.corn) + Number(xcols.ins_value.soybeans) + Number(xcols.ins_value.sorghum) + Number(xcols.ins_value.wheat) + Number(xcols.ins_value.cotton) + Number(xcols.ins_value.rice) + Number(xcols.ins_value.peanuts) + Number(xcols.ins_value.sugarcane) + Number(xcols.ins_value.sunflowers);
            };
            $scope.getTotalInsValue = function(crop) {
                var curr = $scope.ins[crop];
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.ins_value[crop]);
                });
                return curr+xco;
            };
            $scope.getGrandTotalInsValue = function() {
                return Number($scope.getTotalInsValue('corn')) + Number($scope.getTotalInsValue('soybeans')) + Number($scope.getTotalInsValue('sorghum')) + Number($scope.getTotalInsValue('wheat')) + Number($scope.getTotalInsValue('cotton')) + Number($scope.getTotalInsValue('rice')) + Number($scope.getTotalInsValue('peanuts')) + Number($scope.getTotalInsValue('sugarcane')) + Number($scope.getTotalInsValue('sunflowers'));
            };
            $scope.getArmAndDistTotal = function() {
                return Number($scope.loan.fins.commit_arm) + Number($scope.loan.fins.commit_dist);
            };
            $scope.getXArmAndDistTotal = function(xcol) {
                return Number(xcol.commit_arm) + Number(xcol.commit_dist);
            };
            $scope.getArmAndDistGrandTotal = function() {
                var curr = $scope.getArmAndDistTotal();
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number($scope.getXArmAndDistTotal(x));
                });
                return curr+xco;
            };
            $scope.getNetCropInsCov = function() {
                return AppFactory.calcCropTotsInsVal($scope.loan);
            };
            $scope.getXNetCropInsCov = function() {
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += $scope.getXInsTotalValue(x);
                });

                return xco;
            };
            $scope.getNetCropInsCovTotal = function() {
                var curr = Number($scope.getNetCropInsCov());
                var xco = Number($scope.getXNetCropInsCov());
                return curr+xco;
            };
            $scope.getInsTotalDiff = function() {
                return Number($scope.getArmAndDistTotal()) - Number($scope.getNetCropInsCov());
            };
            $scope.getXInsTotalDiff = function(xcol) {
                return Number($scope.getXArmAndDistTotal(xcol)) - Number($scope.getXNetCropInsCov(xcol));
            };
            $scope.getInsGrandTotalDiff = function() {
                var curr = Number($scope.getArmAndDistTotal());
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number($scope.getXInsTotalDiff(x));
                });
                return curr + xco;
            };
            $scope.getTotalCommitArm = function() {
                var curr = Number($scope.loan.fins.commit_arm);
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.commit_arm);
                });
                return curr + xco;
            };
            $scope.getTotalCommitDist = function() {
                var curr = Number($scope.loan.fins.commit_dist);
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.commit_dist);
                });
                return curr + xco;
            };
            $scope.getGrandTotalCommitArm = function() {
                var curr = Number($scope.getArmAndDistTotal());
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number($scope.getXArmAndDistTotal(x));
                });
                return curr + xco;
            };
            $scope.getGrandTotalCommitDist = function() {
                var curr = Number($scope.getArmAndDistTotal());
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number($scope.getXArmAndDistTotal(x));
                });
                return curr + xco;
            };
            $scope.getTotalInsValue = function() {
                return Number(AppFactory.calcCropTotsMPCIBySummary($scope.loan)) + Number(AppFactory.calcCropTotsSco($scope.loan));
            };
            $scope.getTotalMPCI = function() {
                var curr = Number(AppFactory.calcCropTotsMPCIBySummary($scope.loan));
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.mpci_value);
                });
                return curr + xco;
            };
            $scope.getTotalStaxSco = function() {
                var curr = Number(AppFactory.calcCropTotsSco($scope.loan));
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.stax_sco_value);
                });
                return curr + xco;
            };
            $scope.getTotalInsSummary = function() {
                var mp = Number(AppFactory.calcCropTotsMPCIBySummary($scope.loan));
                var sc = Number(AppFactory.calcCropTotsSco($scope.loan));
                return mp+sc;
            };
            $scope.getGrandTotalInsSummary = function() {
                var curr = $scope.getTotalInsSummary();
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.mpci_value) + Number(x.stax_sco_value);
                });
                return curr+xco;
            };
            $scope.getCollateralCropValue = function() {
                var curr = Number(AppFactory.calcPlannedCropValue($scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_crops');
                return curr+xco;
            }
            $scope.getCollateralFSA = function() {
                var curr = Number(AppFactory.calcOCDTByType('fsa', $scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_fsa');
                return curr+xco;
            };
            $scope.getCollateralMPCI = function() {
                var curr = Number(AppFactory.calcTotalDiscMPCI($scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_mpci');
                return curr+xco;
            };
            $scope.getCollateralStaxSco = function() {
                var curr = Number(AppFactory.calcTotalDiscSuppCoverage($scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_stax_sco');
                return curr+xco;
            };
            $scope.getCollateralEquipment = function() {
                var curr = Number(AppFactory.calcOCDTByType('equipment', $scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_equipment');
                return curr+xco;
            };
            $scope.getCollateralRealestate = function() {
                var curr = Number(AppFactory.calcOCDTByType('realestate', $scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_realestate');
                return curr+xco;
            };
            $scope.getCollateralOther = function() {
                var curr = Number(AppFactory.calcOCDTByType('other', $scope.loan));
                var xco = _.sumCollection($scope.xcols, 'collateral_other');
                return curr+xco;
            };
            $scope.getCurrentCollateral = function() {
                return Number(AppFactory.calcPlannedCropValue($scope.loan)) + Number(AppFactory.calcOCDTByType('fsa', $scope.loan)) + Number(AppFactory.calcTotalDiscMPCI($scope.loan)) + Number(AppFactory.calcTotalDiscSuppCoverage($scope.loan)) + Number(AppFactory.calcOCDTByType('equipment', $scope.loan)) + Number(AppFactory.calcOCDTByType('realestate', $scope.loan)) + Number(AppFactory.calcOCDTByType('other', $scope.loan));
            };
            $scope.getXCollateral = function() {
                var coll = $scope.xcols;
                var xco =  Number(_.sumCollection(coll, 'collateral_crops')) + Number(_.sumCollection(coll, 'collateral_fsa')) + Number(_.sumCollection(coll, 'collateral_mpci')) + Number(_.sumCollection(coll, 'collateral_stax_sco')) + Number(_.sumCollection(coll, 'collateral_equipment')) + Number(_.sumCollection(coll, 'collateral_realestate')) + Number(_.sumCollection(coll, 'collateral_other'));
                return xco;
            };
            $scope.getTotalCollateral = function() {
                return Number($scope.getCurrentCollateral) + Number($scope.getXCollateral);
            };
            $scope.getTotalExposure = function() {
                var curr = Number($scope.loan.fins.exposure);
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.exposure);
                });
                return curr + xco;
            }
            $scope.getTotalXOriginationFee = function() {
                var curr = Number(AppFactory.calcArmDistProcFee($scope.loan))/100;
                var xco = 0;
                _.each($scope.xcols, function(x){
                    xco += Number(x.origination_fee);
                });
                return curr + xco;
            }
            ////////////
        } // end controller
})();