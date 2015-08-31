(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('BudgetsController', BudgetsController);

        BudgetsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function BudgetsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;
            //console.log('XPS', $scope.loan.expenses);
        } // end controller
})();