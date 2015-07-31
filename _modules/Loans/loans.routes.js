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
                    templateUrl: './_modules/Loans/_views/home.tmpl.html',
                    controller: 'LoansController as loan'
                })
                .state('loans.management', {
                    url: '/management',
                    templateUrl: './_modules/Loans/_views/management.tmpl.html',
                    controller: 'ManagementController as loanman'
                })
                .state('edit', {
                    abstract: true,
                    url: '/edit/{loantypeID:\\d+}/{loanID:\\d+}',
                    templateUrl: './_modules/Loans/_views/edit.loan.view.html',
                    controller: 'EditLoanController as edt',
                    resolve: {}
                })
                .state('edit.optimizer', {
                    url: '/optimizer',
                    templateUrl: './_modules/Loans/optimizer/optimizer.html',
                    controller: 'EditLoanController as editor',
                    data: {newapplication: false}
                })
                .state('edit.summary', {
                    url: '/summary',
                    templateUrl: './_modules/Loans/summary/summary.html',
                    controller: 'EditLoanController as editor',
                    data: {newapplication: false}
                })
                .state('edit.underwriting', {
                    url: '/underwriting',
                    templateUrl: './_modules/Loans/underwriting/underwriting.html',
                    controller: 'EditLoanController as editor',
                    data: {newapplication: false}
                });
        });
})();