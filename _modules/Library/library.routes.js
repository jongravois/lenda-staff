(function(){
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('library', {
                    url: '/library',
                    abstract: true,
                    templateUrl: '_modules/Library/_views/library.view.html',
                    controller: 'LibraryController as library'
                })
                .state('library.home', {
                    url: '/home',
                    templateUrl: '_modules/Library/_views/home.tmpl.html',
                    controller: 'LibraryController as library'
                });
        });
})();