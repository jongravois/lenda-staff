(function(){
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('loans', {
                    url: '/loans',
                    abstract: true,
                    templateUrl: 'app/views/main.view.html',
                    controller: 'LoansController as loan'
                })
                .state('loans.home', {
                    url: '/home',
                    templateUrl: '_modules/Loans/_views/home.tmpl.html',
                    controller: 'LoansController as loan'
                })
                .state('loans.management', {
                    url: '/management',
                    templateUrl: '_modules/Loans/_views/management.tmpl.html',
                    controller: 'ManagementController as loanman'
                });

        });
})();