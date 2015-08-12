(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ActivitySummaryController', ActivitySummaryController);

    ActivitySummaryController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function ActivitySummaryController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.icons = false;
        $scope.tools = false;

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
                headerTooltip: 'Icons',
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165
            },
            {
                headerTooltip: 'Region',
                headerName: 'Region',
                valueGetter: 'data.location.regions.region',
                cellClass: 'text-center',
                width: 85
            },
            {
                headerTooltip: 'Location',
                headerName: 'Location',
                valueGetter: 'data.location.location',
                cellClass: 'text-left',
                width: 100,
                hide: true
            },
            {
                headerTooltip: 'Location',
                headerName: 'Loc',
                valueGetter: 'data.location.loc_abr',
                cellClass: 'text-center',
                width: 70
            },
            {
                headerTooltip: 'Crop Year',
                headerGroup: 'Crop',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 85,
                filter: 'number'
            },
            {
                headerTooltip: 'Crop Season',
                headerGroup: 'Crop',
                headerGroupShow: 'closed',
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
                headerTooltip: 'Loan Analyst',
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Farmer',
                headerName: 'Farmer',
                valueGetter: 'data.farmer.farmer',
                cellClass: 'text-left',
                width: 120
            },
            {
                headerTooltip: 'Farmer',
                headerName: 'Nickname',
                valueGetter: 'data.farmer.nick',
                cellClass: 'text-left',
                width: 150,
                hide: true
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                valueGetter: 'data.applicant.applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
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
                headerName: 'Dist',
                valueGetter: 'data.distributor.distributor',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Loan Origin Date',
                headerGroup: 'Loan',
                headerGroupShow: 'closed',
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
                headerGroup: 'Loan',
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
                width: 150
            },
            {
                headerTooltip: 'Status',
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerTooltip: 'ARM',
                headerGroup: 'ARM',
                headerName: 'Commitment',
                valueGetter: 'data.financials.commit_arm',
                cellClass: function(params) {
                    return (params.data.financials.commit_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.financials.commit_arm, 0);
                },
                width: 110
            },
            {
                headerTooltip: 'Loan Rate',
                headerGroup: 'ARM',
                headerGroupShow: 'closed',
                headerName: 'Rate',
                valueGetter: 'data.financials.int_percent_arm',
                cellClass: function(params) {
                    return (params.data.financials.int_percent_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexPercent')(params.data.financials.int_percent_arm, 2);
                },
                width: 100
            },
            {
                headerTooltip: 'Fees',
                headerGroup: 'ARM',
                headerGroupShow: 'closed',
                headerName: 'Fees',
                valueGetter: 'data.financials.fee_total',
                cellClass: function(params) {
                    return (params.data.financials.fee_total ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.financials.fee_total, 0);
                },
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

        $scope.hideIcons = function(){
            $scope.icons = !$scope.icons;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.hideColumns(['status_left'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.showToolPanel($scope.tools);
            }
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
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
                    api.setSortModel($scope.sortKeys);
                });
            }
        };
        $scope.gridOptions.rowData = $scope.loans;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
    }

})();