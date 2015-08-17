(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CustomerBudgetController', CustomerBudgetController);

    CustomerBudgetController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function CustomerBudgetController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.dollarsPercent = true;
        $scope.detail = true;

        $scope.sortKeys = [
            {field: 'location.regions.region', sort: 'asc'},
            {field: 'location.loc_abr', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'full_season', sort: 'asc'},
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'farmer.farmer', sort: 'asc'},
            {field: 'applicant.applicant', sort: 'asc'},
            {field: 'distributor.distributor', sort: 'asc'},
            {field: 'loantype_abr', sort: 'asc'}
        ];

        var columnDefs = [
            {
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165,
                hide: true
            },
            {
                headerGroup: 'Area',
                headerGroupShow: 'open',
                headerTooltip: 'Region',
                headerName: 'Reg',
                valueGetter: 'data.location.regions.region',
                cellClass: 'text-center',
                width: 85
            },
            {
                headerGroup: 'Area',
                headerTooltip: 'Location',
                headerName: 'Location',
                valueGetter: 'data.location.location',
                cellClass: 'text-left',
                width: 100,
                hide: true
            },
            {
                headerGroup: 'Area',
                headerTooltip: 'Location',
                headerName: 'Location',
                valueGetter: 'data.location.loc_abr',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Crop Year',
                headerGroup: 'Crop',
                headerGroupShow: 'open',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 85,
                filter: 'number'
            },
            {
                headerTooltip: 'Season',
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'full_season',
                cellClass: 'text-center',
                width: 95
            },
            {
                headerTooltip: 'Analyst',
                headerName: 'Analyst',
                field: 'analyst',
                cellClass: 'text-left',
                width: 150,
                hide: true
            },
            {
                headerTooltip: 'Analyst',
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                width: 80,
                hide: true
            },
            {
                headerTooltip: 'Farmer',
                headerGroup: 'Customer',
                headerName: 'Farmer',
                valueGetter: 'data.farmer.farmer',
                cellClass: 'text-left',
                width: 120
            },
            {
                headerTooltip: 'Applicant',
                headerGroup: 'Customer',
                headerName: 'Applicant',
                valueGetter: 'data.applicant.applicant',
                cellClass: 'text-left',
                width: 120
            },
            {
                headerTooltip: 'Loan Type',
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loan_type',
                cellClass: 'text-left',
                width: 100,
                hide: true
            },
            {
                headerTooltip: 'Loan Type',
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Distributor',
                headerGroup: 'Loan',
                headerGroupShow: 'open',
                headerName: 'Dist',
                valueGetter: 'data.distributor.distributor',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Loan Origin Date',
                headerGroup: 'Date',
                headerName: 'Orig Dt',
                field: 'orig_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.orig_date).format('MM/DD/YYYY');
                },
                width: 80
            },
            {
                headerTooltip: 'Loan Due Date',
                headerGroup: 'Date',
                headerGroupShow: 'open',
                headerName: 'Due Dt',
                field: 'due_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.past_due == 1) {
                        return "<span style='color: orange'>" + params.data.due_date + "</span>";
                    }
                    else if (params.data.past_due == 2) {
                        return "<span style='color: #ee0000'>" + params.data.due_date + "</span>";
                    } else {
                        return "<span style='color: black'>" + params.data.due_date + "</span>";
                    }
                },
                width: 80
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agencies',
                cellClass: 'text-left',
                width: 150,
                hide: true
            },
            {
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerGroup: 'ARM',
                headerName: 'Commit',
                valueGetter: 'data.financials.commit_arm',
                cellClass: function (params) {
                    return (params.data.financials.commit_arm ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.financials.commit_arm, 0);
                },
                width: 110
            },
            {
                headerGroup: 'ARM',
                headerGroupShow: 'open',
                headerName: 'Fees',
                valueGetter: 'data.financials.fee_total',
                cellClass: function (params) {
                    return (params.data.financials.fee_total ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.financials.fee_total, 0);
                },
                width: 100
            },
            {
                headerGroup: 'ARM',
                headerGroupShow: 'open',
                headerName: 'Rate',
                valueGetter: 'data.fins.int_percent_arm',
                cellClass: function (params) {
                    return (params.data.fins.int_percent_arm ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.fins.int_percent_arm, 2);
                },
                width: 100
            },
            {
                headerGroup: 'Dist',
                headerName: 'Commitment',
                valueGetter: 'data.financials.commit_dist',
                cellClass: function (params) {
                    return (params.data.financials.commit_dist ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.financials.commit_dist, 0);
                },
                // template: '<span ng-class="{gtZero(params.data.commit_dist)}">params.data.commit_dist</span>',
                width: 100,
                hide: true
            },
            {
                headerGroup: 'Dist',
                headerGroupShow: 'closed',
                headerName: 'Rate',
                valueGetter: 'data.fins.int_percent_dist',
                cellClass: function (params) {
                    return (params.data.fins.int_percent_dist ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.fins.int_percent_dist, 2);
                },
                width: 70,
                hide: true
            },
            {
                headerGroup: 'Budget',
                //headerGroupShow: 'closed',
                headerName: 'Budget',
                field: 'fins.balance_total',
                cellClass: function (params) {
                    return (params.data.fins.balance_total ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.balance_total, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                //headerGroupShow: 'closed',
                headerName: 'Spent',
                field: 'fins.balance_spent',
                cellClass: function (params) {
                    return (params.data.fins.balance_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.balance_spent, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Available',
                field: 'fins.balance_remaining',
                cellClass: function (params) {
                    return (params.data.fins.balance_remaining ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    params.data.fins.balance_remaining = params.data.fins.balance_total - params.data.fins.balance_spent;
                    return $filter('flexCurrency')(params.data.fins.balance_remaining, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                //headerGroupShow: 'closed',
                headerName: 'Budget %',
                field: 'total_percent_budget',
                cellClass: function (params) {
                    params.data.total_percent_budget = params.data.fins.balance_total / params.data.fins.balance_total * 100;
                    return (params.data.total_percent_budget ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    if (params.data.fins.balance_total > 0) {
                        params.data.total_percent_budget = 100;
                    } else {
                        params.data.total_percent_budget = 0;
                    }
                    return $filter('flexPercent')(params.data.total_percent_budget, 1);
                },
                hide: true,
                width: 100
            },
            {
                headerGroup: 'Budget',
                //headerGroupShow: 'closed',
                headerName: 'Spent %',
                field: 'total_percent_spent',
                cellClass: function (params) {
                    params.data.total_percent_spent = params.data.fins.balance_spent / params.data.fins.balance_total * 100;
                    return (params.data.total_percent_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.total_percent_spent, 1);
                },
                hide: true,
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Available %',
                field: 'total_percent_remaining',
                cellClass: function (params) {
                    return (100 - params.data.total_percent_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    params.data.total_percent_remaining = 100 - params.data.total_percent_spent;
                    return $filter('flexPercent')(params.data.total_percent_remaining, 1);
                },
                hide: true,
                width: 100
            },
            {
                headerName: 'Acct',
                field: 'status_right',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.right.html',
                width: 80,
                hide: true
            },
            {
                headerTooltip: 'Classification',
                headerName: 'Class',
                field: 'account_classification',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80,
                hide: true
            }
        ];

        $scope.showToolPanel = function () {
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
        }

        $scope.toggleDetail = function () {
            $scope.detail = !$scope.detail;
        }

        $scope.toggleDollarsPercent = function () {
            $scope.dollarsPercent = !$scope.dollarsPercent;
            $scope.gridOptions.api.hideColumns(['total_percent_budget', 'total_percent_spent', 'total_percent_remaining'], $scope.dollarsPercent);
            $scope.gridOptions.api.hideColumns(['fins.balance_total', 'fins.balance_spent', 'fins.balance_remaining'], !$scope.dollarsPercent);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowDeselection: true,
            rowData: null,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false,
            ready: function (api) {
                $timeout(function () {
                    api.hideColumns(['total_percent_budget', 'total_percent_spent', 'total_percent_remaining'], true);
                    api.setSortModel($scope.sortKeys);
                });
            }
        };

        $scope.gridOptions.rowData = $scope.loans;
        console.log('rowData', $scope.gridOptions.rowData);

        if ($scope.gridOptions.rowData.length < 20) {
            $scope.gridHeight = (400).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }
    }

})();
