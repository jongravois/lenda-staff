(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CustomerBudgetController', CustomerBudgetController);

    CustomerBudgetController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function CustomerBudgetController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.icons = false;
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
            {field: 'loantype_abr', sort: 'asc'},
        ];

        var columnDefs = [
            {
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165
            },
            {
                headerName: 'Region',
                valueGetter: 'data.location.regions.region',
                cellClass: 'text-center',
                width: 85
            },
            {
                headerName: 'Loc',
                valueGetter: 'data.location.loc_abr',
                cellClass: 'text-center',
                width: 70
            },
            {
                headerGroup: 'Crop',
                //headerGroupShow: 'closed',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 85,
                filter: 'number'
            },
            {
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'full_season',
                cellClass: 'text-center',
                width: 95
            },
            {
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                width: 95
            },
            {
                headerName: 'Farmer',
                valueGetter: 'data.farmer.farmer',
                cellClass: 'text-left',
                width: 120
            },
            {
                headerName: 'Applicant',
                valueGetter: 'data.applicant.applicant',
                cellClass: 'text-left',
                width: 120
            },
            {
                headerGroup: 'Loan',
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerGroup: 'Loan',
                //headerGroupShow: 'closed',
                headerName: 'Dist',
                valueGetter: 'data.distributor.distributor',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerGroup: 'Loan',
                field: 'loan_date',
                headerName: 'Date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.loan_date).format('MM/DD/YYYY');
                },
                width: 80
            },
            {
                headerGroup: '',
                headerName: 'Agency',
                field: 'agencies',
                cellClass: 'text-center',
                width: 80
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
                headerGroup: 'Budget',
                headerName: 'Budget',
                field: 'total_budget_amount',
                cellClass: function (params) {
                    return (params.data.total_budget_amount ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.total_budget_amount, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Spent',
                field: 'total_budget_spent',
                cellClass: function (params) {
                    return (params.data.total_budget_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.total_budget_spent, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Available',
                field: 'total_budget_remaining',
                cellClass: function (params) {
                    return (params.data.total_budget_remaining ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    params.data.total_budget_remaining = params.data.total_budget_amount - params.data.total_budget_spent;
                    return $filter('flexCurrency')(params.data.total_budget_remaining, 0);
                },
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Budget',
                field: 'total_percent_budget',
                cellClass: function (params) {
                    var total_percent_budget = params.data.total_budget_amount / params.data.total_budget_amount * 100;
                    return (total_percent_budget ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    var total_percent_budget = params.data.total_budget_amount / params.data.total_budget_amount * 100;
                    return $filter('flexPercent')(total_percent_budget, 1);
                },
                hide: true,
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Spent',
                field: 'total_percent_spent',
                cellClass: function (params) {
                    return (params.data.total_budget_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.total_percent_spent, 1);
                },
                hide: true,
                width: 100
            },
            {
                headerGroup: 'Budget',
                headerName: 'Available',
                field: 'total_percent_remaining',
                cellClass: function (params) {
                    return (1 - params.data.total_percent_spent ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    params.data.total_percent_remaining = 100 - params.data.total_percent_spent;
                    return $filter('flexPercent')(params.data.total_percent_remaining, 1);
                },
                hide: true,
                width: 100
            }
        ];

        $scope.printState = function() {
            var state = $scope.gridOptions.api.getColumnState();
            console.log(state);
        };

        var savedState;

        $scope.saveState = function() {
            savedState = $scope.gridOptions.api.getColumnState();
            console.log('column state saved');
        };

        $scope.restoreState = function() {
            $scope.gridOptions.api.setColumnState(savedState);
            console.log('column state restored');
        };

        $scope.getModel = function(){
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
            }
        }

        $scope.hideIcons = function () {
            $scope.icons = !$scope.icons;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
                $scope.gridOptions.api.hideColumns(['total_budget_amount'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_budget'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_spent'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_spent'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_remaining'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_remaining'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
        }

        $scope.showToolPanel = function () {
            $scope.tools = !$scope.tools;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.showToolPanel($scope.tools);
            }
        }

        $scope.toggleDetail = function () {
            $scope.detail = !$scope.detail;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.onNewCols();
                $scope.gridOptions.api.hideColumns(['total_budget_amount'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_budget'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_spent'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_spent'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_remaining'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_remaining'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
        }

        $scope.toggleDollarsPercent = function () {
            $scope.dollarsPercent = !$scope.dollarsPercent;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.onNewCols();
                $scope.gridOptions.api.hideColumns(['total_budget_amount'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_budget'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_spent'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_spent'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_budget_remaining'], !$scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['total_percent_remaining'], $scope.dollarsPercent);
                $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
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
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
    }

})();
