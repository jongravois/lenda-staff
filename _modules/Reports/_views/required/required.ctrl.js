(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('RequiredController', RequiredController);

    RequiredController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'RequiredFactory'];

    function RequiredController($scope, $http, $filter, $timeout, AppFactory, Loans, RequiredFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

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
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerName: 'Report',
                field: 'report',
                cellClass: 'text-left',
                cellRenderer: function (params) {
                    if (params.data.report == 'actdet') {
                        return 'Account Detail';
                    } else if (params.data.report == 'actdet') {
                            return 'Account Detail';
                    } else if (params.data.report == 'accrecon') {
                        return 'Account Reconciliation';
                    } else if (params.data.report == 'cashflow') {
                        return 'Cashflow/Exposure';
                    } else if (params.data.report == 'actsum') {
                        return 'Account Summary';
                    } else if (params.data.report == 'fmrhis') {
                        return 'Loan History';
                    } else if (params.data.report == 'crpmix') {
                        return 'Crop Mix';
                    } else if (params.data.report == 'comapp') {
                        return 'Committee Approval';
                    } else if (params.data.report == 'comcom') {
                        return 'Committee Comments';
                    } else if (params.data.report == 'lnman') {
                        return 'Loan Management';
                    } else if (params.data.report == 'required') {
                        return 'Required';
                    } else if (params.data.report == 'usradt') {
                        return 'Audit Trail';
                    } else {
                        return 'n/a';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                // headerGroup: 'Last',
                headerName: 'Viewed',
                field: 'viewed',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.viewed) {
                        return moment(params.data.viewed).format('MM/DD/YYYY');
                    } else {
                        return '';
                    }
                },
                hide: true,
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerName: 'Days',
                field: 'days',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    var a = moment(params.data.updated, "YYYY-MM-DD");
                    if (params.data.viewed){
                        var b = moment(params.data.viewed, "YYYY-MM-DD");
                    } else {
                        var now = moment();
                        var b = moment(now, "YYYY-MM-DD");
                    }
                    var d = b.diff(a, 'days');
                    if (d >= 0) {
                        return b.diff(a, 'days');
                    } else {
                        return '';
                    }
                },
                hide: true,
                suppressSorting: true,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerName: 'Efficiency',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/progress_bar.html',
                width: 590
            }
        ];

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
            enableSorting: true
        };

        $scope.reduced = RequiredFactory.getData(Loans);
        console.log('reduced', $scope.reduced);

        $scope.pins = 0;
        $scope.pin = 0;
        var sort = [
            {field: 'user', sort: 'asc'}
        ];
        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();

        if ($scope.gridOptions.api) {
            $scope.gridOptions.api.onNewRows();
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.pct_success = 60;
        $scope.pct_warning = 10;
        $scope.pct_danger  = 30;
    }

})();

