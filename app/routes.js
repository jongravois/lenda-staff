(function() {
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $urlRouterProvider.otherwise('/');
            $stateProvider
                .state('auth', {
                    url: '/auth',
                    templateUrl: 'app/views/auth.view.html',
                    controller: 'MainController'
                })

                .state('arm', {
                    url: '/arm',
                    abstract: true,
                    templateUrl: 'app/views/main.view.html',
                    controller: 'UserController'
                })
                .state('arm.home', {
                    url: '/home',
                    templateUrl: 'app/views/home.tmpl.html',
                    controller: 'LoansController'
                })
                .state('arm.prefs', {
                    url: '/prefs',
                    templateUrl: 'app/views/prefs.tmpl.html',
                    controller: 'SettingsController'
                });
        });
    
})();
