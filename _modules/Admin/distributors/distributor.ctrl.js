(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

    DistributorsController.$inject = ['$filter', '$location', 'AppFactory', 'List'];

    /* @ngInject */
    function DistributorsController($filter, $location, AppFactory, List) {
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
            enableSorting: false,
            context: {},
            ready: function (api) {
                api.setRows(vm.distributors);
                api.sizeColumnsToFit();
            }
        };

        vm.createNew = function () {
            alert('Creating');
        };
        vm.saveAll = function () {
            alert('Saving');
        };
        vm.deleteOne = function(id) {
            alert('Deleting '+id);
        }
        //////////
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