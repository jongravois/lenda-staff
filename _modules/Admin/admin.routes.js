(function(){
    'use strict';
    angular
        .module('ARM')
            .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: '_modules/Admin/_views/admin.view.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.home', {
                    url: '/home',
                    templateUrl: '_modules/Admin/_views/home.tmpl.html',
                    controller: 'AdminController as admin'
                })

        });
})();