(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CollateralsController', CollateralsController);

        CollateralsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function CollateralsController($rootScope, $scope, AppFactory){
            //console.log('LIENS', $scope.loan.priorlien);
        } // end controller
})();