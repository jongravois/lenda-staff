(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('RequiredController', RequiredController);

    RequiredController.$inject = ['$rootScope', '$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'Trackers', 'RequiredFactory', 'hotkeys'];

    function RequiredController($rootScope, $scope, $http, $filter, $timeout, AppFactory, Loans, Trackers, RequiredFactory, hotkeys) {
        $scope.AppFactory = AppFactory;
        //console.log('RequiredController.Trackers', Trackers);

        $scope.reduced = RequiredFactory.getData(Loans, Trackers);
        //console.log('RequiredController.reduced', $scope.reduced);

        $scope.pct_success = 60;
        $scope.pct_warning = 10;
        $scope.pct_danger = 30;

        var sort = [
            {field: 'report', sort: 'asc'},
            {field: 'loc_abr', sort: 'asc'},
            {field: 'name', sort: 'asc'}
        ];

        var hide = true;

        var columnDefs = [
            {
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                width: 85
            },
            {
                headerTooltip: 'Location',
                headerName: 'Location',
                field: 'location',
                cellClass: 'text-left',
                width: 100,
                hide: hide
            },
            {
                headerName: 'Loc',
                field: 'loc_abr',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Analyst',
                headerName: 'Analyst',
                field: 'name',
                cellClass: 'text-left',
                width: 150
            },
            {
                headerName: 'Analyst',
                field: 'nick',
                cellClass: 'text-center',
                width: 80,
                hide: hide
            },
            {
                headerName: 'Report',
                field: 'report',
                cellClass: 'text-left',
                width: 150
            },
            {
                headerName: 'Posted',
                field: 'made_required',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.made_required).format('MM/DD/YYYY');
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Updated',
                field: 'updated_at',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.updated_at).format('MM/DD/YYYY');
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Last',
                field: 'last_acknowledged',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.last_acknowledged).format('MM/DD/YYYY');
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Active',
                field: 'is_active',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.is_active == 1) {
                        return "<span style='color: black' class='glyphicons glyphicons-ok-2'></span>";
                    } else {
                        return "<span style='color: gray'></span>";
                    }
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Admin',
                field: 'is_admin',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.is_admin == 1) {
                        return "<span style='color: black' class='glyphicons glyphicons-ok-2'></span>";
                    } else {
                        return "<span style='color: gray'></span>";
                    }
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Approver',
                field: 'is_approver',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.is_approver == 1) {
                        return "<span style='color: black' class='glyphicons glyphicons-ok-2'></span>";
                    } else {
                        return "<span style='color: gray'></span>";
                    }
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'Manager',
                field: 'is_manager',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.is_manager == 1) {
                        return "<span style='color: black' class='glyphicons glyphicons-ok-2'></span>";
                    } else {
                        return "<span style='color: gray'></span>";
                    }
                },
                width: 80,
                hide: hide
            },
            {
                headerName: 'DTW',
                field: 'days_to_warn',
                cellClass: 'text-right',
                width: 80,
                hide: hide
            },
            {
                headerName: 'DTA',
                field: 'days_to_alert',
                cellClass: 'text-right',
                width: 80,
                hide: hide
            },
            {
                headerName: 'Warned',
                field: 'cnt_warned',
                cellClass: 'text-right',
                width: 80,
                hide: false
            },
            {
                headerName: 'Graph Warnings Data',
                field: 'plot_cnt_warned',
                cellClass: 'text-left',
                cellRenderer: function (params) {
                    return params.data.plot_cnt_warned;
                },
                width: 375,
                hide: hide
            },
            {
                headerName: 'Alerted',
                field: 'cnt_alerted',
                cellClass: 'text-right',
                width: 80,
                hide: false
            },
            {
                headerName: 'Graph Alarms Data',
                field: 'plot_cnt_alerted',
                cellClass: 'text-left',
                cellRenderer: function (params) {
                    return params.data.plot_cnt_alerted;
                },
                width: 375,
                hide: hide
            },
            {
                headerName: 'Num Days',
                field: 'total_days',
                cellClass: 'text-right',
                width: 80,
                hide: hide
            },
            {
                headerName: 'Mean',
                field: 'mean_response',
                cellClass: 'text-right',
                width: 80,
                hide: false
            },
            {
                headerName: 'Graph Mean Response Data',
                field: 'plot_mean_response',
                cellClass: 'text-left',
                cellRenderer: function (params) {
                    return params.data.plot_mean_response;
                },
                width: 375,
                hide: hide
            },
            {
                headerName: 'Days',
                field: 'days_since_last_acknowledged',
                cellClass: 'text-right',
                width: 80,
                hide: false
            },
            {
                headerName: 'Graph Current Response Data',
                field: 'plot_days',
                cellClass: 'text-left',
                cellRenderer: function (params) {
                    //console.log('params', params);
                    return params.data.plot_days;
                },
                width: 375,
                hide: false
            },
        ];

        $scope.email = function(){
          alert('E-mail not available');
        }

        $scope.excel = function(){
            alert('Excel not available');
        }

        $scope.help = function(){
            $scope.help = !$scope.help;
        }

        $scope.print = function(){
            alert('Print not available');
        }

        $scope.pdf = function(){
            alert('PDF not available');
        }

        $scope.showToolPanel = function () {
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
        }

        hotkeys.bindTo($scope).add({
            combo: 'fn+c',
            description: 'Opens Angular Grid Control Panel',
            callback: $scope.showToolPanel
        });

        hotkeys.bindTo($scope).add({
            combo: 'fn+d',
            description: 'PDF Document of Report',
            callback: $scope.pdf
        });

        hotkeys.bindTo($scope).add({
            combo: 'fn+e',
            description: 'Send Report by Email',
            callback: $scope.email
        });

        hotkeys.bindTo($scope).add({
            combo: 'fn+h',
            description: 'Help',
            callback: $scope.help
        });

        hotkeys.bindTo($scope).add({
            combo: 'fn+p',
            description: 'Send Report to Printer',
            callback: $scope.print
        });

        hotkeys.bindTo($scope).add({
            combo: 'fn+x',
            description: 'Send Report to Excel',
            callback: $scope.excel
        });

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

        $scope.gridOptions.rowData = $scope.reduced;

        console.log('gridOptions', $scope.gridOptions);
        console.log('reduced', $scope.reduced);
        console.log('loans', Loans);

        if ($scope.gridOptions.rowData.length < 20) {
            $scope.gridHeight = (350).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }

        $scope.help = false;
    }

})();

