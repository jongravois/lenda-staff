(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('InsuranceController', InsuranceController);

        InsuranceController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function InsuranceController($rootScope, $scope, AppFactory){
            if($scope.loan.insurance.agencies.length !== 0){
                $scope.loan.insurance.agencies[0].is_open = true;
            }

            $scope.toggleStax = function(id) {
                var rowid = Number(id) - 1;

                $scope.loan.insurance.policies[rowid].showStax = !$scope.loan.insurance.policies[rowid].showStax;
                return true;
            }

            //console.log('pols',$scope.loan.inspols, 'ins', $scope.loan.insurance);
        } // end controller
})();