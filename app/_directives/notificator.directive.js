(function () {
    'use strict';

    angular.module('ARM')
        .directive('notificator', NotificatorDirective);

    function NotificatorDirective() {
        return {
            restrict: 'AE',
            scope: {
                counts: '='
            },
            templateUrl: './app/views/notificator.tmpl.html',
            link: function(scope, element, attrs) {
            }
        };
    }

})();
