(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('InsuranceController', InsuranceController);

        InsuranceController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function InsuranceController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;

            $scope.toggleStax = function(id) {
                var rowid = Number(id) - 1;

                $scope.loan.insurance.policies[rowid].showStax = !$scope.loan.insurance.policies[rowid].showStax;
                return true;
            }

            $scope.createNewAgent = function() {
                alert('Create new agent')
            };

            //console.log('pols',$scope.loan.inspols, 'loan', $scope.loan);
        } // end controller
})();