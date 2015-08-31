(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('TermsController', TermsController);

        TermsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function TermsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.saveTerms = function() {
                alert('working');
            };
        } // end controller
})();