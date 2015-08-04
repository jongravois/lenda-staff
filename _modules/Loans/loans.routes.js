(function(){
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('arm.loan_management', {
                    url: '/loan_management',
                    templateUrl: './_modules/Loans/_views/management.tmpl.html',
                    controller: 'ManagementController'
                })
                .state('arm.edit', {
                    abstract: true,
                    url: '/edit/{loantypeID:\\d+}/{loanID:\\d+}',
                    templateUrl: './_modules/Loans/_views/edit.loan.view.html',
                    controller: 'EditLoanController',
                    resolve: {
                        Loan: function($stateParams, LoansFactory) {
                            return LoansFactory.getLoan($stateParams.loanID);
                        }
                    }
                })
                .state('arm.edit.applicant', {
                    url: '/applicant',
                    templateUrl: './_modules/Loans/applicant/applicant.html',
                    controller: 'ApplicantsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.audit', {
                    url: '/audit',
                    templateUrl: './_modules/Loans/audit/audit.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget', {
                    url: '/budget',
                    templateUrl: './_modules/Loans/budget/budget.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.closing', {
                    url: '/closing',
                    templateUrl: './_modules/Loans/closing/closing.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.collateral', {
                    url: '/collateral',
                    templateUrl: './_modules/Loans/collateral/collateral.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.comments', {
                    url: '/comments',
                    templateUrl: './_modules/Loans/comments/comments.html',
                    controller: 'CommentsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.committee', {
                    url: '/committee',
                    templateUrl: './_modules/Loans/committee/committee.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.crops', {
                    url: '/crops',
                    templateUrl: './_modules/Loans/crops/crops.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.disbursements', {
                    url: '/disbursements',
                    templateUrl: './_modules/Loans/disbursements/disbursements.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.farms', {
                    url: '/farms',
                    templateUrl: './_modules/Loans/farms/farms.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.financials', {
                    url: '/financials',
                    templateUrl: './_modules/Loans/financials/financials.html',
                    controller: 'FinancialsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('edit.insurance', {
                    url: '/insurance',
                    templateUrl: './_modules/Loans/insurance/insurance.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.optimizer', {
                    url: '/optimizer',
                    templateUrl: './_modules/Loans/optimizer/optimizer.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false}
                })
                .state('arm.edit.prereqs', {
                    url: '/prereqs',
                    templateUrl: './_modules/Loans/prereqs/prereqs.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.quests', {
                    url: '/quests',
                    templateUrl: './_modules/Loans/quests/quests.html',
                    controller: 'QuestsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.references', {
                    url: '/references',
                    templateUrl: './_modules/Loans/references/references.html',
                    controller: 'ReferencesController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.storage', {
                    url: '/storage',
                    templateUrl: './_modules/Loans/storage/storage.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.summary', {
                    url: '/summary',
                    templateUrl: './_modules/Loans/summary/summary.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false}
                })
                .state('arm.edit.terms', {
                    url: '/terms',
                    templateUrl: './_modules/Loans/terms/terms.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.underwriting', {
                    url: '/underwriting',
                    templateUrl: './_modules/Loans/underwriting/underwriting.html',
                    controller: 'EditLoanController',
                    data: {newapplication: false}
                });
        });
})();