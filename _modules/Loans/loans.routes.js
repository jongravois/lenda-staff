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
                .state('arm.new', {
                    abstract: true,
                    url: '/new/{loantypeID:\\d+}/{loanID:\\d+}',
                    templateUrl: './_modules/Loans/_views/_new.loan.view.html',
                    controller: 'NewLoanController'
                })
                .state('arm.new.applicant', {
                    url: '/applicant',
                    templateUrl: './_modules/Loans/applicant/new_shell.html',
                    controller: 'ApplicantsController',
                    data: {newapplication: true},
                    resolve: {}
                })
                .state('arm.edit', {
                    abstract: true,
                    url: '/edit/{loantypeID:\\d+}/{loanID:\\d+}',
                    templateUrl: './_modules/Loans/_views/_edit.loan.view.html',
                    controller: 'EditLoanController',
                    resolve: {
                        Loan: function($stateParams, LoansFactory) {
                            return LoansFactory.getLoan($stateParams.loanID);
                        }
                    }
                })
                .state('arm.edit.applicant', {
                    url: '/applicant',
                    templateUrl: './_modules/Loans/applicant/shell.html',
                    controller: 'ApplicantsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.audit', {
                    url: '/audit',
                    templateUrl: './_modules/Loans/audit/audit.html',
                    controller: 'AuditController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget', {
                    url: '/budget',
                    abstract: true,
                    templateUrl: './_modules/Loans/budgets/shell.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.farm', {
                    url: '/farm',
                    templateUrl: './_modules/Loans/budgets/_farm.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.corn', {
                    url: '/corn',
                    templateUrl: './_modules/Loans/budgets/_corn.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.soybeans', {
                    url: '/soybeans',
                    templateUrl: './_modules/Loans/budgets/_soybeans.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.sorghum', {
                    url: '/sorghum',
                    templateUrl: './_modules/Loans/budgets/_sorghum.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.wheat', {
                    url: '/wheat',
                    templateUrl: './_modules/Loans/budgets/_wheat.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.cotton', {
                    url: '/cotton',
                    templateUrl: './_modules/Loans/budgets/_cotton.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.rice', {
                    url: '/rice',
                    templateUrl: './_modules/Loans/budgets/_rice.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.peanuts', {
                    url: '/peanuts',
                    templateUrl: './_modules/Loans/budgets/_peanuts.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.sugarcane', {
                    url: '/sugarcane',
                    templateUrl: './_modules/Loans/budgets/_sugarcane.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.budget.sunflowers', {
                    url: '/sunflowers',
                    templateUrl: './_modules/Loans/budgets/_sunflowers.html',
                    controller: 'BudgetsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.closing', {
                    url: '/closing',
                    templateUrl: './_modules/Loans/closing/closing.html',
                    controller: 'ClosingsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.collateral', {
                    url: '/collateral',
                    templateUrl: './_modules/Loans/collateral/collateral.html',
                    controller: 'CollateralsController',
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
                    controller: 'CommitteesController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.crops', {
                    url: '/crops',
                    templateUrl: './_modules/Loans/crops/crops.html',
                    controller: 'CropsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.crosscollateral', {
                    url: '/crosscollateral',
                    templateUrl: './_modules/Loans/xcollateral/xcollateral.html',
                    controller: 'XcollateralsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.disbursements', {
                    url: '/disbursements',
                    templateUrl: './_modules/Loans/disbursements/disbursements.html',
                    controller: 'DisbursementsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.farms', {
                    url: '/farms',
                    templateUrl: './_modules/Loans/farms/farms.html',
                    controller: 'FarmsController',
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
                .state('arm.edit.fsa', {
                    url: '/fsa',
                    templateUrl: './_modules/Loans/fsa/fsa.html',
                    controller: 'FsaController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.insurance', {
                    url: '/insurance',
                    templateUrl: './_modules/Loans/insurance/insurance.html',
                    controller: 'InsuranceController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.optimizer', {
                    url: '/optimizer',
                    templateUrl: './_modules/Loans/optimizer/optimizer.html',
                    controller: 'OptimizerController',
                    data: {newapplication: false}
                })
                .state('arm.edit.prereqs', {
                    url: '/prereqs',
                    templateUrl: './_modules/Loans/prereqs/prereqs.html',
                    controller: 'PrereqsController',
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
                    templateUrl: './_modules/Loans/references/shell.html',
                    controller: 'ReferencesController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.storage', {
                    url: '/storage',
                    templateUrl: './_modules/Loans/storage/storage.html',
                    controller: 'StoragesController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.summary', {
                    url: '/summary',
                    templateUrl: './_modules/Loans/summary/summary.html',
                    controller: 'SummaryController',
                    data: {newapplication: false}
                })
                .state('arm.edit.terms', {
                    url: '/terms',
                    templateUrl: './_modules/Loans/terms/terms.html',
                    controller: 'TermsController',
                    data: {newapplication: false},
                    resolve: {}
                })
                .state('arm.edit.underwriting', {
                    url: '/underwriting',
                    templateUrl: './_modules/Loans/underwriting/underwriting.html',
                    controller: 'UnderwritingController',
                    data: {newapplication: false}
                });
        });
})();