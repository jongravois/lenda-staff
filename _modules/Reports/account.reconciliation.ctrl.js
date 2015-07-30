(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('AccountReconciliationController', AccountReconciliationController);

    AccountReconciliationController.$inject = ['$scope', '$http', '$filter', 'AppFactory'];

    function AccountReconciliationController($scope, $http, $filter, AppFactory) {
        $scope.AppFactory = AppFactory;

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
                headerTooltip: 'Region',
                headerName: 'Reg',
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
                headerTooltip: 'Season',
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
                headerTooltip: 'Analyst',
                headerName: 'Analyst',
                field: 'analyst',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
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
                headerTooltip: 'Loan Date',
                headerGroup: 'Loan',
                field: 'loan_date',
                headerName: 'Date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.loan_date).format('MM/DD/YYYY');
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
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerTooltip: 'Commitment ARM',
                headerGroup: 'Commitment',
                headerName: 'ARM',
                field: 'commit_arm',
                cellClass: function(params) {
                    return (params.data.commit_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.commit_arm, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Commitment Dist',
                headerGroup: 'Commitment',
                headerName: 'Dist',
                field: 'commit_dist',
                cellClass: function(params) {
                    return (params.data.commit_dist ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.commit_dist, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Quickbooks Account Balance',
                headerGroup: 'Quickbooks',
                headerName: 'Balance',
                field: 'qb_balance',
                cellClass: function(params) {
                    return (params.data.qb_balance ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.qb_balance, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Classification',
                headerName: 'Class',
                field: 'class',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerName: 'Acct',
                field: 'status_right',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.right.html',
                width: 80
            }
        ];

        $scope.hideIcons = function(){
            $scope.icons = !$scope.icons;
            if ($scope.icons){
                $scope.gridOptions.pinnedColumnCount = $scope.pins - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pins;
            }
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
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
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right', 'percent_spent', 'percent_remaining'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            ready : function(api) {
                $timeout(function() {
                    api.sizeColumnsToFit();
                });
            },
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
                ];
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
                $scope.icons = false;
                $scope.tools = false;
                $scope.horizontal = false;
            });
    }

})();
