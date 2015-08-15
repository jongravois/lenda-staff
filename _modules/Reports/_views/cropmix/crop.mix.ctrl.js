(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CropMixController', CropMixController);

    CropMixController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function CropMixController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;

        $scope.tools = false;

        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'location', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'}
        ];

        var columnDefs = [
            {
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                width: 80
            },
            {
                headerName: 'Loc',
                field: 'location',
                cellClass: 'text-center',
                width: 70
            },
            {
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                width: 80,
                filter: 'number'
            },
            {
                headerName: 'Crop',
                field: 'crop',
                cellClass: 'text-left',
                width: 80
            },
            {
                headerName: 'Acres',
                field: 'acres',
                cellClass: 'text-right',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.acres, 0);
                },
                width: 90,
                filter: 'number'

            }
        ];

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

        $scope.gridOptions.rowData = $scope.loans.area_acres;
        if ($scope.gridOptions.rowData.length < 20){
            $scope.gridHeight = (15 * 30).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }
    }

})();
