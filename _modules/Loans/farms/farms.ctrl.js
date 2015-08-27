(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FarmsController', FarmsController);

        FarmsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function FarmsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;
            console.log($scope.loan.farms);
        } // end controller
})();