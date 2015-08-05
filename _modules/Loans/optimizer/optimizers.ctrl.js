(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizersController', OptimizersController);

    OptimizersController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'OptimizerFactory'];

    function OptimizersController($rootScope, $scope, $state, $stateParams, AppFactory, OptimizerFactory) {
        $scope.AppFactory = AppFactory;
        //$scope.OptimizerFactory = OptimizerFactory;

        $scope.alpine = false;
        $scope.farms = OptimizerFactory.processFarms($scope.loan.farms);
        $scope.numberUnits = 5;
        $scope.loan.optimized = OptimizerFactory.parseUnits($scope.loan);

        $scope.tggl = {
            showRentRows: false,
            showOverRentRows: false,
            showInsuranceRows: false,
            showCashFlowRows: false,
            showRiskMarginRows: false,
            tcropCorn: (AppFactory.calcAcresCrop('1', $scope.loan) > 0 ? true : false),
            tcropSoybeans: (AppFactory.calcAcresCrop('2', $scope.loan) > 0 ? true : false),
            tcropBeansFAC: (AppFactory.calcAcresCrop('3', $scope.loan) > 0 ? true : false),
            tcropSorghum: (AppFactory.calcAcresCrop('4', $scope.loan) > 0 ? true : false),
            tcropWheat: (AppFactory.calcAcresCrop('5', $scope.loan) > 0 ? true : false),
            tcropCotton: (AppFactory.calcAcresCrop('6', $scope.loan) > 0 ? true : false),
            tcropRice: (AppFactory.calcAcresCrop('7', $scope.loan) > 0 ? true : false),
            tcropPeanuts: (AppFactory.calcAcresCrop('8', $scope.loan) > 0 ? true : false),
            tcropSugarcane: (AppFactory.calcAcresCrop('9', $scope.loan) > 0 ? true : false),
            tcropOther: (AppFactory.calcAcresCrop('10', $scope.loan) > 0 ? true : false)
        };

        //console.log($scope.mock);
        console.log($scope.loan);

        ///////////
        $scope.toggleAlpine = function() {
            return $scope.alpine = !$scope.alpine;
        };

    } // end function
})();
