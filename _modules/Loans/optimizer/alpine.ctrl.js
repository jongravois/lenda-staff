(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AlpineController', AlpineController);

        AlpineController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function AlpineController($rootScope, $scope, AppFactory){

        } // end controller
})();