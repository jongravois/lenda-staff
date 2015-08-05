(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('InsuranceController', InsuranceController);

        InsuranceController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function InsuranceController($rootScope, $scope, AppFactory){
            console.log('loan', $scope.loan, 'pols',$scope.loan.inspols);
        } // end controller
})();