(function() {
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $urlRouterProvider.otherwise('/auth');
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth.view.html',
                    controller: 'AuthController as auth'
                })

                .state('main', {
                    url: '/main',
                    abstract: true,
                    templateUrl: 'app/views/main.view.html',
                    controller: 'MainController'
                })
                .state('main.home', {
                    url: '/home',
                    templateUrl: 'app/views/home.tmpl.html',
                    controller: 'LoansController'
                })
                .state('main.prefs', {
                    url: '/prefs',
                    templateUrl: 'app/views/prefs.tmpl.html',
                    controller: 'SettingsController'
                });
        });
})();
