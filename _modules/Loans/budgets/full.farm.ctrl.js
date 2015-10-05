(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FullFarmController', FullFarmController);

        FullFarmController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FullFarmController($rootScope, $scope, AppFactory){
            $scope.buddy = $scope.loan.expenses.byCat;

            $scope.getTotARMLoan = function() {
                return _.sumCollection($scope.buddy, 'calc_arm');
            }
            $scope.getTotDistLoan = function() {
                return _.sumCollection($scope.buddy, 'calc_dist');
            }
            $scope.getTotOtherLoan = function() {
                return _.sumCollection($scope.buddy, 'calc_other');
            }
            $scope.getTotTotalLoan = function() {
                return _.sumCollection($scope.buddy, 'calc_total');
            }

            $scope.gridOptsBudget = {
                enableCellEditOnFocus: true,
                showColumnFooter: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'expense',
                        enableCellEdit: false,
                        displayName: 'Expense',
                        cellClass: 'text-left bright',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span>Total:</span>',
                        width: '600'
                    },
                    {
                        name: 'calc_arm',
                        enableCellEdit: false,
                        displayName: 'ARM',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotARMLoan()|flexZeroCurrency:0}}</span>',
                        width: '100'
                    },
                    {
                        name: 'calc_dist',
                        enableCellEdit: false,
                        displayName: 'Dist',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotDistLoan()|flexZeroCurrency:0}}</span>',
                        width: '100'
                    },
                    {
                        name: 'calc_other',
                        enableCellEdit: true,
                        displayName: '3rd Party',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotOtherLoan()|flexZeroCurrency:0}}</span>',
                        width: '100'
                    },
                    {
                        name: 'calc_total',
                        enableCellEdit: true,
                        displayName: 'Total',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotTotalLoan()|flexZeroCurrency:0}}</span>',
                        width: '100'
                    }
                ],
                data: $scope.buddy
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.buddy, function (rawdata) {
                var record = {};
                record.changedAttrs = {};

                Object.defineProperty(record, 'isDirty', {
                    get: function () {
                        return Object.getOwnPropertyNames(record.changedAttrs).length > 0;
                    }
                });

                angular.forEach(rawdata, function (value, key) {
                    Object.defineProperty(record, key, {
                        get: function () {
                            return rawdata[key];
                        },

                        set: function (value) {
                            var origValue = record.changedAttrs[key] ? record.changedAttrs[key][0] : rawdata[key];

                            if(value !== origValue) {
                                record.changedAttrs[key] = [origValue, value];
                            } else {
                                delete record.changedAttrs[key];
                            }
                            rawdata[key] = value;
                        }
                    })
                });
                records.push(record);
            });

            $scope.gridOptsBudget.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.bud_hgt = 30 + ($scope.buddy.length+1) * 30;
                $scope.bud_wdt = 1000;
                $scope.gridApi.gridHeight = $scope.bud_hgt;
                $scope.gridApi.gridWidth = $scope.bud_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //////////
        } // end controller
})();