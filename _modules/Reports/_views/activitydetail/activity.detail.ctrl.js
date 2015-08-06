(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ActivityDetailController', ActivityDetailController);

    ActivityDetailController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'ActivityDetailFactory'];

    function ActivityDetailController($scope, $http, $filter, $timeout, AppFactory, Loans, ActivityDetailFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        var columnDefs = [
            {
                headerTooltip: 'Icons',
                headerName: 'Indicators',
                field: 'status_left',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icons.left.html',
                width: 165,
                hide: false
            },
            {
                headerTooltip: 'Region',
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return params.data.region;
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85
            },
            {
                headerTooltip: 'Location',
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 70
            },
            {
                headerTooltip: 'Crop Year',
                headerGroup: 'Crop',
                //headerGroupShow: 'closed',
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85,
                filter: 'number'
            },
            {
                headerTooltip: 'Crop Season',
                headerGroup: 'Crop',
                headerName: 'Season',
                field: 'season',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.season.toUpperCase() == 'F') {
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
                headerTooltip: 'Loan Analyst',
                headerName: 'Analyst',
                field: 'analyst_abr',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 90
            },
            {
                headerTooltip: 'Farmer',
                headerName: 'Farmer',
                field: 'farmer',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Applicant',
                headerName: 'Applicant',
                field: 'applicant',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 120
            },
            {
                headerTooltip: 'Loan Type',
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
                headerTooltip: 'Distributor',
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
                headerTooltip: 'Loan Origin Date',
                headerGroup: 'Loan',
                headerName: 'Orig Dt',
                field: 'orig_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    return moment(params.data.orig_date).format('MM/DD/YYYY');
                },
                hide: true,
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Loan Due Date',
                headerGroup: 'Loan',
                headerName: 'Due Dt',
                field: 'due_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.past_due == 1) {
                        //Deprecated
                        //return "<span style='color: orange'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                        return "<span style='color: orange'>" + params.data.due_date + "</span>";
                    }
                    else if (params.data.past_due == 2) {
                        //Deprecated
                        //return "<span style='color: #ee0000'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                        return "<span style='color: #ee0000'>" + params.data.due_date + "</span>";
                    } else {
                        //Deprecated
                        //return "<span style='color: black'>" + moment(params.data.due_date).format('MM/DD/YYYY') + "</span>";
                        return "<span style='color: black'>" + params.data.due_date + "</span>";
                    }
                },
                hide: false,
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Agency',
                headerGroup: '',
                headerName: 'Agency',
                field: 'agency',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Status',
                headerName: 'Status',
                field: 'status',
                cellClass: 'text-center',
                suppressSorting: true,
                suppressSizeToFit: false,
                templateUrl: '_modules/Reports/_views/_partials/status.icon.html',
                width: 70
            },
            {
                headerTooltip: 'Accounting Transaction Date',
                headerGroup: 'Accounting',
                //headerGroupShow: 'closed',
                headerName: 'Date',
                field: 'qb_date',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    //return moment(params.data.qb_date).format('MM/DD/YYYY');
                    return params.data.qb_date;
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Accounting Transaction Type',
                headerGroup: 'Accounting',
                //headerGroupShow: 'closed',
                headerName: 'Type',
                field: 'qb_type',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 80
            },
            {
                headerTooltip: 'Accounting Transaction Category',
                headerGroup: 'Accounting',
                //headerGroupShow: 'closed',
                headerName: 'Category',
                field: 'qb_cat',
                cellClass: 'text-left',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 110
            },
            {
                headerTooltip: 'Accounting Transaction Amount',
                headerGroup: 'Accounting',
                headerName: 'Amount',
                field: 'qb_amount',
                cellClass: function (params) {
                    return (params.data.qb_amount ? 'text-right' : 'text-center');
                },
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.qb_amount, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 100
            }
        ];

        $scope.hideIcons = function () {
            $scope.icons = !$scope.icons;
            if ($scope.icons) {
                $scope.gridOptions.pinnedColumnCount = $scope.pins - 1;
            } else {
                $scope.gridOptions.pinnedColumnCount = $scope.pin;
            }
            $scope.origDue = !$scope.origDue;
            $scope.toggleOrigDue();
        }

        $scope.toggleHorizontal = function () {
            $scope.horizontal = !$scope.horizontal;
            if ($scope.horizontal) {
                $scope.pin = 0;
            } else {
                if ($scope.icons) {
                    $scope.pin = $scope.pins - 1;
                } else {
                    $scope.pin = $scope.pins;
                }
            }
            $scope.gridOptions.pinnedColumnCount = $scope.pin;
            $scope.origDue = !$scope.origDue;
            $scope.toggleOrigDue();
        }

        $scope.toggleOrigDue = function () {
            $scope.origDue = !$scope.origDue;
            if ($scope.gridOptions.api) {
                $scope.gridOptions.api.hideColumns(['orig_date'], $scope.origDue);
                $scope.gridOptions.api.hideColumns(['due_date'], !$scope.origDue);
                $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
                $scope.gridOptions.api.onNewCols();
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

        $scope.reduced = ActivityDetailFactory.getData(Loans);
        console.log('reduced', $scope.reduced);

        $scope.pins = 8;
        $scope.pin = 0;
        $scope.icons = false;
        $scope.tools = false;
        $scope.origDue = false;
        $scope.detail = false;
        $scope.horizontal = false;
        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'season', sort: 'asc'},
            {field: 'analyst_abr', sort: 'asc'},
            {field: 'farmer', sort: 'asc'},
            {field: 'applicant', sort: 'asc'},
            {field: 'dist', sort: 'asc'},
            {field: 'loantype_abr', sort: 'asc'}
        ];
        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        if ($scope.gridOptions.api) {
            $scope.gridOptions.api.onNewRows();
            $scope.gridOptions.api.hideColumns(['due_date'], true);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
        }
        console.log($scope.gridOptions);

    }

})();

