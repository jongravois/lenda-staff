(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CropsController', CropsController);

    CropsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'DefaultsFactory'];

    function CropsController($rootScope, $scope, $state, AppFactory, DefaultsFactory){
        $scope.newapplications = $state.current.data.newapplications;
        $scope.AppFactory = AppFactory;

        if(!$rootScope.feeder || !$rootScope.feeder.units) {
            AppFactory.getAll('measures').then(function(rsp){
                $scope.units = rsp.data.data;
            });
        }

        AppFactory.getAll('crops')
            .then(function(rsp){
                $scope.crops = rsp.data.data;
                //console.log('CROPS', $scope.crops);
            });

        DefaultsFactory.init();
        var globals = DefaultsFactory.getObject();
        $scope.globals = globals.globvars[0];

        $scope.crops = $scope.loan.loancrops;
        $scope.tggl = {
            showCrops: false,
            showBuyers: false,
            showRebators: false,
            showYields: false,
            showIndirect: false
        };
        //console.log('loancrops', $scope.loan.loancrops);

        //CROPS
        $scope.gridOptsCrops = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'crop.crop',
                    enableCellEdit: false,
                    displayName: 'Crop',
                    cellClass: 'text-left',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '160'
                },
                {
                    name: 'bkqty',
                    enableCellEdit: true,
                    displayName: 'Bk Qty',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:0',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '100'
                },
                {
                    name: 'bkprice',
                    enableCellEdit: true,
                    displayName: 'Bk Price',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroCurrency:4',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '100'
                },
                {
                    name: 'crop.measurement',
                    enableCellEdit: true,
                    displayName: 'UoM',
                    cellClass: 'text-center cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '60'
                },
                {
                    name: 'var_harvest',
                    enableCellEdit: true,
                    displayName: 'Var Hvst',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroCurrency:4',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '100'
                },
                {
                    name: 'harvest_measure',
                    enableCellEdit: true,
                    displayName: 'UoM',
                    cellClass: 'text-center cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '60'
                },
                {
                    name: 'rebates',
                    enableCellEdit: true,
                    displayName: 'Rebate',
                    cellClass: 'text-left cBlue',
                    cellFilter: 'flexZeroCurrency:4',
                    headerCellClass: 'text-right bGreen',
                    enableColumnMenu: false,
                    width: '100'
                },
                {
                    name: 'rebate_measure',
                    enableCellEdit: true,
                    displayName: 'UoM',
                    cellClass: 'text-center cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '60'
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
            data: $scope.loan.loancrops
        };

        $scope.msg = {};
        var records = [];
        angular.forEach($scope.loan.loancrops, function (rawdata) {
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
            $scope.crops_hgt = $scope.loan.loancrops.length * 58;
            $scope.crops_wdt = 770;
            $scope.gridApi.gridHeight = $scope.crops_hgt;
            $scope.gridApi.gridWidth = $scope.crops_wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //CROPS

        //YIELDS
        $scope.gridOptsYields = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'crop.crop',
                    enableCellEdit: false,
                    displayName: 'Crop',
                    cellClass: 'text-left',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '160'
                },
                {
                    name: 'crop.measurement',
                    enableCellEdit: true,
                    displayName: 'UoM',
                    cellClass: 'text-center cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '60'
                },
                {
                    name: 'yields[0].p1',
                    enableCellEdit: true,
                    displayName: 'P1',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'yields[0].p2',
                    enableCellEdit: true,
                    displayName: 'P2',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'yields[0].p3',
                    enableCellEdit: true,
                    displayName: 'P3',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'threeyearavg',
                    enableCellEdit: true,
                    displayName: '3yr Avg',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'yields[0].p4',
                    enableCellEdit: true,
                    displayName: 'P4',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'yields[0].p5',
                    enableCellEdit: true,
                    displayName: 'P5',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'yields[0].p6',
                    enableCellEdit: true,
                    displayName: 'P6',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'sixyearavg',
                    enableCellEdit: true,
                    displayName: '6yr Avg',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
                },
                {
                    name: 'aph',
                    enableCellEdit: true,
                    displayName: 'APH',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroNumber:1',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
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
            data: $scope.loan.loancrops
        };

        $scope.msg = {};
        var records = [];
        angular.forEach($scope.loan.loancrops, function (rawdata) {
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

        $scope.gridOptsYields.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.$scope = $scope;
            $scope.gridApi = gridApi;
            $scope.yld_hgt = $scope.loan.loancrops.length * 58;
            $scope.yld_wdt = 970;
            $scope.gridApi.gridHeight = $scope.yld_hgt;
            $scope.gridApi.gridWidth = $scope.yld_wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //YIELDS

        //BUYERS
        $scope.gridOptsBuyers = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'buyer',
                    enableCellEdit: true,
                    displayName: 'Buyer',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'contact',
                    enableCellEdit: true,
                    displayName: 'Contact',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'location',
                    enableCellEdit: true,
                    displayName: 'Location',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'phone',
                    enableCellEdit: true,
                    displayName: 'Phone',
                    cellClass: 'text-left cBlue',
                    cellFilter: 'phone',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '120'
                },
                {
                    name: 'email',
                    enableCellEdit: true,
                    displayName: 'Email',
                    cellClass: 'text-left cBlue',
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
            data: $scope.loan.buyers
        };

        $scope.msg = {};
        var records = [];
        angular.forEach($scope.loan.buyers, function (rawdata) {
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

        $scope.gridOptsBuyers.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.$scope = $scope;
            $scope.gridApi = gridApi;
            $scope.buy_hgt = $scope.loan.buyers.length * 58;
            $scope.buy_wdt = 870;
            $scope.gridApi.gridHeight = $scope.buy_hgt;
            $scope.gridApi.gridWidth = $scope.buy_wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //BUYERS

        //REBATORS
        $scope.gridOptsRebators = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'rebator',
                    enableCellEdit: true,
                    displayName: 'Rebator',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'contact',
                    enableCellEdit: true,
                    displayName: 'Contact',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'location',
                    enableCellEdit: true,
                    displayName: 'Location',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'phone',
                    enableCellEdit: true,
                    displayName: 'Phone',
                    cellClass: 'text-left cBlue',
                    cellFilter: 'phone',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '120'
                },
                {
                    name: 'email',
                    enableCellEdit: true,
                    displayName: 'Email',
                    cellClass: 'text-left cBlue',
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
            data: $scope.loan.rebators
        };

        $scope.msg = {};
        var records = [];
        angular.forEach($scope.loan.rebators, function (rawdata) {
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

        $scope.gridOptsRebators.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.$scope = $scope;
            $scope.gridApi = gridApi;
            $scope.rbt_hgt = $scope.loan.rebators.length * 56;
            $scope.rbt_wdt = 870;
            $scope.gridApi.gridHeight = $scope.rbt_hgt;
            $scope.gridApi.gridWidth = $scope.rbt_wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //REBATORS

        //INDIRECT INCOME
        $scope.gridOptsIndy = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'source',
                    enableCellEdit: true,
                    displayName: 'Source',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'description',
                    enableCellEdit: true,
                    displayName: 'Description',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '450'
                },
                {
                    name: 'amount',
                    enableCellEdit: true,
                    displayName: 'Amount',
                    cellClass: 'text-right cBlue',
                    cellFilter: 'flexZeroCurrency:2',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '100'
                },
                {
                    name: 'collateral',
                    enableCellEdit: true,
                    displayName: 'Collateral?',
                    cellClass: 'text-center cBlue',
                    cellFilter: 'booleanYN',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '90'
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
            data: $scope.loan.indyinc
        };

        $scope.msg = {};
        var records = [];
        angular.forEach($scope.loan.indyinc, function (rawdata) {
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

        $scope.gridOptsIndy.onRegisterApi = function(gridApi) {
            //set gridApi on scope
            $scope.$scope = $scope;
            $scope.gridApi = gridApi;
            $scope.indy_hgt = $scope.loan.indyinc.length * 56;
            $scope.indy_wdt = 870;
            $scope.gridApi.gridHeight = $scope.indy_hgt;
            $scope.gridApi.gridWidth = $scope.indy_wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //INDIRECT INCOME

        $scope.createNewCrop = function() {
            alert('working');
        }
        $scope.saveCrop = function(data, id) {
            alert('working');
        }
        $scope.deleteCrop = function(index, id) {
            alert('working');
        }

        $scope.addNewBuyer = function(obj) {
            alert('working');
        };
        $scope.saveBuyer = function(obj) {
            alert('working');
        };
        $scope.deleteBuyer = function(obj) {
            alert('working');
        };

        $scope.addNewRebator = function(obj) {
            alert('working');
        };
        $scope.saveRebator = function(obj) {
            alert('working');
        };
        $scope.deleteRebator = function(obj) {
            alert('working');
        };

        $scope.updateCrops = function() {
            alert('working');
        }
        $scope.updatePlannedCrops = function() {
            alert('working');
        };
        $scope.updateStorage = function() {
            alert('working');
        };
        //////////
        function getNewCrop() {
            return {
                loan_id: $scope.loan.id,
                crop_id: 0,
                crop_measure: 'bu',
                bkqty: 0,
                bkprice: 0,
                var_harvest: 0,
                harvest_measure: 'bu',
                rebates: 0,
                rebate_measure: 'bu'
            };
        }
    } // end controller
})();