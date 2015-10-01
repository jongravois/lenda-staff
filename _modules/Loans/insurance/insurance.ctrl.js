(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('InsuranceController', InsuranceController);

        InsuranceController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function InsuranceController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;

            $scope.toggleStax = function(id) {
                var rowid = Number(id) - 1;

                $scope.loan.insurance.policies[rowid].showStax = !$scope.loan.insurance.policies[rowid].showStax;
                return true;
            }

            //AGENT
            $scope.createNewAgent = function() {
                alert('Create new agent')
            };

            $scope.gridOptsAgents = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'agency',
                        enableCellEdit: true,
                        displayName: 'Agency',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'agent',
                        enableCellEdit: true,
                        displayName: 'Agent',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'city_state',
                        enableCellEdit: true,
                        displayName: 'Location',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '170'
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
                        width: '180'
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
                data: $scope.loan.agents
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.agents, function (rawdata) {
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

            $scope.gridOptsAgents.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = 32 + $scope.loan.agents.length * 30;
                $scope.wdt = 900;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //AGENT

            //POLICIES
            $scope.createNewPolicy = function() {
                alert('Create new policy')
            };

            $scope.gridOptsPolicies = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'county.locale',
                        enableCellEdit: true,
                        displayName: 'St|Cnty',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'crop_name',
                        enableCellEdit: true,
                        displayName: 'Crop',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'practice',
                        enableCellEdit: true,
                        displayName: 'Prac',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '50'
                    },
                    {
                        name: 'type',
                        enableCellEdit: true,
                        displayName: 'Type',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'unit',
                        enableCellEdit: true,
                        displayName: 'Unit',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'options',
                        enableCellEdit: true,
                        displayName: 'Options',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'ins_level',
                        enableCellEdit: true,
                        displayName: 'Level',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'ins_price',
                        enableCellEdit: true,
                        displayName: 'Price',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:4',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'mpci',
                        enableCellEdit: true,
                        displayName: 'MPCI',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'stax_sco',
                        enableCellEdit: true,
                        displayName: 'Stax/SCO',
                        cellClass: 'text-right',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'premium',
                        enableCellEdit: true,
                        displayName: 'Premium',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:2',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'planting_days',
                        enableCellEdit: true,
                        displayName: 'Late',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '52'
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
                data: $scope.loan.insurance.policies
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.insurance.policies, function (rawdata) {
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

            $scope.gridOptsPolicies.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.pol_hgt = 32 + $scope.loan.insurance.policies.length * 30;
                $scope.pol_wdt = 980;
                $scope.gridApi.gridHeight = $scope.pol_hgt;
                $scope.gridApi.gridWidth = $scope.pol_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //POLICIES

            //APH
            $scope.createNewDatabase = function() {
                alert('Create new APH Database')
            };

            $scope.gridOptsDatabases = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'county.locale',
                        enableCellEdit: true,
                        displayName: 'St|Cnty',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'crop_name',
                        enableCellEdit: true,
                        displayName: 'Crop',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'practice',
                        enableCellEdit: true,
                        displayName: 'Practice',
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
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
                        cellClass: 'text-center cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'perm2ins',
                        enableCellEdit: true,
                        displayName: 'Perm',
                        cellClass: 'text-center cBlue',
                        cellFilter: 'booleanYN',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'ins_share',
                        enableCellEdit: true,
                        displayName: 'Ins Share',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroPercent:1',
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
                data: $scope.loan.insurance.database
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.insurance.database, function (rawdata) {
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

            $scope.gridOptsDatabases.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.db_hgt = 32 + $scope.loan.insurance.database.length * 30;
                $scope.db_wdt = 750;
                $scope.gridApi.gridHeight = $scope.db_hgt;
                $scope.gridApi.gridWidth = $scope.db_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //APH

            //////////
            function getNewAgent() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    partner: '',
                    ssn: '',
                    email: '',
                    phone: ''
                };
            }

            //console.log('pols',$scope.loan.inspols, 'loan', $scope.loan);
        } // end controller
})();