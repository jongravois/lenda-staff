(function(){
    'use strict';
    angular.module('ARM').config(function($stateProvider, $urlRouterProvider, API_URL) {
        $stateProvider
            .state('reports', {
                url: '/reports',
                abstract: true,
                templateUrl: '_modules/Reports/_views/reports.view.html',
                controller: 'ReportsController as reports'
            })
            .state('reports.home', {
                url: '/home',
                templateUrl: '_modules/Reports/_views/home.tmpl.html',
                controller: 'ReportsController as reports'
            });
    });
})();