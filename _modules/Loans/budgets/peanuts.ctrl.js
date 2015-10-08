(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PeanutsController', PeanutsController);

        PeanutsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function PeanutsController($rootScope, $scope, AppFactory){
            $scope.buddy = _.filter($scope.loan.expenses.byEntry, function(e){
                return e.crop === 'peanuts';
            });

            $scope.getRowARMAcre = function(a,d,o) {
                return Number(a)+Number(d)+Number(o);
            }
            $scope.getTotARMAcre = function() {
                return _.sumCollection($scope.buddy, 'arm');
            }
            $scope.getTotDistAcre = function() {
                return _.sumCollection($scope.buddy, 'dist');
            }
            $scope.getTotOtherAcre = function() {
                return _.sumCollection($scope.buddy, 'other');
            }
            $scope.getTotTotalAcre = function() {
                return Number($scope.getTotARMAcre())+Number($scope.getTotDistAcre())+Number($scope.getTotOtherAcre());
            }
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
                        width: '135'
                    },
                    {
                        name: 'arm',
                        enableCellEdit: true,
                        displayName: 'ARM',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotARMAcre()|flexZeroCurrency:2}}</span>',
                        width: '100'
                    },
                    {
                        name: 'dist',
                        enableCellEdit: true,
                        displayName: 'Dist',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        headerCellTemplate: './_modules/Admin/_views/_hdr.distributor.tmpl.html',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotDistAcre()|flexZeroCurrency:2}}</span>',
                        width: '100'
                    },
                    {
                        name: 'other',
                        enableCellEdit: true,
                        displayName: '3rd Party',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotOtherAcre()|flexZeroCurrency:2}}</span>',
                        width: '100'
                    },
                    {
                        name: 'per_acre',
                        enableCellEdit: false,
                        displayName: 'Total',
                        cellClass: 'text-right bright padd',
                        cellFilter: 'flexZeroCurrency:0',
                        cellTemplate: '<span>{{row.entity.arm+row.entity.dist+row.entity.other|flexZeroCurrency:2}}</span>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right bright',
                        footerCellTemplate: '<span>{{grid.appScope.getTotTotalAcre()|flexZeroCurrency:2}}</span>',
                        width: '100'
                    },
                    {
                        name: 'calc_arm',
                        enableCellEdit: false,
                        displayName: 'ARM',
                        cellClass: 'text-right padd',
                        cellFilter: 'flexZeroCurrency:0',
                        cellTemplate: '<span>{{row.entity.arm*row.entity.acres|flexZeroCurrency:0}}</span>',
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
                        cellClass: 'text-right padd',
                        cellFilter: 'flexZeroCurrency:0',
                        cellTemplate: '<span>{{row.entity.dist*row.entity.acres|flexZeroCurrency:0}}</span>',
                        headerCellClass: 'text-center bGreen',
                        headerCellTemplate: './_modules/Admin/_views/_hdr.distributor.tmpl.html',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd nBold text-right',
                        footerCellTemplate: '<span>{{grid.appScope.getTotDistLoan()|flexZeroCurrency:0}}</span>',
                        width: '100'
                    },
                    {
                        name: 'calc_other',
                        enableCellEdit: true,
                        displayName: '3rd Party',
                        cellClass: 'text-right padd',
                        cellFilter: 'flexZeroCurrency:0',
                        cellTemplate: '<span>{{row.entity.other*row.entity.acres|flexZeroCurrency:0}}</span>',
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
                        cellClass: 'text-right padd',
                        cellFilter: 'flexZeroCurrency:0',
                        cellTemplate: '<span>{{(row.entity.arm+row.entity.dist+row.entity.other)*row.entity.acres|flexZeroCurrency:0}}</span>',
                        headerCellClass: 'text-center bGreen',
                        headerCellTemplate: './_modules/Admin/_views/_hdr.acres.tmpl.html',
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
                $scope.bud_hgt = 32 + ($scope.buddy.length+1) * 30;
                $scope.bud_wdt = 935;
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