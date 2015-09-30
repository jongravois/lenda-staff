(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PartnersController', PartnersController);

        PartnersController.$inject = ['$rootScope', '$scope', 'SweetAlert', 'AppFactory'];

        function PartnersController($rootScope, $scope, SweetAlert, AppFactory){
            $scope.createNewPartner = function() {
                var newb = getNewPartner();
                AppFactory.postIt('partners', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.applicant.partners.push(newb);
                    });
            };
            $scope.savePartner = function(data, id) {
                AppFactory.putIt('partners', id, data)
                    .then(function(rsp){
                        toastr.success('Updated partner information', 'Success!');
                    });
            };
            $scope.deletePartner = function(index, id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('partners', id);
                        _.remove($scope.loan.applicant.partners, {id: id});
                    });
            };

            $scope.gridOptsPartner = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'partner',
                        enableCellEdit: true,
                        displayName: 'Partner',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'title',
                        enableCellEdit: true,
                        displayName: 'Title',
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
                data: $scope.loan.applicant.partners
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.applicant.partners, function (rawdata) {
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

            $scope.gridOptsPartner.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = 32 + $scope.loan.applicant.partners.length * 30;
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
            function getNewPartner() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    partner: '',
                    ssn: '',
                    email: '',
                    phone: ''
                };
            }
        } // end controller
})();