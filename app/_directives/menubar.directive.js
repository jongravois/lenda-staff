(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('armMenuBar', armMenuBar);

    function armMenuBar() {
        return {
            transclude: true,
            controller: 'MenuController as menu',
            templateUrl: './app/views/topbar.tmpl.html'
        };
    }
})();