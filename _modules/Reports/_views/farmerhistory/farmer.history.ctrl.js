(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('FarmerHistoryController', FarmerHistoryController);

    FarmerHistoryController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'FarmerHistoryFactory'];

    function FarmerHistoryController($scope, $http, $filter, $timeout, AppFactory, Loans, FarmerHistoryFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

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
                headerGroup: 'Crop',
                headerName: 'Year',
                headerGroupShow: 'closed',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85,
                filter: 'number'
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
                width: 95
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
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'loantype_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
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
                headerGroup: 'Loan',
                field: 'loan_date',
                headerName: 'Date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.loan_date).format('MM/DD/YYYY');
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
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
                headerGroup: 'Commitment',
                headerName: 'ARM',
                field: 'commit_arm',
                cellClass: function (params) {
                    return (params.data.commit_arm ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.commit_arm, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: 'Commitment',
                headerName: 'Dist',
                field: 'commit_dist',
                cellClass: function (params) {
                    return (params.data.commit_dist ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.commit_dist, 0);
                },
                // template: '<span ng-class="{gtZero(params.data.commit_dist)}">params.data.commit_dist</span>',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: '',
                headerName: 'Fees',
                field: 'fee_total',
                cellClass: function (params) {
                    return (params.data.fee_total ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fee_total, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            },
            {
                headerGroup: 'Rate',
                headerName: 'ARM',
                field: 'int_percent_arm',
                cellClass: function (params) {
                    return (params.data.int_percent_arm ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.int_percent_arm, 2);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerGroup: 'Rate',
                headerName: 'Dist',
                field: 'int_percent_dist',
                cellClass: function (params) {
                    return (params.data.int_percent_dist ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.int_percent_dist, 2);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            }
        ];

        $scope.getModel = function(){
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
            }
        }

        $scope.hideIcons = function(){
            $scope.icons = !$scope.icons;
            if ($scope.icons){
                $scope.gridOptions.pinnedColumnCount = $scope.pin - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pin;
            }
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.onNewCols();
                $scope.gridOptions.api.hideColumns(['status_left', 'status'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
        }

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.showToolPanel($scope.tools);
            }
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
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.onNewCols();
                $scope.gridOptions.api.hideColumns(['status_left', 'status'], $scope.icons);
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
            }
        }

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            pinnedColumnCount: $scope.pin,
            groupHeaders: true,
            angularCompileRows: true,
            angularCompileFilters: true,
            angularCompileHeaders: true,
            enableColResize: true,
            enableFilter: true,
            enableSorting: true,
            showToolPanel: false
        };

        $scope.reduced = FarmerHistoryFactory.getData(Loans);
        console.log('reduced', $scope.reduced);

        $scope.pins = 8;
        $scope.pin = 0;
        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'season', sort: 'asc'},
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'farmer', sort: 'asc'},
            {field: 'applicant', sort: 'asc'},
            {field: 'dist', sort: 'asc'},
            {field: 'loantype_abr', sort: 'asc'},
        ];
        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();

        if ($scope.gridOptions.api) {
            $scope.gridOptions.api.onNewRows();
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }

        $scope.icons = false;
        $scope.tools = false;
        $scope.horizontal = false;
    }

})();
