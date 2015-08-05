(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('TermsController', TermsController);

        TermsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function TermsController($rootScope, $scope, AppFactory){

        } // end controller
})();