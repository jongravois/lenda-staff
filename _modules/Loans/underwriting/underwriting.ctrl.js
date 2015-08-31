(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('UnderwritingController', UnderwritingController);

        UnderwritingController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function UnderwritingController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            console.log('Loan', $scope.loan);
            console.log('LoanCrops', $scope.loan.loancrops);
            console.log('InsPols', $scope.loan.inspols);

        } // end controller
})();