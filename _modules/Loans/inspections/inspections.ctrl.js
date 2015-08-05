(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('InspectionsController', InspectionsController);

        InspectionsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function InspectionsController($rootScope, $scope, AppFactory){

        } // end controller
})();