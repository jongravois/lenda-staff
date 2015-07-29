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
                    controller: 'MainController as main'
                })
                .state('main.home', {
                    url: '/home',
                    templateUrl: 'app/views/home.view.html',
                    controller: 'LoansController as loans'
                })
                .state('main.prefs', {
                    url: '/prefs',
                    templateUrl: 'app/views/prefs.view.html',
                    controller: 'SettingsController as prefs'
                })
                .state('main.users', {
                    url: '/users',
                    templateUrl: 'app/views/main.view.html',
                    controller: 'UserController as user'
                });
        });
})();
