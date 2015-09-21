(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CropMixController', CropMixController);

    CropMixController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function CropMixController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;

        var reduced = [];
        _.each(Loans, function (item) {
            _.each(item.area_acres, function (i) {
                try {
                    i.region = i.region;
                    i.location = i.location;
                    i.loc_abr = i.loc_abr;
                    i.crop = i.crop;
                    i.acres = i.acres;
                    reduced.push(i);
                } catch (err) {
                    console.error('ERROR', err.name + ': "' + err.message);
                }
            });
            console.log('reduced', reduced);
        });

        var classRules = {
            'background-odd': function (params) {
                return params.node.parent.childIndex % 2 === 0;
            },
            'background-even': function (params) {
                return params.node.parent.childIndex % 2 !== 0;
            },
            'border': function (params) {
                return params.node.parent.lastChild && params.node.lastChild;
            }
        };

        var shadow = "#cccccc";

        $scope.tools = false;

        $scope.sortKeys = [
            {field: 'region', sort: 'asc'},
            {field: 'loc_abr', sort: 'asc'},
            {field: 'crop_year', sort: 'asc'},
            {field: 'crop', sort: 'asc'}
        ];

        var columnDefs = [
            {
                cellClassRules: classRules,
                headerName: 'Region',
                field: 'region',
                cellClass: 'text-center',
                cellStyle: function (params) {
                    if (!params.node.firstChild) {
                        return {color: shadow};
                    }
                },
                width: 80
            },
            {
                cellClassRules: classRules,
                headerName: 'Location',
                field: 'location',
                cellClass: 'text-center',
                cellStyle: function (params) {
                    if (!params.node.firstChild) {
                        return {color: shadow};
                    }
                },
                width: 150,
                hide: true
            },
            {
                cellClassRules: classRules,
                headerName: 'Loc',
                field: 'loc_abr',
                cellClass: 'text-center',
                cellStyle: function (params) {
                    if (!params.node.firstChild) {
                        return {color: shadow};
                    }
                },
                width: 80
            },
            {
                cellClassRules: classRules,
                headerName: 'Year',
                field: 'crop_year',
                cellClass: 'text-center',
                cellStyle: function (params) {
                    if (!params.node.firstChild) {
                        return {color: shadow};
                    }
                },
                width: 80,
                filter: 'number'
            },
            {
                cellClassRules: classRules,
                headerName: 'Crop',
                field: 'crop',
                cellClass: 'text-left',
                width: 100
            },
            {
                cellClassRules: classRules,
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

        $scope.gridOptions = {
            columnDefs: columnDefs,
            rowSelection: 'single',
            rowData: null,
            groupSuppressRow: true,
            groupKeys: ['crop_year', 'acres'],
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

        $scope.gridOptions.rowData = reduced;

        if ($scope.gridOptions.rowData.length < 20) {
            $scope.gridHeight = (350).toString();
        } else {
            $scope.gridHeight = Number(($scope.gridOptions.rowData.length + 2) * 30).toString();
        }

        $scope.help = false;
    }

})();
