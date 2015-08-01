(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

    DistributorsController.$inject = ['$filter', '$location', '$timeout', 'SweetAlert', 'AppFactory', 'List', 'States'];

    /* @ngInject */
    function DistributorsController($filter, $location, $timeout, SweetAlert, AppFactory, List, States) {
        /* jshint validthis: true */
        var vm = this;
        var setSelectOpts = [];
        vm.distributors = List.data.data;
        vm.hgt = vm.distributors.length * 38;
        vm.states = States.data.data;
        setSelectOpts = vm.setSelectOpts = vm.states;
        console.log(vm.distributors, vm.states);

        var columnDefs = [
            {
                field: 'distributor',
                headerName: 'Abr',
                headerTooltip: 'Abr',
                editable: true,
                suppressSizeToFit: true,
                width: 60
            },
            {
                field: 'name',
                headerName: 'Distributor',
                headerTooltip: 'Distributor',
                editable: true,
                width: 140
            },
            {
                field: 'address',
                headerName: 'Address',
                headerTooltip: 'Address',
                editable: true,
                width: 140
            },
            {
                field: 'city',
                headerName: 'City',
                headerTooltip: 'City',
                editable: true,
                width: 120
            },
            {
                field: 'state_id',
                headerName: 'ST',
                headerTooltip: 'State',
                editable: true,
                cellRenderer: statesEditor,
                suppressSizeToFit: true,
                width: 50
            },
            {
                field: 'zip',
                headerName: 'Zip',
                headerTooltip: 'Zip',
                editable: true,
                suppressSizeToFit: true,
                width: 80
            },
            {
                field: 'phone',
                headerName: 'Phone',
                headerTooltip: 'Phone',
                editable: true,
                cellRenderer: function(params) {
                    return $filter('phone')(params.data.phone);
                },
                suppressSizeToFit: true,
                width: 120
            },
            {
                field: 'email',
                headerName: 'Email',
                headerTooltip: 'Email',
                editable: true,
                width: 140
            },
            {
                field: '',
                headerName: 'Del',
                suppressSorting: true,
                templateUrl: './_modules/Admin/_views/admin.delete.partial.html',
                cellClass: 'text-center',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 32
            }
        ];

        vm.gridOptions = {
            angularCompileRows: true,
            angularCompileHeaders: true,
            columnDefs: columnDefs,
            rowData: null,
            rowHeight: 32,
            colWidth: 100,
            groupHeaders: false,
            rowSelection: false,
            rowDeselection: true,
            enableSorting: false,
            context: {},
            ready: function (api) {
                api.setRows(vm.distributors);
                api.sizeColumnsToFit();
            }
        };

        vm.createNew = function () {
            var newb = getNewRecord();
            AppFactory.postIt('distributors', newb)
                .then(function(rsp){
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    vm.distributors.push(newb);
                    vm.hgt += 38;
                    vm.gridOptions.api.setRows(vm.distributors);
                    //console.log(vm.distributors);
                });
        };
        vm.saveAll = function () {
            _.each(vm.distributors, function(i){
                AppFactory.putIt('distributors', i.id, i);
            });
        };
        vm.deleteOne = function(id) {
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
                    _.remove(vm.distributors, {id: id});
                    vm.hgt -= 38;
                    vm.gridOptions.api.setRows(vm.distributors);
                });
        }
        //////////
        function getNewRecord() {
            return {
                //id: id,
                distributor: '--',
                name: '--',
                address: '--',
                city: '--',
                state_id: 1,
                zip: '--',
                phone: '--',
                email: '--'
            };
        }
        function statesEditor(params) {
            params.vm = vm;

            var html = '<span ng-show="!editing" ng-click="startEditing()">{{data.state_abr}}</span> ' +
                '<select ng-blur="editing=false" ng-change="editing=false" ng-show="editing" ng-options="item for item in vm.setSelectOpts" ng-model="data.'+params.colDef.field+'">';

            var domElement = document.createElement("span");
            domElement.innerHTML = html;

            params.vm.startEditing = function() {
                params.vm.editing = true;
                $timeout(function () {
                    var select = domElement.querySelector('select');
                    select.focus();
                }, 0);
            };

            return domElement;
        }
        function numberNewValueHandler(params) {
            var valueAsNumber = parseInt(params.newValue);
            if (isNaN(valueAsNumber)) {
                window.alert("Invalid value " + params.newValue + ", must be a number");
            } else {
                params.data[params.colDef.field] = valueAsNumber;
            }
        }
        function cellValueChangedFunction() {
            vm.gridOptions.api.softRefreshView();
        }
        function gtZero(value) {
            var val = Number(value);
            if (val <= 0) {
                return 'text-center';
            }
            else {
                return 'text-right';
            }
        }
    } // end function
})();