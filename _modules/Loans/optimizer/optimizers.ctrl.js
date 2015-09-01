(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('OptimizerController', OptimizerController);

    OptimizerController.$inject = ['$scope', '$state', '$stateParams', 'ModalService', 'AppFactory', 'LoansFactory', 'OptimizerFactory'];

    function OptimizerController($scope, $state, $stateParams, ModalService, AppFactory, LoansFactory, OptimizerFactory) {
        $scope.newapplications = $state.current.data.newapplications;
        $scope.AppFactory = AppFactory;
        $scope.OptimizerFactory = OptimizerFactory;
        //console.log('units', $scope.loan.farmunits);
        //////////////////////////
        $scope.loan.crop_totals = [
            {crop: 'Corn', acres: $scope.loan.fins.crop_acres[0].acres},
            {crop: 'Soybeans', acres: $scope.loan.fins.crop_acres[1].acres},
            {crop: 'Soybeans FAC', acres: $scope.loan.fins.crop_acres[2].acres},
            {crop: 'Sorghum', acres: $scope.loan.fins.crop_acres[3].acres},
            {crop: 'Wheat', acres: $scope.loan.fins.crop_acres[4].acres},
            {crop: 'Cotton', acres: $scope.loan.fins.crop_acres[5].acres},
            {crop: 'Rice', acres: $scope.loan.fins.crop_acres[6].acres},
            {crop: 'Peanuts', acres: $scope.loan.fins.crop_acres[7].acres},
            {crop: 'Sugar Cane', acres: $scope.loan.fins.crop_acres[8].acres},
            {crop: 'Sunflowers', acres: $scope.loan.fins.crop_acres[9].acres},
        ];
        $scope.tggl = {
            showRentRows: false,
            showOverRentRows: false,
            showInsRows: false,
            showCFRows: false,
            showEXRows: false,
            showCorn: true,
            showSoybeans: true,
            showFAC: true,
            showSorghum: true,
            showWheat: true,
            showCotton: true,
            showRice: true,
            showPeanuts: true,
            showCane: true,
            showSunflowers: true,
            tcropCorn: $scope.loan.fins.crop_acres[0].acres > 0,
            tcropSoybeans: $scope.loan.fins.crop_acres[1].acres > 0,
            tcropBeansFAC: $scope.loan.fins.crop_acres[2].acres > 0,
            tcropSorghum: $scope.loan.fins.crop_acres[3].acres > 0,
            tcropWheat: $scope.loan.fins.crop_acres[4].acres > 0,
            tcropCotton: $scope.loan.fins.crop_acres[5].acres > 0,
            tcropRice: $scope.loan.fins.crop_acres[6].acres > 0,
            tcropPeanuts: $scope.loan.fins.crop_acres[7].acres > 0,
            tcropSugarcane: $scope.loan.fins.crop_acres[8].acres > 0,
            tcropSunflowers: $scope.loan.fins.crop_acres[9].acres > 0
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
