(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReferencesController', ReferencesController);

        ReferencesController.$inject = ['$rootScope', '$scope'];

        function ReferencesController($rootScope, $scope){
            //TODO: Extract editable functions to AppFactory
            //console.log('D', $scope.loan.distributor, 'R', $scope.loan.references);
            
            $scope.updateDistributor = function() {
                alert('working');
            }
            $scope.createNewReference = function() {
                alert('working');
            }
        } // end controller
})();