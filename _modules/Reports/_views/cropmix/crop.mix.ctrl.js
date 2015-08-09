(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CropMixController', CropMixController);

    CropMixController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CropMixFactory'];

    function CropMixController($scope, $http, $filter, $timeout, AppFactory, Loans, CropMixFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.icons = false;
        $scope.tools = false;

        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'}
        ];

        var columnDefs = [
            {
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellRenderer: function (params) {
                    if (params.data.region.toUpperCase() === 'N') {
                        return 'North';
                    } else if (params.data.region.toUpperCase() === 'S') {
                        return 'South';
                    } else if (params.data.region.toUpperCase() === 'E') {
                        return 'East';
                    } else if (params.data.region.toUpperCase() === 'W') {
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
                suppressizeToFit: false,
                width: 70
            },
            {
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 85,
                filter: 'number'
            },
            {
                headerGroup: 'Crops',
                headerName: 'Corn',
                field: 'corn',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.corn, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 98
            },
            {
                headerGroup: 'Crops',
                headerName: 'Soybeans',
                field: 'soybeans',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.soybeans, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'SB FAC',
                field: 'beansFAC',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.beansFAC, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Sorghum',
                field: 'sorghum',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.sorghum, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Cotton',
                field: 'cotton',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.cotton, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Rice',
                field: 'rice',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.rice, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Peanuts',
                field: 'peanuts',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.peanuts, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Sugarcane',
                field: 'sugarcane',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.sugarcane, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Wheat',
                field: 'wheat',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.wheat, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Sunflowers',
                field: 'sunflowers',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.sunflowers, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Total',
                //headerGroupShow: 'closed',
                field: 'total',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(
                        params.data.corn
                        + params.data.soybeans
                        + params.data.beansFAC
                        + params.data.sorghum
                        + params.data.cotton
                        + params.data.rice
                        + params.data.peanuts
                        + params.data.sugarcane
                        + params.data.wheat
                        + params.data.sunflowers, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 105,
                filter: 'number'
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
        };

        $scope.getModel = function () {
            if ($scope.gridOptions.api) {
                console.log($scope.gridOptions.api.getModel());
                return $scope.gridOptions.api.getModel();
            }
        }

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

        $scope.reduced = CropMixFactory.getData(Loans);

        $scope.gridOptions.rowData = $scope.reduced;
        $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
    }

})();
