(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

    DistributorsController.$inject = ['$filter', '$location', 'SweetAlert', 'AppFactory', 'List'];

    /* @ngInject */
    function DistributorsController($filter, $location, SweetAlert, AppFactory, List) {
        /* jshint validthis: true */
        var vm = this;
        vm.distributors = List.data.data;
        vm.hgt = vm.distributors.length * 38;
        console.log(vm.distributors);

        //AppFactory.getAll('distributors')
        //    .then(function(rsp){
        //        var distributors = rsp.data.data;
        //        vm.distributors = distributors;
        //    });
        AppFactory.getAll('states')
            .then(function (rsp) {
                vm.states = rsp.data.data;
            });

        var columnDefs = [
            {
                field: 'distributor',
                headerName: 'Abr',
                headerTooltip: 'Abr',
                editable: true,
                suppressSizeToFit: true,
                width: 70
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
                width: 140
            },
            {
                field: 'state_id',
                headerName: 'ST',
                headerTooltip: 'State',
                editable: true,
                width: 140
            },
            {
                field: 'zip',
                headerName: 'Zip',
                headerTooltip: 'Zip',
                editable: true,
                width: 140
            },
            {
                field: 'phone',
                headerName: 'Phone',
                headerTooltip: 'Phone',
                editable: true,
                width: 140
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
        vm.sweetie = function() {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "Your will not be able to recover this imaginary file!",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Yes, delete it!",
                    closeOnConfirm: false},
                function(){
                    SweetAlert.swal("Booyah!");
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