(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('AccountReconciliationController', AccountReconciliationController);

    AccountReconciliationController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'hotkeys'];

    function AccountReconciliationController($scope, $http, $filter, $timeout, AppFactory, Loans, hotkeys) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

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
                cellClass: function(params) {
                    return (params.data.financials.commit_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.financials.commit_arm, 0);
                },
                width: 110
            },
            {
                headerGroup: 'ARM',
                headerGroupShow: 'open',
                headerName: 'Fees',
                valueGetter: 'data.financials.fee_total',
                cellClass: function(params) {
                    return (params.data.financials.fee_total ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
                    return $filter('flexCurrency')(params.data.financials.fee_total, 0);
                },
                width: 100
            },
            {
                headerGroup: 'ARM',
                headerGroupShow: 'open',
                headerName: 'Rate',
                valueGetter: 'data.fins.int_percent_arm',
                cellClass: function(params) {
                    return (params.data.fins.int_percent_arm ? 'text-right': 'text-center');
                },
                cellRenderer: function(params) {
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
                headerTooltip: 'Accounting Account Balance',
                headerGroup: 'Accounting',
                headerName: 'Balance',
                field: 'qb_balance',
                cellClass: function (params) {
                    return (params.data.qb_balance ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.qb_balance, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Acct',
                field: 'status_right',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.right.html',
                width: 80
            },
            {
                headerTooltip: 'Classification',
                headerName: 'Class',
                field: 'account_classification',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            }
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

        $scope.gridOptions.rowData = $scope.loans;
        if ($scope.gridOptions.rowData.length < 20){
            $scope.gridHeight = (350).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }

        $scope.help = false;
    }

})();