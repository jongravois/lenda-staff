(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CollateralsController', CollateralsController);

        CollateralsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function CollateralsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            //console.log('LIENS', $scope.loan.priorlien);
        } // end controller
})();