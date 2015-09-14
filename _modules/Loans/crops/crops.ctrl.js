(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CropsController', CropsController);

    CropsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'DefaultsFactory'];

    function CropsController($rootScope, $scope, $state, AppFactory, DefaultsFactory){
        $scope.newapplications = $state.current.data.newapplications;
        $scope.AppFactory = AppFactory;

        if(!$rootScope.feeder || !$rootScope.feeder.units) {
            AppFactory.getAll('measures').then(function(rsp){
                $scope.units = rsp.data.data;
            });
        }

        AppFactory.getAll('crops')
            .then(function(rsp){
                $scope.crops = rsp.data.data;
                console.log('CROPS', $scope.crops);
            });

        DefaultsFactory.init();
        var globals = DefaultsFactory.getObject();
        $scope.globals = globals.globvars[0];

        $scope.crops = $scope.loan.loancrops;
        $scope.showCrops = false;
        $scope.showBuyers = false;
        $scope.showRebators = false;
        $scope.showYields = false;
        $scope.showIndirect = false;
        //console.log('loancrops', $scope.loan.loancrops);

        $scope.togShowCrops = function() {
            $scope.showCrops = !$scope.showCrops;
        };
        $scope.togShowBuyers = function() {
            $scope.showBuyers = !$scope.showBuyers;
        };
        $scope.togShowRebators = function() {
            $scope.showRebators = !$scope.showRebators;
        };
        $scope.togShowYields = function() {
            $scope.showYields = !$scope.showYields;
        };
        $scope.togShowIndirect = function() {
            $scope.showIndirect = !$scope.showIndirect;
        };
        $scope.createCrop = function() {
            alert('working');
        }
        $scope.saveCrop = function(data, id) {
            alert('working');
        }
        $scope.deleteCrop = function(index, id) {
            alert('working');
        }
        $scope.updateCrops = function() {
            alert('working');
        }
        $scope.addNewBuyer = function(obj) {
            alert('working');
        };
        $scope.saveBuyer = function(obj) {
            alert('working');
        };
        $scope.deleteBuyer = function(obj) {
            alert('working');
        };
        $scope.addNewRebator = function(obj) {
            alert('working');
        };
        $scope.saveRebator = function(obj) {
            alert('working');
        };
        $scope.deleteRebator = function(obj) {
            alert('working');
        };

        $scope.updatePlannedCrops = function() {
            alert('working');
        };
    } // end controller
})();