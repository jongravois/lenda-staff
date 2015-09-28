(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CollateralsController', CollateralsController);

        CollateralsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'LoansFactory'];

        function CollateralsController($rootScope, $scope, $state, AppFactory, LoansFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;

            $scope.tggl = {
                showConditions: false,
                showCropCollateral: false,
                showEquipmentCollateral: false,
                showRealEstateCollateral: false,
                showFSACollateral: false,
                showOtherCollateral: false,
                showCrossCollateral: false
            };

            //temp
            $scope.loan.fsa_col = true;

            if(!$scope.loans) {
                if($rootScope.loans) {
                    $scope.loans = $rootScope.loans;
                    //console.log('XCOL', $scope.loan.xcols, $scope.loans);
                } else {
                    LoansFactory.getLoans()
                        .then(function (rsp) {
                            $scope.loans = rsp;
                            //console.log('XCOL Reload', $scope.loan.xcols, $scope.loans);
                        });
                }
            }

            $scope.createOtherCollateral = function(col) {
                alert('Creating ' + col);
            };

            //CROPS
            $scope.createNewCrop = function() {
                alert('Create new crop')
            };

            $scope.gridOptsCrops = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'description',
                        enableCellEdit: true,
                        displayName: 'Description',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '500'
                    },
                    {
                        name: 'lien_holder',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'lien_amount',
                        enableCellEdit: true,
                        displayName: 'Lien',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.priorlien
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.priorlien, function (rawdata) {
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

            $scope.gridOptsCrops.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.crp_hgt = 32 + $scope.loan.priorlien.length * 30;
                $scope.crp_wdt = 930;
                $scope.gridApi.gridHeight = $scope.crp_hgt;
                $scope.gridApi.gridWidth = $scope.crp_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //CROPS

            //EQUIPMENT
            $scope.gridOptsEquipment = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'description',
                        enableCellEdit: true,
                        displayName: 'Description',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '300'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'mkt_value',
                        enableCellEdit: true,
                        displayName: 'Mkt Value',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'discount',
                        enableCellEdit: true,
                        displayName: 'Discount%',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'amount',
                        enableCellEdit: true,
                        displayName: 'Disc Value',
                        cellTemplate: '<div class="padd text-right">{{row.entity.mkt_value * (1 - (row.entity.discount/100))|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'prior_lien',
                        enableCellEdit: true,
                        displayName: 'Prior Lien',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'value',
                        enableCellEdit: true,
                        displayName: 'Net Value',
                        cellTemplate: '<div class="padd text-right">{{(row.entity.mkt_value * (1 - (row.entity.discount/100)))-row.entity.prior_lien|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.collateral.equipment
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.collateral.equipment, function (rawdata) {
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

            $scope.gridOptsEquipment.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.eqp_hgt = 32 + $scope.loan.collateral.equipment.length * 30;
                $scope.eqp_wdt = 1050;
                $scope.gridApi.gridHeight = $scope.eqp_hgt;
                $scope.gridApi.gridWidth = $scope.eqp_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //EQUIPMENT

            //REAL ESTATE
            $scope.gridOptsRealestate = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'description',
                        enableCellEdit: true,
                        displayName: 'Description',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '300'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'mkt_value',
                        enableCellEdit: true,
                        displayName: 'Mkt Value',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'discount',
                        enableCellEdit: true,
                        displayName: 'Discount%',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'amount',
                        enableCellEdit: true,
                        displayName: 'Disc Value',
                        cellTemplate: '<div class="padd text-right">{{row.entity.mkt_value * (1 - (row.entity.discount/100))|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'prior_lien',
                        enableCellEdit: true,
                        displayName: 'Prior Lien',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'value',
                        enableCellEdit: true,
                        displayName: 'Net Value',
                        cellTemplate: '<div class="padd text-right">{{(row.entity.mkt_value * (1 - (row.entity.discount/100)))-row.entity.prior_lien|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.collateral.realestate
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.collateral.realestate, function (rawdata) {
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

            $scope.gridOptsRealestate.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.rest_hgt = 32 + $scope.loan.collateral.realestate.length * 30;
                $scope.rest_wdt = 1050;
                $scope.gridApi.gridHeight = $scope.rest_hgt;
                $scope.gridApi.gridWidth = $scope.rest_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //REAL ESTATE

            //FSA
            $scope.gridOptsFSA = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'description',
                        enableCellEdit: true,
                        displayName: 'Description',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '300'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'mkt_value',
                        enableCellEdit: true,
                        displayName: 'Mkt Value',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'discount',
                        enableCellEdit: true,
                        displayName: 'Discount%',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'amount',
                        enableCellEdit: true,
                        displayName: 'Disc Value',
                        cellTemplate: '<div class="padd text-right">{{row.entity.mkt_value * (1 - (row.entity.discount/100))|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'prior_lien',
                        enableCellEdit: true,
                        displayName: 'Prior Lien',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'value',
                        enableCellEdit: true,
                        displayName: 'Net Value',
                        cellTemplate: '<div class="padd text-right">{{(row.entity.mkt_value * (1 - (row.entity.discount/100)))-row.entity.prior_lien|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.collateral.fsa
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.collateral.fsa, function (rawdata) {
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

            $scope.gridOptsFSA.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.fsa_hgt = 32 + $scope.loan.collateral.fsa.length * 30;
                $scope.fsa_wdt = 1050;
                $scope.gridApi.gridHeight = $scope.fsa_hgt;
                $scope.gridApi.gridWidth = $scope.fsa_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //FSA

            //OTHER
            $scope.gridOptsOther = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'description',
                        enableCellEdit: true,
                        displayName: 'Description',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '300'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'mkt_value',
                        enableCellEdit: true,
                        displayName: 'Mkt Value',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'discount',
                        enableCellEdit: true,
                        displayName: 'Discount%',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'amount',
                        enableCellEdit: true,
                        displayName: 'Disc Value',
                        cellTemplate: '<div class="padd text-right">{{row.entity.mkt_value * (1 - (row.entity.discount/100))|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'prior_lien',
                        enableCellEdit: true,
                        displayName: 'Prior Lien',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'value',
                        enableCellEdit: true,
                        displayName: 'Net Value',
                        cellTemplate: '<div class="padd text-right">{{(row.entity.mkt_value * (1 - (row.entity.discount/100)))-row.entity.prior_lien|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.collateral.other
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.collateral.other, function (rawdata) {
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

            $scope.gridOptsOther.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.other_hgt = 32 + $scope.loan.collateral.other.length * 30;
                $scope.other_wdt = 1050;
                $scope.gridApi.gridHeight = $scope.other_hgt;
                $scope.gridApi.gridWidth = $scope.other_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //OTHER

            $scope.saveOtherCollateral = function(type) {
                alert('working');
            };
            $scope.deleteOtherCollateral = function(index, id) {
                alert('working');
            };
            $scope.createOtherCollateral = function(type) {
                alert('working');
            };

            $scope.calcPriorLienTotal = function() {
                var liens = $scope.loan.prior_liens;
                return _.sumCollection(liens, 'lien_amount');
            }

        } // end controller
})();