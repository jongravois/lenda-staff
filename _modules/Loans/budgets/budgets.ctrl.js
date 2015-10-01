(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('BudgetsController', BudgetsController);

        BudgetsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function BudgetsController($rootScope, $scope, $state, AppFactory){
            $scope.tabs = [
                {text: 'Full Farm', state: 'arm.edit.budget.farm'},
                {text: 'Corn', state: 'arm.edit.budget.corn'},
                {text: 'Soybeans', state: 'arm.edit.budget.soybeans'},
                {text: 'Sorghum', state: 'arm.edit.budget.sorghum'},
                {text: 'Wheat', state: 'arm.edit.budget.wheat'},
                {text: 'Cotton', state: 'arm.edit.budget.cotton'},
                {text: 'Rice', state: 'arm.edit.budget.rice'},
                {text: 'Peanuts', state: 'arm.edit.budget.peanuts'},
                {text: 'Sugar Cane', state: 'arm.edit.budget.sugarcane'},
                {text: 'Sunflowers', state: 'arm.edit.budget.sunflowers'},
            ];

            activate();
            //////////
            function activate() {
                _.each($scope.tabs, function(tab){
                    tab.active = ($state.current.name === tab.state);
                });
            }
        } // end controller
})();