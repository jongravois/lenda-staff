(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('LoansController', LoansController);

    LoansController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$state', 'orderByFilter', 'AppFactory', 'LoansFactory'];

    /* @ngInject */
    function LoansController($rootScope, $scope, $filter, $location, $state, orderByFilter, AppFactory, LoansFactory) {
        /* jshint validthis: true */
        var data = [];
        $scope.indWid = {
            hide: false,
            width: 136
        };

        $scope.pending_view = true;
        $scope.sortPending = sortPending;
        $scope.sortLoans = AppFactory.sortLoans;
        $scope.landing_view = 'settings';

        if (!$rootScope.currentUser) {
            try {
                var user = JSON.parse(localStorage.getItem('user'));
            } catch (exception) {
                $state.go('auth');
            }
        } else {
            var user = $rootScope.currentUser;
        }
        $scope.user = user;
        //console.log('user', user);

        if(!$scope.loans) {
            if(!$rootScope.loans) {
                LoansFactory.getLoans()
                    .then(function (rsp) {
                        $scope.loans = rsp;
                        $rootScope.loans = rsp;
                        var LoansBySettings = AppFactory.filterLoans($scope.loans, 'settings');
                        var settingsLoans = $scope.sortLoans(LoansBySettings, 1);
                        $scope.sortedLoanList = settingsLoans;
                    });
            } else {
                $scope.loans = $rootScope.loans;
                var LoansBySettings = AppFactory.filterLoans($scope.loans, 'settings');
                var settingsLoans = $scope.sortLoans(LoansBySettings, 1);
                $scope.sortedLoanList = settingsLoans;
            }
        } else {
            var LoansBySettings = AppFactory.filterLoans($scope.loans, 'settings');
            var settingsLoans = $scope.sortLoans(LoansBySettings, 1);
            $scope.sortedLoanList = settingsLoans;
        }

        $scope.changeLandingView = function (val) {
            var loanset = AppFactory.filterLoans($scope.loans, val);
            $scope.sortedLoanList = loanset;
        };
        $scope.filterLoans = function(state) {
            $scope.sortedLoanList = AppFactory.sortLoans($scope.loans, state);
        }
        //////////
        function sortPending() {
            $scope.pending_view = !$scope.pending_view;
            var newData = AppFactory.getSortedData($scope.pending_view, $scope.sortedLoanList);
            $scope.sortedLoanList = newData;
        }
    } // end function
})();