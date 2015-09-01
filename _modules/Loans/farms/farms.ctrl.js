(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FarmsController', FarmsController);

        FarmsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FarmsController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            //console.log($scope.loan.farms);

            $scope.pgms = [
                {abr: 'N/A', pgm: 'N/A'},
                {abr: 'ARCc', pgm: 'ARCc'},
                {abr: 'ARCf', pgm: 'ARCf'},
                {abr: 'PLC', pgm: 'PLC'}
            ];

            $scope.addNewFarm = function() {
                alert('working');
            }
            $scope.saveFarm = function(data, id) {
                alert('working');
            }
            $scope.deleteFarm = function(index, id) {
                alert('working');
            }
            $scope.updateFarms = function() {
                alert('working');
            }
        } // end controller
})();