(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('SummaryController', SummaryController);

        SummaryController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function SummaryController($rootScope, $scope, AppFactory){

        } // end controller
})();