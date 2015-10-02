(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FsaController', FsaController);

        FsaController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function FsaController($rootScope, $scope, AppFactory){
            $scope.AppFactory = AppFactory;
            console.log($scope.loan.fsa_payments);

            $scope.pgms = [
                {abr: 'N/A', pgm: 'N/A'},
                {abr: 'ARCc', pgm: 'ARCc'},
                {abr: 'ARCf', pgm: 'ARCf'},
                {abr: 'PLC', pgm: 'PLC'}
            ];

            $scope.saveFSA = function(data, id) {
                alert('working');
            }
            $scope.deleteFSA = function(index, id) {
                alert('working');
            }
            $scope.updateFSA = function() {
                alert('working');
            }

            $scope.gridOpts = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'farms.county.locale',
                        enableCellEdit: false,
                        displayName: 'ST | Cnty',
                        cellClass: 'text-left',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '140'
                    },
                    {
                        name: 'fsn',
                        enableCellEdit: false,
                        displayName: 'FSN',
                        cellClass: 'text-left',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '60'
                    },
                    {
                        name: 'pgm',
                        enableCellEdit: true,
                        displayName: 'FSA Pgm',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
                    },
                    {
                        name: 'base_acres',
                        enableCellEdit: true,
                        displayName: 'Base Acres',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
                    },
                    {
                        name: 'fsa_yield',
                        enableCellEdit: true,
                        displayName: 'FSA Yield',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
                    }
                ],
                data: $scope.loan.fsa_payments
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.fsa_payments, function (rawdata) {
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
                $scope.hgt = 32 + $scope.loan.fsa_payments.length * 30;
                $scope.wdt = 500;
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