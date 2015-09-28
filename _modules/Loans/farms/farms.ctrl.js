(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FarmsController', FarmsController);

        FarmsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FarmsController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            //console.log($scope.loan.farms);

            $scope.pgms = [
                {abr: 'N/A', pgm: 'N/A'},
                {abr: 'ARCc', pgm: 'ARCc'},
                {abr: 'ARCf', pgm: 'ARCf'},
                {abr: 'PLC', pgm: 'PLC'}
            ];

            $scope.addNewFarm = function() {
                alert('working');
            }
            $scope.saveFarm = function(data, id) {
                alert('working');
            }
            $scope.deleteFarm = function(index, id) {
                alert('working');
            }
            $scope.updateFarms = function() {
                alert('working');
            }

            $scope.gridOpts = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'county.locale',
                        enableCellEdit: true,
                        displayName: 'Locale',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '140'
                    },
                    {
                        name: 'fsn',
                        enableCellEdit: true,
                        displayName: 'FSN',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'owner',
                        enableCellEdit: true,
                        displayName: 'Landlord',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'IR',
                        enableCellEdit: true,
                        displayName: 'AC-IR',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'NI',
                        enableCellEdit: true,
                        displayName: 'AC-NI',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'share_rent',
                        enableCellEdit: true,
                        displayName: 'Share',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
                    },
                    {
                        name: 'cash_rent',
                        enableCellEdit: true,
                        displayName: 'Cash Rent',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
                    },
                    {
                        name: 'when_due',
                        enableCellEdit: true,
                        displayName: 'Due',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '160'
                    },
                    {
                        name: 'waived',
                        enableCellEdit: true,
                        displayName: 'Waived',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
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
                data: $scope.loan.farms
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.farms, function (rawdata) {
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

            $scope.gridOpts.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = $scope.loan.farms.length * 50;
                $scope.wdt = 990;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //////////
            function getNewFarm() {
                return {
                    loan_id: $scope.loan.id,
                    fsn: '',
                    county_id: '',
                    owner: '',
                    share_rent: 0,
                    dist_rent: 0,
                    waived: 0,
                    when_due: '',
                    IR: 0,
                    NI: 0
                };
            }
        } // end controller
})();