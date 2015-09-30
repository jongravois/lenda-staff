(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('BudgetsController', BudgetsController);

        BudgetsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function BudgetsController($rootScope, $scope, $state, AppFactory){
            $scope.tabs = [
                {text: 'Full Farm', state: 'budget.farm'},
                {text: 'Corn', state: 'budget.corn'},
                {text: 'Soybeans', state: 'budget.soybeans'},
                {text: 'Sorghum', state: 'budget.sorghum'},
                {text: 'Wheat', state: 'budget.wheat'},
                {text: 'Cotton', state: 'budget.cotton'},
                {text: 'Rice', state: 'budget.rice'},
                {text: 'Peanuts', state: 'budget.peanuts'},
                {text: 'Sugar Cane', state: 'budget.sugarcane'},
                {text: 'Sunflowers', state: 'budget.sunflowers'},
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