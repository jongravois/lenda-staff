(function(){
    'use strict';
    angular.module('ARM').config(function($stateProvider, $urlRouterProvider, API_URL) {
        $stateProvider
            .state('reports', {
                url: '/reports',
                abstract: true,
                templateUrl: '_modules/Reports/_views/reports/reports.view.html',
                controller: 'ReportsController as reports',
                resolve: {
                    Loans: function(LoansFactory) {
                        return LoansFactory.getLoans();
                    }
                }
            })
            .state('reports.home', {
                url: '/home',
                templateUrl: '_modules/Reports/_views/home/home.tmpl.html',
                controller: 'HomeController as home'
            })
            .state('reports.actdet', {
                url: '/actdet',
                templateUrl: '_modules/Reports/_views/activitydetail/activity.detail.tmpl.html',
                controller: 'ActivityDetailController as actdet'
            })
            .state('reports.lnman', {
                url: '/lnman',
                templateUrl: '_modules/Reports/_views/loanmanagement/loan.management.tmpl.html',
                controller: 'LoanManagementController as lnman'
            })
            .state('reports.accrec', {
                url: '/accrec',
                templateUrl: '_modules/Reports/_views/accountreconciliation/account.reconciliation.tmpl.html',
                controller: 'AccountReconciliationController as accrec'
            })
            .state('reports.cashflow', {
                url: '/cashflow',
                templateUrl: '_modules/Reports/_views/cashflow/cashflow.tmpl.html',
                controller: 'CashflowController as cashflow'
            })
            .state('reports.cusbud', {
                url: '/cusbud',
                templateUrl: '_modules/Reports/_views/customerbudget/customer.budget.tmpl.html',
                controller: 'CustomerBudgetController as cusbud'
            })
            .state('reports.actsum', {
                url: '/actsum',
                templateUrl: '_modules/Reports/_views/activitysummary/activity.summary.tmpl.html',
                controller: 'ActivitySummaryController as actsum'
            })
            .state('reports.fmrhis', {
                url: '/fmrhis',
                templateUrl: '_modules/Reports/_views/farmerhistory/farmer.history.tmpl.html',
                controller: 'FarmerHistoryController as fmrhis'
            })
            .state('reports.crops', {
                url: '/crops',
                templateUrl: '_modules/Reports/_views/cropmix/crop.mix.tmpl.html',
                controller: 'CropMixController as crops'
            })
            .state('reports.comapp', {
                url: '/comapp',
                templateUrl: '_modules/Reports/_views/committeeapproval/committee.approval.tmpl.html',
                controller: 'CommitteeApprovalController as comapp'
            })
            .state('reports.comcom', {
                url: '/comcom',
                templateUrl: '_modules/Reports/_views/committeecomment/committee.comment.tmpl.html',
                controller: 'CommitteeCommentController as comcom'
            })
            .state('reports.reqrpt', {
                url: '/reqrpt',
                templateUrl: '_modules/Reports/_views/required/required.tmpl.html',
                controller: 'RequiredController as reqrpt'
            })
            .state('reports.usradt', {
                url: '/usradt',
                templateUrl: '_modules/Reports/_views/useraudit/user.audit.tmpl.html',
                controller: 'UserAuditController as usradt'
            });
    });
})();