(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('BudgetsController', BudgetsController);

        BudgetsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function BudgetsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;

            $scope.tabs = [
                {text: 'Full Farm', state: 'arm.edit.budget.farm'},
            ];

            if(Number($scope.loan.fins.crop_acres[0].acres) > 0) {
                $scope.tabs.push({text: 'Corn', state: 'arm.edit.budget.corn'});
            }
            if(Number($scope.loan.fins.crop_acres[1].acres) > 0) {
                $scope.tabs.push({text: 'Soybeans', state: 'arm.edit.budget.soybeans'});
            }
            if(Number($scope.loan.fins.crop_acres[2].acres) > 0) {
                $scope.tabs.push({text: 'Soybeans FAC', state: 'arm.edit.budget.beansFAC'});
            }
            if(Number($scope.loan.fins.crop_acres[3].acres) > 0) {
                $scope.tabs.push({text: 'Sorghum', state: 'arm.edit.budget.sorghum'});
            }
            if(Number($scope.loan.fins.crop_acres[4].acres) > 0) {
                $scope.tabs.push({text: 'Wheat', state: 'arm.edit.budget.wheat'});
            }
            if(Number($scope.loan.fins.crop_acres[5].acres) > 0) {
                $scope.tabs.push({text: 'Cotton', state: 'arm.edit.budget.cotton'});
            }
            if(Number($scope.loan.fins.crop_acres[6].acres) > 0) {
                $scope.tabs.push({crop: 'Rice', acres: $scope.loan.fins.crop_acres[6].acres});
            }
            if(Number($scope.loan.fins.crop_acres[7].acres) > 0) {
                $scope.tabs.push({text: 'Peanuts', state: 'arm.edit.budget.peanuts'});
            }
            if(Number($scope.loan.fins.crop_acres[8].acres) > 0) {
                $scope.tabs.push({text: 'Sugar Cane', state: 'arm.edit.budget.sugarcane'});
            }
            if(Number($scope.loan.fins.crop_acres[8].acres) > 0) {
                $scope.tabs.push({text: 'Sunflowers', state: 'arm.edit.budget.sunflowers'});
            }

            activate();
            //////////
            function activate() {
                _.each($scope.tabs, function(tab){
                    tab.active = ($state.current.name === tab.state);
                });
            }
        } // end controller
})();