(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CropsController', CropsController);

        CropsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function CropsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;

            if(!$rootScope.feeder || !$rootScope.feeder.units) {
                AppFactory.getAll('measures').then(function(rsp){
                    $scope.units = rsp.data.data;
                });
            }
            $scope.crops = $scope.loan.loancrops;
            $scope.showCrops = false;
            $scope.showYields = false;
            $scope.showIndirect = false;
            console.log('loancrops', $scope.loan.loancrops);

            $scope.togShowCrops = function() {
                $scope.showCrops = !$scope.showCrops;
            };
            $scope.togShowYields = function() {
                $scope.showYields = !$scope.showYields;
            };
            $scope.togShowIndirect = function() {
                $scope.showIndirect = !$scope.showIndirect;
            };
            $scope.createCrop = function() {
                alert('working');
            }
            $scope.saveCrop = function(data, id) {
                alert('working');
            }
            $scope.deleteCrop = function(index, id) {
                alert('working');
            }
            $scope.updateCrops = function() {
                alert('working');
            }
        } // end controller
})();