(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('UnderwritingController', UnderwritingController);

        UnderwritingController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function UnderwritingController($rootScope, $scope, AppFactory){
            console.log('Loan', $scope.loan);
            console.log('LoanCrops', $scope.loan.loancrops);
            console.log('InsPols', $scope.loan.inspols);

        } // end controller
})();