(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeApprovalController', CommitteeApprovalController);

    CommitteeApprovalController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CommitteeApprovalFactory'];

    function CommitteeApprovalController($scope, $http, $filter, $timeout, AppFactory, Loans, CommitteeApprovalFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.icons = false;
        $scope.tools = false;

        var sort = [
            {field: 'loan_id', sort: 'asc'},
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'committee_member', sort: 'asc'},
        ];

        var columnDefs = [
            {
                headerTooltip: 'Committee Member',
                headerName: 'Member',
                field: 'committee_member',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerTooltip: 'Loan Analyst',
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerTooltip: 'Crop Year',
                headerGroup: 'Crop',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100,
                filter: 'number'
            },
            {
                headerTooltip: 'Loan Type',
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Loan Addendum',
                headerGroup: 'Loan',
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
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Distributor',
                headerGroup: 'Loan',
                headerName: 'Dist',
                field: 'dist',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Vote',
                headerGroup: '',
                headerName: 'Vote',
                field: 'committee_vote',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.committee_vote == 1) {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-up" style="color:#007700;"></span></div>';
                    } else if (params.data.committee_vote == 0) {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-down"  style="color:#770000;"></span></div>';
                    } else {
                        return '<div style="text-align:center !important;"> - </div>';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerTooltip: 'Class',
                headerName: 'Class',
                field: 'account_classification',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            }
        ];

        $scope.printState = function () {
            var state = $scope.gridOptions.api.getColumnState();
            console.log(state);
        };

        var savedState;

        $scope.saveState = function () {
            savedState = $scope.gridOptions.api.getColumnState();
            console.log('column state saved');
        };

        $scope.restoreState = function () {
            $scope.gridOptions.api.setColumnState(savedState);
            console.log('column state restored');
        }

        $scope.getModel = function(){
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
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

        $scope.reduced = CommitteeApprovalFactory.getData(Loans);
        console.log('CommitteeApprovalController reduced', $scope.reduced);

        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
    }

})();
