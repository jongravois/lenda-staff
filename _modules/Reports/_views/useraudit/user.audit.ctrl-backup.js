(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('UserAuditController', UserAuditController);

    UserAuditController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory'];

    function UserAuditController($scope, $http, $filter, $timeout, AppFactory) {
        $scope.AppFactory = AppFactory;

        var columnDefs = [
            {
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
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerGroup: 'Crop',
                headerName: 'Year',
                //headerGroupShow: 'closed',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
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
                width: 90
            },
            {
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
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
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'Date',
                field: 'audit_date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.audit_date).format('MM/DD/YYYY');
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'Time',
                field: 'audit_time',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'User',
                field: 'audit_user',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'Activity',
                field: 'audit_activity',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 300
            }
        ];

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
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            pinnedColumnCount: $scope.pins,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false
        };

        $http.get("json/user.audit.json")
            .then(function (res) {
                $scope.pins = 7;
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
                $scope.tools = false;
            });
    }

})();
