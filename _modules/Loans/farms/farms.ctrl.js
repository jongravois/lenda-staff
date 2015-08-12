(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FarmsController', FarmsController);

        FarmsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FarmsController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            console.log($scope.loan.farms);
        } // end controller
})();