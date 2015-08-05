(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DisbursementsController', DisbursementsController);

        DisbursementsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function DisbursementsController($rootScope, $scope, AppFactory){

        } // end controller
})();