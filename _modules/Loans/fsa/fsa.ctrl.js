(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FsaController', FsaController);

        FsaController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FsaController($rootScope, $scope, AppFactory){

        } // end controller
})();