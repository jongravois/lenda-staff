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
                showCrossCollateral: false,
                showStorage: false
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
            $scope.createNewCross = function() {
                alert('Creating new Cross Collateralization');
            }

            //CONDITIONS
            //CONDITIONS

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
                        width: '205'
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
                $scope.crp_wdt = 935;
                $scope.gridApi.gridHeight = $scope.crp_hgt;
                $scope.gridApi.gridWidth = $scope.crp_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //CROPS

            //STORAGE
            $scope.gridOptsStorage = {
                enableCellEditOnFocus: true,
                showColumnFooter: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'grain_buyer',
                        enableCellEdit: true,
                        displayName: 'Buyer',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span>Total:</span>',
                        width: '120'
                    },
                    {
                        name: 'commodity',
                        enableCellEdit: true,
                        displayName: 'Crop',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '71'
                    },
                    {
                        name: 'contract_number',
                        enableCellEdit: true,
                        displayName: 'Cnt',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '70'
                    },
                    {
                        name: 'contract_date',
                        enableCellEdit: true,
                        displayName: 'Cnt Dt',
                        cellClass: 'text-center cBlue',
                        cellFilter: "date:'MM/dd/yyyy'",
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '88'
                    },
                    {
                        name: 'delivery_date',
                        enableCellEdit: true,
                        displayName: 'Del Dt',
                        cellClass: 'text-center cBlue',
                        cellFilter: "date:'MM/dd/yyyy'",
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '88'
                    },
                    {
                        name: 'contract_amount',
                        enableCellEdit: true,
                        displayName: 'Qty',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd nBold',
                        footerCellTemplate: '<span>{{grid.appScope.getAmtTotal()|flexZeroNumber:0}}</span>',
                        width: '70'
                    },
                    {
                        name: 'contract_price',
                        enableCellEdit: true,
                        displayName: 'Price',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:4',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '70'
                    },
                    {
                        name: 'mkt_set',
                        enableCellEdit: true,
                        displayName: 'Mkt Set',
                        cellClass: 'text-center cBlue',
                        cellFilter: 'booleanYesNo',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '54'
                    },
                    {
                        name: 'owner_share',
                        enableCellEdit: true,
                        displayName: 'Prod Share',
                        cellClass: 'padd text-right cBlue',
                        cellTemplate: '<span>{{grid.appScope.getProdShare(row.entity)|flexZeroPercent:1}}</span>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '65'
                    },
                    {
                        name: 'revenue',
                        enableCellEdit: false,
                        displayName: 'Exp Rev',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd nBold',
                        footerCellTemplate: '<span>{{grid.appScope.getRevenueTotal()|flexZeroCurrency:0}}</span>',
                        width: '75'
                    },
                    {
                        name: 'advance_percent',
                        enableCellEdit: true,
                        displayName: 'Disc',
                        cellClass: 'text-right cBlue',
                        cellTemplate: '<span>{{grid.appScope.getStoDisc(row.entity)|flexZeroPercent:1}}</span>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '55'
                    },
                    {
                        name: 'eligible_proceeds',
                        enableCellEdit: false,
                        displayName: 'Eligible',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd nBold',
                        footerCellTemplate: '<span>{{grid.appScope.getEligibleTotal()|flexZeroCurrency:0}}</span>',
                        width: '70'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span></span>',
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteContract(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.storage
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.storage, function (rawdata) {
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

            $scope.gridOptsStorage.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.sto_hgt = 32 + ($scope.loan.storage.length+1) * 30;
                $scope.sto_wdt = 935;
                $scope.gridApi.gridHeight = $scope.sto_hgt;
                $scope.gridApi.gridWidth = $scope.sto_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //STORAGE

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
                        width: '200'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '105'
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
                $scope.eqp_wdt = 935;
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
                        width: '200'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '105'
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
                $scope.rest_wdt = 935;
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
                        width: '200'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '105'
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
                $scope.fsa_wdt = 935;
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
                        width: '200'
                    },
                    {
                        name: 'source',
                        enableCellEdit: true,
                        displayName: 'Lien Holder',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '105'
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
                $scope.other_wdt = 935;
                $scope.gridApi.gridHeight = $scope.other_hgt;
                $scope.gridApi.gridWidth = $scope.other_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //OTHER

            //CROSS COLLATERAL
            $scope.getXARMCommit = function(xc, loans) {
                return AppFactory.xArmCommit(xc, loans);
            }
            $scope.getXDistCommit = function(xc, loans) {
                return AppFactory.xDistCommit(xc, loans);
            }
            $scope.getXCashFlow = function(xc, loans) {
                return AppFactory.xCashFlow(xc, loans);
            }
            $scope.getXExposure = function(xc, loans) {
                return AppFactory.xExposure(xc, loans);
            }

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

            $scope.createNewContract = function() {
                var newb = getNewContract();
                AppFactory.postIt('storages', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.sto_hgt += 30;
                        $scope.loan.storage.push(newb);
                    });
            };
            $scope.deleteContract = function(id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('storages', id);
                        $scope.sto_hgt -= 30;
                        _.remove($scope.loan.storage, {id: id});
                    });
            };
            $scope.getProdShare = function(obj) {
                return 100 - Number(obj.owner_share);
            }
            $scope.getStoDisc = function(obj) {
                return 100 - Number(obj.advance_percent);
            }
            $scope.getAmtTotal = function() {
                return _.sumCollection($scope.loan.storage, 'contract_amount');
            }
            $scope.getRevenueTotal = function() {
                return _.sumCollection($scope.loan.storage, 'revenue');
            }
            $scope.getEligibleTotal = function() {
                return _.sumCollection($scope.loan.storage, 'eligible_proceeds');
            }

            //////////
            function getNewContract() {
                return {
                    loan_id: $scope.loan.id,
                    contract_number: '',
                    grain_buyer: '',
                    lien_holder: '',
                    contract_date: '',
                    delivery_date: '',
                    contract_amout: 0,
                    contract_price: 0,
                    owner_share: 0,
                    revenue: 0,
                    eligible_proceeds: 0,
                    advance_percent: 75,
                    payment_terms: 15
                };
            }
            function updateStorage() {
                alert('Saving Storage');
            }
            //console.log('xcols', $scope.loan.xcols);
        } // end controller
})();