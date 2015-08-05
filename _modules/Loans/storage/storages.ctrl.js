(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('StoragesController', StoragesController);

        StoragesController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function StoragesController($rootScope, $scope, AppFactory){
        } // end controller
})();