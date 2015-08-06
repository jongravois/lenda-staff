(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CustomerBudgetController', CustomerBudgetController);

    CustomerBudgetController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CustomerBudgetFactory'];

    function CustomerBudgetController($scope, $http, $filter, $timeout, AppFactory, Loans, CustomerBudgetFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        var columnDefs = [
            {
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165
            },
            {
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.region.toUpperCase() === 'N') {
                        return 'North';
                    } else if (params.data.region.toUpperCase() === 'S') {
                        return 'South';
                    } else if (params.data.region.toUpperCase() === 'E') {
                        return 'East';
                    } else if (params.data.region.toUpperCase() === 'W') {
                        return 'West';
                    } else {
                        return params.data.region;
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85
            },
            {
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerGroup: 'Crop',
                //headerGroupShow: 'closed',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85,
                filter: 'number'
            },
            {
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'season',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.season.toUpperCase() == 'F') {
                        return 'Fall';
                    } else {
                        return 'Spring';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 95
            },
            {
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 95
            },
            {
                headerName: 'Farmer',
                field: 'farmer',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerGroup: 'Loan',
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerGroup: 'Loan',
                //headerGroupShow: 'closed',
                headerName: 'Dist',
                field: 'dist',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
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
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            }
        ];

        $scope.getModel = function(){
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
            }
        }

        $scope.hideIcons = function () {
            $scope.icons = !$scope.icons;
            if ($scope.icons) {
                $scope.gridOptions.pinnedColumnCount = $scope.pin - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pin;
            }
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.onNewCols();
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

        $scope.toggleHorizontal = function () {
            $scope.horizontal = !$scope.horizontal;
            if ($scope.horizontal) {
                $scope.pin = 0;
            } else {
                if ($scope.icons) {
                    $scope.pin = $scope.pins - 1;
                } else {
                    $scope.pin = $scope.pins;
                }
            }
            $scope.gridOptions.pinnedColumnCount = $scope.pin;
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
            pinnedColumnCount: $scope.pin,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true
        };

        $scope.reduced = CustomerBudgetFactory.getData(Loans);
        console.log('reduced', $scope.reduced);

        $scope.pins = 8;
        $scope.pin = 0;
        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'season', sort: 'asc'},
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'farmer', sort: 'asc'},
            {field: 'applicant', sort: 'asc'},
            {field: 'dist', sort: 'asc'},
            {field: 'loantype_abr', sort: 'asc'},
        ];
        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();

        if ($scope.gridOptions.api) {
            $scope.gridOptions.api.hideColumns(['total_percent_budget', 'total_percent_spent', 'total_percent_remaining'], true);
            $scope.gridOptions.api.onNewRows();
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.icons = false;
        $scope.dollarsPercent = true;
        $scope.detail = true;
    }

})();
