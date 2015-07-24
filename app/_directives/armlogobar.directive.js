(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('armLogoBar', armLogoBar);

    function armLogoBar() {
        return {
            transclude: true,
            controller: 'UserController as main',
            templateUrl: './app/views/logobar.tmpl.html'
        };
    }
})();