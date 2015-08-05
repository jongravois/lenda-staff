(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReconciliationsController', ReconciliationsController);

        ReconciliationsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function ReconciliationsController($rootScope, $scope, AppFactory){

        } // end controller
})();