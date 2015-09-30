(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CropsController', CropsController);

    CropsController.$inject = ['$rootScope', '$scope', '$state', '$modal', 'toastr', 'SweetAlert', 'AppFactory', 'DefaultsFactory'];

    function CropsController($rootScope, $scope, $state, $modal, toastr, SweetAlert, AppFactory, DefaultsFactory){
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
                $scope.items = $scope.crops.filter(function(i){
                    return $scope.loan.fins.crops_in_loan.indexOf(i.crop) === -1;
                });
            });

        DefaultsFactory.init();
        var globals = DefaultsFactory.getObject();
        $scope.globals = globals.globvars[0];

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
                    name: 'crop.name',
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
                    cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteCrop(row.entity.id)">&cross;</span>',
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
            $scope.crops_hgt = 32 + $scope.loan.loancrops.length * 30;
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
                    cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteCrop(row.entity.id)">&cross;</span>',
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
            $scope.yld_hgt = 32 + $scope.loan.loancrops.length * 30;
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
                    cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteBuyer(row.entity.id)">&cross;</span>',
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
            $scope.buy_hgt = 32 + $scope.loan.buyers.length * 30;
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
                    cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteRebator(row.entity.id)">&cross;</span>',
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
            $scope.rbt_hgt = 32 + $scope.loan.rebators.length * 30;
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
                    cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteIndy(row.entity.id)">&cross;</span>',
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
            $scope.indy_hgt = 32 + $scope.loan.indyinc.length * 30;
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
            var modalInstance = $modal.open({
                templateUrl: './_modules/Loans/crops/_new.crop.modal.html',
                controller: 'ModalInstanceCtrl',
                size: 'sm',
                resolve: {
                    items: function () {
                        return $scope.items;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                var newb = getNewCrop(selectedItem);
                AppFactory.postIt('loancrops', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.crops_hgt += 30;
                        $scope.loan.loancrops.push(newb);
                        //$scope.gridOptsCrops.refresh();
                    });
            }, function () {
                //console.log('Modal dismissed at: ' + new Date());
            });
        }
        $scope.deleteCrop = function(id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('loancrops', id);
                    $scope.crops_hgt -= 30;
                    _.remove($scope.loan.loancrops, {id: id});
                });
        }

        $scope.createNewBuyer = function() {
            var newb = getNewBuyer();
            AppFactory.postIt('buyers', newb)
                .then(function (rsp) {
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    $scope.buy_hgt += 30;
                    $scope.loan.buyers.push(newb);
                });
        };
        $scope.deleteBuyer = function(id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('buyers', id);
                    $scope.buy_hgt -= 30;
                    _.remove($scope.loan.buyers, {id: id});
                });
        };

        $scope.createNewRebator = function() {
            var newb = getNewRebator();
            AppFactory.postIt('rebators', newb)
                .then(function (rsp) {
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    $scope.rbt_hgt += 30;
                    $scope.loan.rebators.push(newb);
                });
        };
        $scope.deleteRebator = function(id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('rebators', id);
                    $scope.rbt_hgt -= 30;
                    _.remove($scope.loan.rebators, {id: id});
                });
        };

        $scope.createNewIndIncome = function() {
            var newb = getNewIndirect();
            AppFactory.postIt('indirectcropincomes', newb)
                .then(function (rsp) {
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    $scope.indy_hgt += 30;
                    $scope.loan.indyinc.push(newb);
                });
        };
        $scope.deleteIndy = function(id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('indirectcropincomes', id);
                    $scope.indy_hgt -= 30;
                    _.remove($scope.loan.indyinc, {id: id});
                });
        };

        $scope.updatePlannedCrops = function() {
            alert('working');
        }
        $scope.updateStorage = function() {
            alert('working');
        };

        $scope.updateCropsScreen = function() {
            saveCrops();
            saveYield();
            saveBuyers();
            saveRebators();
            saveIndirects();
            toastr.success('Database records updated.', 'Update Successful');

        }
        //////////
        function getNewCrop(obj) {
            return {
                loan_id: $scope.loan.id,
                crop_id: obj.id,
                crop_measure: obj.measurement,
                bkqty: 0,
                bkprice: 0,
                var_harvest: 0,
                harvest_measure: obj.measurement,
                rebates: 0,
                rebate_measure: obj.rebate_measurement
            };
        }
        function getNewBuyer() {
            return {
                loan_id: $scope.loan.id,
                buyer: '',
                contact: '',
                location: '',
                email: '',
                phone: ''
            };
        }
        function getNewRebator() {
            return {
                loan_id: $scope.loan.id,
                rebator: '',
                contact: '',
                location: '',
                email: '',
                phone: ''
            };
        }
        function getNewIndirect() {
            return {
                loan_id: $scope.loan.id,
                source: '',
                description: '',
                amount: '',
                disc_percent: 100,
                collateral: false
            };
        }

        function saveCrops() {
            _.each($scope.loan.loancrops, function(lc){
                AppFactory.putIt('loancrops', lc.id, lc);
            });
        }
        function saveYield() {
            return true;
            _.each($scope.loan.loancrops, function(lc){
                AppFactory.putIt('loancropyields', lc.id, lc.yields);
            });
        }
        function saveBuyers() {
            _.each($scope.loan.buyers, function(b){
                AppFactory.putIt('buyers', b.id, b);
            });
        }
        function saveRebators() {
            _.each($scope.loan.rebators, function(r){
                AppFactory.putIt('rebators', r.id, r);
            });
        }
        function saveIndirects() {
            _.each($scope.loan.indyinc, function(i){
                AppFactory.putIt('indirectcropincomes', r.id, i);
            });
        }
        function savePlannedCrops() {
            alert('Saving PlannedCrops');
        }
        function saveStorage() {
            alert('Saving Storage');
        }
    } // end controller

    angular
        .module('ARM')
        .controller('ModalInstanceCtrl', function ($scope, $modalInstance, items) {

        $scope.items = items;
        $scope.selected = {
            item: $scope.items[0]
        };

        $scope.ok = function () {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
    });
})();