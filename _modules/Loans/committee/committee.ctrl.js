(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteesController', CommitteesController);

        CommitteesController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function CommitteesController($rootScope, $scope, AppFactory){

        } // end controller
})();