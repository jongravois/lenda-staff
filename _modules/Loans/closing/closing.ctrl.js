(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ClosingsController', ClosingsController);

        ClosingsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function ClosingsController($rootScope, $scope, AppFactory){

        } // end controller
})();