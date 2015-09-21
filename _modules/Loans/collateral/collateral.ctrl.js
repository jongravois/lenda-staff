(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CollateralsController', CollateralsController);

        CollateralsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'LoansFactory'];

        function CollateralsController($rootScope, $scope, $state, AppFactory, LoansFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;

            $scope.showConditions = false;
            $scope.showCropCollateral = false;
            $scope.showEquipmentCollateral = false;
            $scope.showRealEstateCollateral = false;
            $scope.showFSACollateral = false;
            $scope.showOtherCollateral = false;
            $scope.showCrossCollateral = false;

            //temp
            $scope.loan.fsa_col = true;

            if(!$scope.loans) {
                if($rootScope.loans) {
                    $scope.loans = $rootScope.loans;
                    console.log('XCOL', $scope.loan.xcols, $scope.loans);
                } else {
                    LoansFactory.getLoans()
                        .then(function (rsp) {
                            $scope.loans = rsp;
                            console.log('XCOL Reload', $scope.loan.xcols, $scope.loans);
                        });
                }
            }

            $scope.togShowConditions = function() {
                $scope.showConditions = !$scope.showConditions;
            };
            $scope.togShowCropCollateral = function() {
                $scope.showCropCollateral = !$scope.showCropCollateral;
            };
            $scope.togShowEquipmentCollateral = function() {
                $scope.showEquipmentCollateral = !$scope.showEquipmentCollateral;
            };
            $scope.togShowRealEstateCollateral = function() {
                $scope.showRealEstateCollateral = !$scope.showRealEstateCollateral;
            };
            $scope.togShowFSACollateral = function() {
                $scope.showFSACollateral = !$scope.showFSACollateral;
            };
            $scope.togShowOtherCollateral = function() {
                $scope.showOtherCollateral = !$scope.showOtherCollateral;
            };
            $scope.togShowCrossCollateral = function() {
                $scope.showCrossCollateral = !$scope.showCrossCollateral;
            };

            $scope.calcCollateralAmount = function(obj) {
                var val = Number(obj.mkt_value) * ((100 - Number(obj.discount))/100) - Number(obj.prior_lien);
                if(val < 0) {
                    return 0;
                } else {
                    return val;
                }
            }
            $scope.saveOtherCollateral = function(type) {
                alert('working');
            };
            $scope.deleteOtherCollateral = function(index, id) {
                alert('working');
            };
            $scope.createOtherCollateral = function(type) {
                alert('working');
            };

            $scope.calcPriorLienTotal = function() {
                var liens = $scope.loan.prior_liens;
                return _.sumCollection(liens, 'lien_amount');
            }

        } // end controller
})();