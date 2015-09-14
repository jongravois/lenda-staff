(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('emailIcon', EmailIconDirective);

    EmailIconDirective.$inject = [];

    function EmailIconDirective() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: { email: '=' },
            templateUrl: './_modules/Loans/summary/_email.icon.html'
        };
    }
})();