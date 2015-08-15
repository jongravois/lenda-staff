(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('UserAuditController', UserAuditController);

    UserAuditController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'UserAuditFactory'];

    function UserAuditController($scope, $http, $filter, $timeout, AppFactory, Loans, UserAuditFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.tools = false;

        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'full_season', sort: 'asc'},
            //{field: 'analyst_abr', sort: 'asc'},
            {field: 'farmer.farmer', sort: 'asc'},
            {field: 'applicant', sort: 'asc'},
            //{field: 'distributor', sort: 'asc'},
            {field: 'loantype_abr', sort: 'asc'}
        ];

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
                valueGetter: 'data.location.location',
                cellClass: 'text-left',
                width: 100,
                hide: true
            },
            {
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                width: 70
            },
            {
                headerGroup: 'Crop',
                headerName: 'Year',
                //headerGroupShow: 'closed',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 90
            },
            {
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'full_season',
                cellClass: 'text-center',
                width: 90
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
                width: 90
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
                headerGroup: 'Loan',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'Date',
                field: 'audit_date',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.audit_date).format("MM/DD/YYYY");
                },
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'Time',
                field: 'audit_time',
                cellClass: 'text-center',
                cellRenderer: function(params) {
                    return moment(params.data.audit_time).format("HH:MM:SS");
                },
                width: 90
            },
            {
                headerGroup: "Audit",
                headerName: 'User',
                field: 'audit_user',
                cellClass: 'text-center',
                width: 120
            },
            {
                headerGroup: "Audit",
                headerName: 'Activity',
                field: 'audit_activity',
                cellClass: 'text-left',
                width: 300
            }
        ];

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
            pinnedColumnCount: $scope.pins,
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

        $scope.reduced = UserAuditFactory.getData(Loans);
        //console.log('reduced', $scope.reduced);

        $scope.gridOptions.rowData = $scope.reduced;
        if ($scope.gridOptions.rowData.length < 20){
            $scope.gridHeight = (15 * 30).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }
    }

})();