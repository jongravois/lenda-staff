(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizersController', OptimizersController);

    OptimizersController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'OptimizerFactory'];

    function OptimizersController($rootScope, $scope, $state, $stateParams, AppFactory, OptimizerFactory) {
        $scope.AppFactory = AppFactory;
        $scope.OptimizerFactory = OptimizerFactory;

        $scope.alpine = false;
        $scope.optimized = OptimizerFactory.parseUnits($scope.loan);

        $scope.tggl = {
            showRentRows: false,
            showOverRentRows: false,
            showInsuranceRows: false,
            showCashFlowRows: false,
            showRiskMarginRows: false,
            tcropCorn: ($scope.loan.fins.crop_acres.corn > 0 ? true : false),
            tcropSoybeans: ($scope.loan.fins.crop_acres.soybeans > 0 ? true : false),
            tcropBeansFAC: ($scope.loan.fins.crop_acres.beansFAC > 0 ? true : false),
            tcropSorghum: ($scope.loan.fins.crop_acres.sorghum > 0 ? true : false),
            tcropWheat: ($scope.loan.fins.crop_acres.wheat > 0 ? true : false),
            tcropCotton: ($scope.loan.fins.crop_acres.cotton > 0 ? true : false),
            tcropRice: ($scope.loan.fins.crop_acres.rice > 0 ? true : false),
            tcropPeanuts: ($scope.loan.fins.crop_acres.peanuts > 0 ? true : false),
            tcropSugarcane: ($scope.loan.fins.crop_acres.sugarcane > 0 ? true : false),
            tcropSunflowers: ($scope.loan.fins.crop_acres.sunflowers > 0 ? true : false)
        };

        //console.log($scope.mock);
        console.log($scope.loan);

        ///////////
        $scope.toggleAlpine = function() {
            return $scope.alpine = !$scope.alpine;
        };

    } // end function
})();
