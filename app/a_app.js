(function () {
    'use strict';

    angular
        .module('ARM', [
            'ui.router',
            'ui.bootstrap',
            'satellizer',
            'toastr',
            'oitozero.ngSweetAlert',
            'angularGrid',
            'ui.grid',
            'ui.grid.edit',
            'ui.grid.cellNav',
            'ui.mask',
            'xeditable',
            'tableSort',
            'angular-loading-bar',
            'ui.bootstrap-slider',
            'ng-pdfmake',
            'angularTreeview'
        ])
        .run(function ($rootScope, $location) {
            $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                $rootScope.path = toState.url.substr(1);
                //console.log($rootScope.path);
            });
        });
})();
