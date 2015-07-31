(function(){
    'use strict';
    angular.module('ARM').config(function($stateProvider, $urlRouterProvider, API_URL) {
        $stateProvider
            .state('reports', {
                url: '/reports',
                abstract: true,
                templateUrl: '_modules/Reports/_views/reports.view.html',
                controller: 'ReportsController as reports',
                resolve: {
                    Loans: function(LoansFactory) {
                        return LoansFactory.getLoans();
                    }
                }
            })
            .state('reports.home', {
                url: '/home',
                templateUrl: '_modules/Reports/_views/home.tmpl.html',
                controller: 'ReportsController as rpts'
            })
            .state('reports.actdet', {
                url: '/actdet',
                templateUrl: '_modules/Reports/_views/activitydetail/activity.detail.tmpl.html',
                controller: 'ActivityDetailController',
                controllerAs: 'actdet'
            })
            .state('reports.lnman', {
                url: '/lnman',
                templateUrl: '_modules/Reports/_views/loanmanagement/loan.management.tmpl.html',
                controller: 'LoanManagementController',
                controllerAs: 'lnman'
            })
            .state('reports.accrec', {
                url: '/accrec',
                templateUrl: '_modules/Reports/_views/accountreconciliation/account.reconciliation.tmpl.html',
                controller: 'AccountReconciliationController',
                controllerAs: 'accrec'
            })
            .state('reports.cashflow', {
                url: '/cashflow',
                templateUrl: '_modules/Reports/_views/cashflow/cashflow.tmpl.html',
                controller: 'CashflowController',
                controllerAs: 'cashflow'
            })
            .state('reports.cusbud', {
                url: '/cusbud',
                templateUrl: '_modules/Reports/_views/customerbudget/customer.budget.tmpl.html',
                controller: 'CustomerBudgetController',
                controllerAs: 'cusbud'
            })
            .state('reports.actsum', {
                url: '/actsum',
                templateUrl: '_modules/Reports/_views/activitysummary/activity.summary.tmpl.html',
                controller: 'ActivitySummaryController',
                controllerAs: 'actsum'
            })
            .state('reports.fmrhis', {
                url: '/fmrhis',
                templateUrl: '_modules/Reports/_views/farmerhistory/farmer.history.tmpl.html',
                controller: 'FarmerHistoryController',
                controllerAs: 'fmrhis'
            })
            .state('reports.crops', {
                url: '/crops',
                templateUrl: '_modules/Reports/_views/cropmix/crop.mix.tmpl.html',
                controller: 'CropMixController',
                controllerAs: 'crops'
            })
            .state('reports.comapp', {
                url: '/comapp',
                templateUrl: '_modules/Reports/_views/committeeapproval/committee.approval.tmpl.html',
                controller: 'CommitteeApprovalController',
                controllerAs: 'comapp'
            })
            .state('reports.comcom', {
                url: '/comcom',
                templateUrl: '_modules/Reports/_views/committeecomment/committee.comment.tmpl.html',
                controller: 'CommitteeCommentController',
                controllerAs: 'comcom'
            })
            .state('reports.reqrpt', {
                url: '/reqrpt',
                templateUrl: '_modules/Reports/_views/required/required.tmpl.html',
                controller: 'RequiredController',
                controllerAs: 'reqrpt'
            })
            .state('reports.usradt', {
                url: '/usradt',
                templateUrl: '_modules/Reports/_views/useraudit/user.audit.tmpl.html',
                controller: 'UserAuditController',
                controllerAs: 'usradt'
            });
    });
})();