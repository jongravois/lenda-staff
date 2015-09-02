(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FinancialsController', FinancialsController);

        FinancialsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'DefaultsFactory'];

        function FinancialsController($rootScope, $scope, $state, AppFactory, DefaultsFactory){
            $scope.AppFactory = AppFactory;
            if(!$rootScope.defaults) {
                DefaultsFactory.init();
                var globs =  DefaultsFactory.getObject();
                //console.log('Globs', globs, 'Graders', globs.admingraders);
                $scope.grads = globs.admingraders;
            } else {
                $scope.grads = $rootScope.defaults.admingraders;
            }
            $scope.afins = $scope.loan.applicant.fins;
            //console.log('Loan', $scope.loan, 'Financials', $scope.afins, 'Globs', $scope.grads);
            
            $scope.updateFinancials = function() {
                alert('working');
            }
        } // end controller
})();