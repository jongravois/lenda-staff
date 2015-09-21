(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FsaController', FsaController);

        FsaController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FsaController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            console.log($scope.loan.fsa_payments);

            $scope.pgms = [
                {abr: 'N/A', pgm: 'N/A'},
                {abr: 'ARCc', pgm: 'ARCc'},
                {abr: 'ARCf', pgm: 'ARCf'},
                {abr: 'PLC', pgm: 'PLC'}
            ];

            $scope.addNewFSA = function() {
                alert('working');
            }
            $scope.saveFSA = function(data, id) {
                alert('working');
            }
            $scope.deleteFSA = function(index, id) {
                alert('working');
            }
            $scope.updateFSA = function() {
                alert('working');
            }
        } // end controller
})();