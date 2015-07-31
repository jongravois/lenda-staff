(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeCommentController', CommitteeCommentController);

    CommitteeCommentController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory'];

    function CommitteeCommentController($scope, $http, $filter, $timeout, AppFactory) {
        $scope.AppFactory = AppFactory;

        var columnDefs = [
            {
                headerName: 'Member',
                field: 'committee_member',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerName: 'Analyst',
                field: 'analyst',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 150
            },
            {
                headerGroup: 'Crop',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loan_type',
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
                cellRenderer: function(params) {
                    if (params.data.loan_addendum){
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
                headerGroup: 'Loan',
                headerName: 'Dist',
                field: 'dist',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: '',
                headerName: 'Vote',
                field: 'committee_vote',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    if (params.data.committee_vote){
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-up" style="color:#007700;"></span></div>';
                    } else {
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-down"  style="color:#770000;"></span></div>';
                    }
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Class',
                field: 'class',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerName: 'Log',
                field: 'committee_log',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 220
            }
        ];

        $scope.showToolPanel = function(){
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
            showToolPanel: false
        };

        $http.get("json/committee.json")
            .then(function (res) {
                $scope.gridOptions.rowData = res.data;
                $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
                $scope.gridOptions.api.onNewRows();
                var sort = [
                    {field: 'analyst', sort: 'asc'},
                    {field: 'committee_member', sort: 'asc'},
                ];
                $scope.gridOptions.api.setSortModel(sort);
                $scope.tools = false;
            });
    }

})();
