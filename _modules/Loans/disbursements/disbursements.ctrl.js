(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DisbursementsController', DisbursementsController);

        DisbursementsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function DisbursementsController($rootScope, $scope, $state, AppFactory){
            var payouts = _.sortBy($scope.loan.disbursements, 'category');
            var arm_tots = 0;
            var rem_tots = 0;
            var spent_tots = 0;

            $scope.disburse_remaining = function(rowdata) {
                return Number(rowdata.arm_budget) - (Number(rowdata.spent) + Number(rowdata.requested));
            }
            $scope.disburse_request_total = function() {
                var retro = 0;
                _.each(payouts, function(p){
                    retro += Number(p.requested);
                });
                return retro;
            }
            $scope.disburse_arm_total = function() {
                arm_tots = _.sumCollection(payouts, 'arm_budget');
                return arm_tots;
            }
            $scope.disburse_rem_total = function() {
                return arm_tots - spent_tots;
            }
            $scope.disburse_spent_total = function() {
                spent_tots = _.sumCollection(payouts, 'spent');
                return spent_tots;
            }

            $scope.gridOptsDisbursements = {
                enableCellEditOnFocus: true,
                showColumnFooter: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'expense',
                        enableCellEdit: false,
                        displayName: 'Category',
                        cellClass: 'text-left',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span>Total:</span>',
                        width: '150'
                    },{
                        name: 'arm_budget',
                        enableCellEdit: false,
                        displayName: 'Budget',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.disburse_arm_total()|flexZeroCurrency:2}}</div>',
                        width: '150'
                    },
                    {
                        name: 'spent',
                        enableCellEdit: false,
                        displayName: 'Spent',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:2',
                        cellTemplate: '<div class="padd black">{{(row.entity.spent * 1) + (1 * row.entity.requested)|flexZeroCurrency:2}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.disburse_spent_total()|flexZeroCurrency:2}}</div>',
                        width: '150'
                    },
                    {
                        name: 'remaining',
                        enableCellEdit: false,
                        displayName: 'Remaining',
                        cellClass: 'text-right',
                        cellFilter: 'flexCurrency:2',
                        cellTemplate: '<div class="padd black" ng="class={cRed: row.entity.remaining <= 0}">{{grid.appScope.disburse_remaining(row.entity)|flexZeroCurrency:2}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.disburse_rem_total()|flexZeroCurrency:2}}</div>',
                        width: '150'
                    },
                    {
                        name: 'requested',
                        enableCellEdit: true,
                        displayName: 'Request',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.disburse_request_total()|flexZeroCurrency:2}}</div>',
                        width: '150'
                    }
                ],
                data: payouts
            };

            $scope.msg = {};
            var records = [];
            angular.forEach(payouts, function (rawdata) {
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

            $scope.gridOptsDisbursements.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = 32 + (payouts.length + 1) * 30;
                $scope.wdt = 750;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //////////
        } // end controller
})();