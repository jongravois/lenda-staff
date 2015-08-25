(function(){
    'use strict';
    angular.module('ARM').config(function($stateProvider, $urlRouterProvider, API_URL) {
        $stateProvider
            .state('arm.reports', {
                url: '/reports',
                abstract: true,
                template: '<div id="Reports" ui-view></div>',
                controller: 'ReportsController',
                resolve: {
                    Loans: function(LoansFactory) {
                        return LoansFactory.getLoans();
                    }
                }
            })
            .state('arm.reports.accrec', {
                url: '/accrec',
                templateUrl: '_modules/Reports/_views/accountreconciliation/account.reconciliation.tmpl.html',
                controller: 'AccountReconciliationController'
            })
            .state('arm.reports.actdet', {
                url: '/actdet',
                templateUrl: '_modules/Reports/_views/activitydetail/activity.detail.tmpl.html',
                controller: 'ActivityDetailController'
            })
            .state('arm.reports.actsum', {
                url: '/actsum',
                templateUrl: '_modules/Reports/_views/activitysummary/activity.summary.tmpl.html',
                controller: 'ActivitySummaryController'
            })
            .state('arm.reports.cashflow', {
                url: '/cashflow',
                templateUrl: '_modules/Reports/_views/cashflow/cashflow.tmpl.html',
                controller: 'CashflowController'
            })
            .state('arm.reports.comapp', {
                url: '/comapp',
                templateUrl: '_modules/Reports/_views/committeeapproval/committee.approval.tmpl.html',
                controller: 'CommitteeApprovalController'
            })
            .state('arm.reports.comcom', {
                url: '/comcom',
                templateUrl: '_modules/Reports/_views/committeecomment/committee.comment.tmpl.html',
                controller: 'CommitteeCommentController'
            })
            .state('arm.reports.crops', {
                url: '/crops',
                templateUrl: '_modules/Reports/_views/cropmix/crop.mix.tmpl.html',
                controller: 'CropMixController'
            })
            .state('arm.reports.cusbud', {
                url: '/cusbud',
                templateUrl: '_modules/Reports/_views/customerbudget/customer.budget.tmpl.html',
                controller: 'CustomerBudgetController'
            })
            .state('arm.reports.fmrhis', {
                url: '/fmrhis',
                templateUrl: '_modules/Reports/_views/farmerhistory/farmer.history.tmpl.html',
                controller: 'FarmerHistoryController'
            })
            .state('arm.reports.home', {
                url: '/home',
                templateUrl: '_modules/Reports/_views/home/home.tmpl.html',
                controller: 'HomeController'
            })
            .state('arm.reports.lnman', {
                url: '/lnman',
                templateUrl: '_modules/Reports/_views/loanmanagement/loan.management.tmpl.html',
                controller: 'LoanManagementController'
            })
            .state('arm.reports.reqrpt', {
                url: '/reqrpt',
                templateUrl: '_modules/Reports/_views/required/required.tmpl.html',
                controller: 'RequiredController',
                resolve: {
                    Trackers: function(AppFactory) {
                        return AppFactory.getAll('reporttrackers');
                    }
                }
            })
            .state('arm.reports.usradt', {
                url: '/usradt',
                templateUrl: '_modules/Reports/_views/useraudit/user.audit.tmpl.html',
                controller: 'UserAuditController'
            });
    });
})();