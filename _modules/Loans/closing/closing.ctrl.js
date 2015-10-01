(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ClosingsController', ClosingsController);

        ClosingsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'LoansFactory'];

        function ClosingsController($rootScope, $scope, $state, $stateParams, AppFactory, LoansFactory){
            $scope.newapplications = $state.current.data.newapplications;

            /*if($scope.missingConditions.length === 0 && $scope.missingDocs.length === 0) {
                $scope.canClose = true;
            } else {
                $scope.canClose = false;
            }*/
            $scope.canClose = false;

            $scope.viewDocument = function(id) {
                alert('View Document');
            }
            $scope.uploadDocument = function(id) {
                alert('Upload Document');
            }

        } // end controller
})();