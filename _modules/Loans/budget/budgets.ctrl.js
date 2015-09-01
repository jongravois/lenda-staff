(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('BudgetsController', BudgetsController);

        BudgetsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function BudgetsController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            console.log('XPS', $scope.loan.expenses);
        } // end controller
})();