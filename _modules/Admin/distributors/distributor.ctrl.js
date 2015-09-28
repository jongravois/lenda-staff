(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('Admin_DistributorsController', Admin_DistributorsController);

        Admin_DistributorsController.$inject = ['$rootScope', '$scope', '$filter', '$location', 'SweetAlert', 'AppFactory', 'List', 'States'];

        /* @ngInject */
        function Admin_DistributorsController($rootScope, $scope, $filter, $location, SweetAlert, AppFactory, List, States ) {
            /* jshint validthis: true */
            init();
            $scope.dirty = false;

            $scope.distributors = List.data.data;
            $scope.states = States.data.data;
            //console.log($scope.distributors);
            //console.log($scope.states);

            $scope.createNew = function () {
                var newb = getNewRecord();
                AppFactory.postIt('distributors', newb)
                    .then(function(rsp){
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.distributors.push(newb);
                        $scope.hgt = $scope.hgt + 40;
                        $scope.gridApi.gridHeight = $scope.hgt;
                        //console.log($scope.distributors);
                    });
            };
            $scope.saveRecord = function(data, id){
                AppFactory.putIt('distributors', id, data)
                    .then(function(rsp){
                        var record = rsp.data;
                        AppFactory.getOne('states', record.state_id)
                            .then(function(rsp){
                                var state_abr = rsp.data.data.abr;
                                _.each($scope.distributors, function(i){
                                    if(i.id === id) {
                                        i.state_abr = state_abr;
                                    }
                                });
                            });
                    });
            };
            $scope.saveAll = function () {
                _.each($scope.distributors, function(i){
                    if(!i.state || Number(i.state) === 0) {
                        i.state = 52;
                    }
                    AppFactory.putIt('distributors', i.id, i);
                });
                $scope.dirty = false;
            };
            $scope.deleteOne = function(id) {
                //alert(id);
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('distributors', id);
                        _.remove($scope.distributors, {id: id});
                    });
            }

            $scope.gridOpts = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'name',
                        enableCellEdit: true,
                        displayName: 'Distributor',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'distributor',
                        enableCellEdit: true,
                        displayName: 'ABR',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '50'
                    },
                    {
                        name: 'address',
                        enableCellEdit: true,
                        displayName: 'Address',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'city',
                        enableCellEdit: true,
                        displayName: 'City',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'state',
                        enableCellEdit: true,
                        displayName: 'ST',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        editableCellTemplate: 'ui-grid/dropdownEditor',
                        editDropdownValueLabel: 'abr',
                        editDropdownOptionsArray: $scope.states,
                        cellFilter: 'stateabr',
                        width: '40'
                    },
                    {
                        name: 'zip',
                        enableCellEdit: true,
                        displayName: 'Zip',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'phone',
                        enableCellEdit: true,
                        displayName: 'Phone',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '100'
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
                data: $scope.distributors
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.distributors, function (rawdata) {
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
                $scope.hgt = 32 + $scope.distributors.length * 30;
                $scope.wdt = 940; //TODO: calculate
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //////////
            function init() {
                //console.log($location.path());
                var feeders = ['/admin/agents', '/admin/crops', '/admin/distributors', '/admin/entitytypes', '/admin/instypes', '/admin/loantypes', '/admin/locations', '/admin/measures', '/admin/regions', '/admin/roles'];

                if( AppFactory.inArray($location.path(), feeders) ) {
                    $scope.feeders_section = true;
                }
            }
            function getNewRecord() {
                return {
                    distributor: '---',
                    name: 'Distributor',
                    address: 'Address',
                    city: 'City',
                    state: 1,
                    zip: '99999',
                    phone: '9999999999',
                    email: 'email'
                };
            }
        } // end function
})();