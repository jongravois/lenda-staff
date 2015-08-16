(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('RequiredController', RequiredController);

    RequiredController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function RequiredController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.pct_success = 60;
        $scope.pct_warning = 10;
        $scope.pct_danger  = 30;

        var sort = [
            {field: 'analyst_abr', sort: 'asc'}
        ];

        var columnDefs = [
            {
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
                headerName: 'Loc',
                valueGetter: 'data.location.loc_abr',
                cellClass: 'text-center',
                width: 70
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
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                width: 150
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
                        return '';
                    }
                },
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
                width: 70
            },
            {
                headerName: 'Efficiency',
                cellClass: 'text-center',
                suppressSorting: true,
                //templateUrl: '_modules/Reports/_views/_partials/progress_bar.html',
                width: 590
            }
        ];

        $scope.showToolPanel = function () {
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
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
        if ($scope.gridOptions.rowData.length < 20){
            $scope.gridHeight = (350).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }
    }

})();

