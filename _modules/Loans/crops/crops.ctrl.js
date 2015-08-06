(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CropsController', CropsController);

        CropsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function CropsController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            $scope.crops = $scope.loan.loancrops;
            //console.log('Loan', $scope.loan, 'Crops', $scope.crops);

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