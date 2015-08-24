(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeApprovalController', CommitteeApprovalController);

    CommitteeApprovalController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CommitteeApprovalFactory', 'hotkeys'];

    function CommitteeApprovalController($scope, $http, $filter, $timeout, AppFactory, Loans, CommitteeApprovalFactory, hotkeys) {
        $scope.AppFactory = AppFactory;

        $scope.icons = false;
        $scope.tools = false;

        var sort = [
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'committee_member', sort: 'asc'},
        ];

        var columnDefs = [
            {
                headerTooltip: 'Committee Member',
                headerName: 'Member',
                field: 'committee_member',
                cellClass: 'text-left',
                width: 150
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
                width: 100
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                width: 150
            },
            {
                headerGroup: 'Crop',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 85,
                filter: 'number'
            },
            {
                headerGroup: 'Crop',
                headerName: 'Season',
                headerGroupShow: 'closed',
                field: 'full_season',
                cellClass: 'text-center',
                width: 95
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
                headerTooltip: 'Loan Addendum',
                headerGroup: 'Loan',
                headerGroupShow: 'closed',
                headerName: 'Addendum',
                field: 'loan_addendum',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.loan_addendum) {
                        return "<span style='color:#007700'>+" + moment(params.data.loan_date).format('MM/DD/YYYY') + "</span>";
                    } else {
                        return "<span style='color:#000000'>&nbsp;" + moment(params.data.loan_date).format('MM/DD/YYYY') + "</span>";
                    }
                },
                width: 100
            },
            {
                headerTooltip: 'Distributor',
                headerGroup: 'Loan',
                headerGroupShow: 'closed',
                headerName: 'Dist',
                field: 'dist',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-left',
                width: 150
            },
            {
                headerTooltip: 'Vote',
                headerGroup: '',
                headerName: 'Vote',
                field: 'vote',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.vote == 1) {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-up" style="color:#007700;"></span></div>';
                    } else if (params.data.vote == 0) {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-down"  style="color:#770000;"></span></div>';
                    } else {
                        return '<div style="text-align:center !important;"> - </div>';
                    }
                },
                width: 80
            },
            {
                headerTooltip: 'Class',
                headerName: 'Class',
                field: 'account_classification',
                cellClass: 'text-center',
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

        $scope.reduced = CommitteeApprovalFactory.getData(Loans);
        //console.log('CommitteeApprovalController reduced', $scope.reduced);

        $scope.gridOptions.rowData = $scope.reduced;
        try {
            if ($scope.gridOptions.rowData.length < 20) {
                $scope.gridHeight = (350).toString();
            } else {
                $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
            }
        } catch (err) {
            console.error('ERROR', err.name + ': "' + err.message);
        } finally {
            $scope.gridHeight = (350).toString();
        }

        $scope.help = false;

    }

})();
