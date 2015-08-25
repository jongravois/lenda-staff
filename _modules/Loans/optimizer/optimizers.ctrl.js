(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizerController', OptimizerController);

    OptimizerController.$inject = ['$scope', '$state', '$stateParams', 'ModalService', 'AppFactory', 'LoansFactory', 'OptimizerFactory'];

    function OptimizerController($scope, $state, $stateParams, ModalService, AppFactory, LoansFactory, OptimizerFactory) {
        $scope.AppFactory = AppFactory;
        $scope.OptimizerFactory = OptimizerFactory;
        //console.log('units', $scope.loan.farmunits);

        //////////////////////////

        $scope.loan.crop_totals = [
            {crop: 'Corn', acres: AppFactory.calcAcresByCrop('corn', $scope.loan)},
            {crop: 'Soybeans', acres: AppFactory.calcAcresByCrop('soybeans', $scope.loan)},
            {crop: 'Soybeans FAC', acres: AppFactory.calcAcresByCrop('beansFAC', $scope.loan)},
            {crop: 'Sorghum', acres: AppFactory.calcAcresByCrop('sorghum', $scope.loan)},
            {crop: 'Wheat', acres: AppFactory.calcAcresByCrop('wheat', $scope.loan)},
            {crop: 'Cotton', acres: AppFactory.calcAcresByCrop('cotton', $scope.loan)},
            {crop: 'Rice', acres: AppFactory.calcAcresByCrop('rice', $scope.loan)},
            {crop: 'Peanuts', acres: AppFactory.calcAcresByCrop('peanuts', $scope.loan)},
            {crop: 'Sugar Cane', acres: AppFactory.calcAcresByCrop('sugarcane', $scope.loan)},
            {crop: 'Sunflowers', acres: AppFactory.calcAcresByCrop('sunflowers', $scope.loan)},
        ];

        $scope.tggl = {
            showRentRows: true, //false,
            showOverRentRows: true, //false,
            showInsRows: true, //false,
            showCFRows: true, //false,
            showEXRows: true, //false,
            showCorn: true, //false,
            showBeans: true, //false,
            showFAC: true, //false,
            showSorghum: true, //false,
            showWheat: true, //false,
            showCotton: true, //false,
            showRice: true, //false,
            showPeanuts: true, //false,
            showCane: true, //false,
            showSunflowers: true, //false,
            tcropCorn: (AppFactory.calcAcresByCrop('corn', $scope.loan) > 0 ? true : false),
            tcropSoybeans: (AppFactory.calcAcresByCrop('soybeans', $scope.loan) > 0 ? true : false),
            tcropBeansFAC: (AppFactory.calcAcresByCrop('beansFAC', $scope.loan) > 0 ? true : false),
            tcropSorghum: (AppFactory.calcAcresByCrop('sorghum', $scope.loan) > 0 ? true : false),
            tcropWheat: (AppFactory.calcAcresByCrop('wheat', $scope.loan) > 0 ? true : false),
            tcropCotton: (AppFactory.calcAcresByCrop('cotton', $scope.loan) > 0 ? true : false),
            tcropRice: (AppFactory.calcAcresByCrop('rice', $scope.loan) > 0 ? true : false),
            tcropPeanuts: (AppFactory.calcAcresByCrop('peanuts', $scope.loan) > 0 ? true : false),
            tcropSugarcane: (AppFactory.calcAcresByCrop('sugarcane', $scope.loan) > 0 ? true : false),
            tcropOther: (AppFactory.calcAcresByCrop('sunflowers', $scope.loan) > 0 ? true : false)
        };

        $scope.toggleAlpine = function() {
            $scope.alpine = !$scope.alpine;
            var data = {
                title: 'Alpine Optimizer',
                message: 'This is an expermental design that will allow ARM analysts easy access to loan variables to adjust and optimize loans and provide better customer service.',
                buttons: ['ok', 'cancel']
            };
            ModalService.confirm(data)
                .then(function() {
                    // OK Button Clicked
                }, function() {
                    // Cancel Button Clicked
                });
        };

        $scope.addFarm = function() {
            alert('Adding a Farm.');
        };
        $scope.deleteFarm = function() {
            alert('Deleting a Farm.');
        };
        $scope.showCrop = function() {
            alert('Showing another crop.');
        };

    } // end function
})();
