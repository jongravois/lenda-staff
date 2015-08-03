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
                    controller: 'LoansController'
                })
                .state('loans.management', {
                    url: '/management',
                    templateUrl: './_modules/Loans/_views/management.tmpl.html',
                    controller: 'ManagementController'
                })
                .state('edit', {
                    abstract: true,
                    url: '/edit/{loantypeID:\\d+}/{loanID:\\d+}',
                    templateUrl: './_modules/Loans/_views/edit.loan.view.html',
                    controller: 'EditLoanController as edt',
                    resolve: {
                        Loan: function($stateParams, LoansFactory) {
                            return LoansFactory.getLoan($stateParams.loanID);
                        }
                    }
                })
                .state('edit.applicant', {
                    url: '/applicant',
                    templateUrl: './_modules/Loans/applicant/applicant.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.audit', {
                    url: '/audit',
                    templateUrl: './_modules/Loans/audit/audit.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.budget', {
                    url: '/budget',
                    templateUrl: './_modules/Loans/budget/budget.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.closing', {
                    url: '/closing',
                    templateUrl: './_modules/Loans/closing/closing.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.collateral', {
                    url: '/collateral',
                    templateUrl: './_modules/Loans/collateral/collateral.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.comments', {
                    url: '/comments',
                    templateUrl: './_modules/Loans/comments/comments.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.committee', {
                    url: '/committee',
                    templateUrl: './_modules/Loans/committee/committee.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.crops', {
                    url: '/crops',
                    templateUrl: './_modules/Loans/crops/crops.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.disbursements', {
                    url: '/disbursements',
                    templateUrl: './_modules/Loans/disbursements/disbursements.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.farms', {
                    url: '/farms',
                    templateUrl: './_modules/Loans/farms/farms.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.financials', {
                    url: '/financials',
                    templateUrl: './_modules/Loans/financials/financials.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.insurance', {
                    url: '/insurance',
                    templateUrl: './_modules/Loans/insurance/insurance.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.optimizer', {
                    url: '/optimizer',
                    templateUrl: './_modules/Loans/optimizer/optimizer.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false}
                })
                .state('edit.prereqs', {
                    url: '/prereqs',
                    templateUrl: './_modules/Loans/prereqs/prereqs.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.quests', {
                    url: '/quests',
                    templateUrl: './_modules/Loans/quests/quests.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.references', {
                    url: '/references',
                    templateUrl: './_modules/Loans/references/references.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.storage', {
                    url: '/storage',
                    templateUrl: './_modules/Loans/storage/storage.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.summary', {
                    url: '/summary',
                    templateUrl: './_modules/Loans/summary/summary.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false}
                })
                .state('edit.terms', {
                    url: '/terms',
                    templateUrl: './_modules/Loans/terms/terms.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.underwriting', {
                    url: '/underwriting',
                    templateUrl: './_modules/Loans/underwriting/underwriting.html',
                    controller: 'EditLoanController as edt',
                    data: {newapplication: false}
                });
        });
})();