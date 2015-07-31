(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CropMixController', CropMixController);

    CropMixController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory'];

    function CropMixController($scope, $http, $filter, $timeout, AppFactory) {
        $scope.AppFactory = AppFactory;

        var columnDefs = [
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
                cellRenderer: function(params) {
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
                cellRenderer: function(params) {
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
                field: 'soybeansFAC',
                cellClass: 'text-right',
                cellRenderer: function(params) {
                    return $filter('number')(params.data.soybeansFAC, 0);
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
                cellRenderer: function(params) {
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
                cellRenderer: function(params) {
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
                cellRenderer: function(params) {
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
                cellRenderer: function(params) {
                    return $filter('number')(params.data.peanuts, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Cane',
                field: 'cane',
                cellClass: 'text-right',
                cellRenderer: function(params) {
                    return $filter('number')(params.data.cane, 0);
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
                cellRenderer: function(params) {
                    return $filter('number')(params.data.wheat, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 96,
                filter: 'number'

            },
            {
                headerGroup: 'Crops',
                headerName: 'Other',
                field: 'other',
                cellClass: 'text-right',
                cellRenderer: function(params) {
                    return $filter('number')(params.data.other, 0);
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
                cellRenderer: function(params) {
                    return $filter('number')(
                        params.data.corn
                        + params.data.soybeans
                        + params.data.soybeansFAC
                        + params.data.sorghum
                        + params.data.cotton
                        + params.data.rice
                        + params.data.peanuts
                        + params.data.cane
                        + params.data.wheat
                        + params.data.other, 0);
                },
                suppressSorting: false,
                suppressSizeToFit: false,
                width: 105,
                filter: 'number'

            }
        ];

        $scope.showToolPanel = function(){
            $scope.tools = !$scope.tools;
            $scope.gridOptions.api.showToolPanel($scope.tools);
        }

        $scope.toggleHorizontal = function(){
            $scope.horizontal = !$scope.horizontal;
            if ($scope.horizontal){
                $scope.pin = 0;
            } else {
                $scope.pin = $scope.pins;
            }
            $scope.gridOptions.pinnedColumnCount = $scope.pin;
            $scope.gridOptions.api.onNewCols();
            $scope.gridOptions.api.hideColumns(['status_left', 'status', 'status_right'], $scope.icons);
            $scope.gridOptions.api.setSortModel($scope.sortKeys);
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
            showToolPanel: false
        };

        $http.get("json/crop.mix.json")
            .then(function (res) {
                $scope.pins = 3;
                $scope.pin = 0;
                $scope.gridOptions.rowData = res.data;
                $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
                $scope.gridOptions.api.onNewRows();
                $scope.sortKeys = [
                    {field: 'region', sort: 'asc'},
                    {field: 'location', sort: 'asc'},
                ];
                $scope.gridOptions.api.setSortModel($scope.sortKeys);
                $scope.icons = false;
                $scope.tools = false;
            });
    }

})();
