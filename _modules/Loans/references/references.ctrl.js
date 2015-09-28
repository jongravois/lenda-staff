(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReferencesController', ReferencesController);

        ReferencesController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'SweetAlert', 'AppFactory'];

        function ReferencesController($rootScope, $scope, $state, $stateParams, SweetAlert, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;

            if($scope.loan.applicant.rup_exp) {
                $scope.loan.applicant.rup_exp = new Date($scope.loan.applicant.rup_exp);
            }

            $scope.tggl = {
                showDistributor: false,
                showReference: false
            };


            $scope.saveReference = function(data, id) {
                AppFactory.putIt('references', id, data);
            };
            $scope.updateReferences = function() {
                AppFactory.putIt('distributors', $scope.loan.distributor.id, $scope.loan.distributor);
                _.each($scope.loan.references, function(i){
                 AppFactory.putIt('references', i.id, i);
                 });
            }
            $scope.createNewReference = function () {
                var newb = getNewRecord();
                AppFactory.postIt('references', newb)
                    .then(function(rsp){
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.references.push(newb);
                        //console.log($scope.distributors);
                    });
            };
            $scope.deleteReference = function(index, id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('references', id);
                        _.remove($scope.loan.references, {id: id});
                    });
            }
            $scope.doSort = function(propName) {
                $scope.sortBy = propName;
                $scope.reverse = !$scope.reverse;
            };

            $scope.gridOptsReferences = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'creditor',
                        enableCellEdit: true,
                        displayName: 'Creditor',
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
                        name: 'city_state',
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
                data: $scope.loan.references
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.references, function (rawdata) {
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

            $scope.gridOptsReferences.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = $scope.loan.references.length * 50;
                $scope.wdt = 870;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //////////
            function getNewRecord() {
                return {
                    loan_id: $stateParams.loanID,
                    creditor: '',
                    contact: '',
                    city_state: '',
                    phone: '',
                    email: ''
                };
            }
        } // end controller
})();