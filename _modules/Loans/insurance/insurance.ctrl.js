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
                $scope.hgt = $scope.loan.agents.length * 58;
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