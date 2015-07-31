/**
 * Update ag-grid css gray background for rows selected
 * .ag-fresh .ag-row-selected {background-color: #dedede;}
 */
(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ActivityDetailController', ActivityDetailController);

    ActivityDetailController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory'];

    function ActivityDetailController($scope, $http, $filter, $timeout, AppFactory) {
        $scope.AppFactory = AppFactory;

        var columnDefs = [
            {
                headerTooltip: 'Icons',
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165,
                hide: false
            },
            {
                headerTooltip: 'Region',
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.region.toUpperCase() === 'N'){
                        return 'North';
                    } else if (params.data.region.toUpperCase() === 'S'){
                        return 'South';
                    } else if (params.data.region.toUpperCase() === 'E'){
                        return 'East';
                    } else if (params.data.region.toUpperCase() === 'W'){
                        return 'West';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85
            },
            {
                headerTooltip: 'Location',
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerTooltip: 'Crop Year',
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
                headerTooltip: 'Crop Season',
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'season',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.season.toUpperCase() == 'F'){
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
                headerTooltip: 'Loan Analyst',
                headerName: 'Analyst',
                field: 'analyst',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerTooltip: 'Farmer',
                headerName: 'Farmer',
                field: 'farmer',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Loan Type',
                headerGroup: 'Loan',
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'loan_type',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Distributor',
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
                headerTooltip: 'Loan Origin Date',
                headerGroup: 'Loan',
                headerName: 'Orig Dt',
                field: 'orig_date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.orig_date).format('MM/DD/YYYY');
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Loan Due Date',
                headerGroup: 'Loan',
                headerName: 'Due Dt',
                field: 'due_date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.past_due == 1) {
                        return "<span style='color: orange'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                    }
                    else if (params.data.past_due == 2) {
                        return "<span style='color: #ee0000'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                    } else {
                        return "<span style='color: black'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Status',
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerTooltip: 'Quickbooks Transaction Date',
                headerGroup: 'Quickbooks',
                //headerGroupShow: 'closed',
                headerName: 'Date',
                field: 'qb_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.qb_date).format('MM/DD/YYYY');
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Quickbooks Transaction Type',
                headerGroup: 'Quickbooks',
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'qb_type',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Quickbooks Transaction Category',
                headerGroup: 'Quickbooks',
                //headerGroupShow: 'closed',
                headerName: 'Category',
                field: 'qb_cat',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width:110
            },
            {
                headerTooltip: 'Quickbooks Transaction Amount',
                headerGroup: 'Quickbooks',
                headerName: 'Amount',
                field: 'qb_amount',
                cellClass: function(params) {
                    return (params.data.qb_amount ? 'text-right': 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.qb_amount, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            }
        ];

        $scope.getModel = function(){
            console.log($scope.gridOptions.api.getModel());
            return $scope.gridOptions.api.getModel();
        }

        $scope.hideIcons = function(){
            $scope.icons = !$scope.icons;
            if ($scope.icons){
                $scope.gridOptions.pinnedColumnCount = $scope.pins - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pin;
            }
            $scope.origDue = !$scope.origDue;
            $scope.toggleOrigDue();
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
            $scope.gridOptions.api.showToolPanel(api.isToolPanelShowing());
        }

        $scope.toggleHorizontal = function(){
            $scope.horizontal = !$scope.horizontal;
            if ($scope.horizontal){
                $scope.pin = 0;
            } else {
                if ($scope.icons) {
                    $scope.pin = $scope.pins - 1;
                } else {
                    $scope.pin = $scope.pins;
                }
            }
            $scope.gridOptions.pinnedColumnCount = $scope.pin;
            $scope.origDue = !$scope.origDue;
            $scope.toggleOrigDue();
        }

        $scope.toggleOrigDue = function(){
            $scope.origDue = !$scope.origDue;
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['orig_date'], $scope.origDue);
            $scope.gridOptions.api.hideColumns(['due_date'], !$scope.origDue);
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            pinnedColumnCount: $scope.pin,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false
        };

        $http.get("json/activity.detail.json")
            .then(function (res) {
                $scope.pins = 8;
                $scope.pin = 0;
                $scope.gridOptions.rowData = res.data;
                $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
                $scope.gridOptions.api.hideColumns(['due_date'], true);
                $scope.gridOptions.api.onNewRows();
                $scope.sortKeys = [
                    {field: 'region', sort: 'asc'},
                    {field: 'location', sort: 'asc'},
                    {field: 'crop_year', sort: 'asc'},
                    {field: 'season', sort: 'asc'},
                    {field: 'analyst', sort: 'asc'},
                    {field: 'farmer', sort: 'asc'},
                    {field: 'applicant', sort: 'asc'},
                    {field: 'dist', sort: 'asc'},
                    {field: 'loan_type', sort: 'asc'},
                    {field: 'qb_date', sort: 'asc'}
                ];
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
                console.log($scope.gridOptions);
                $scope.icons = false;
                $scope.tools = false;
                $scope.origDue = false;
                $scope.detail = false;
                $scope.horizontal = false;
            });
    }

})();
