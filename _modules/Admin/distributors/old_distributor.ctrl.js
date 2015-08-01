(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

        DistributorsController.$inject = ['$filter', '$location', 'AppFactory'];

        /* @ngInject */
        function DistributorsController($filter, $location, AppFactory) {
            /* jshint validthis: true */
            var vm = this;

            AppFactory.getAll('distributors')
                .then(function(rsp){
                    vm.distributors = rsp.data.data;
                });
            AppFactory.getAll('states')
                .then(function(rsp){
                    vm.states = rsp.data.data;
                });

            vm.insertRecord = function() {
                var ids = [];
                _.each(vm.distributors, function(row){
                    ids.push(row.id);
                });
                var max = _.max(ids);
                var nu = getNewRecord(Number(max) + 1);
                vm.distributors.push(nu);
            };
            vm.removeRecord = function(index, id) {
                //TODO: Warning Modal
                AppFactory.deleteIt('distributors', id);
                vm.distributors.splice(index, 1);
            };
            vm.saveRecord = function(record, id) {
                angular.extend(record, {id: id});
                AppFactory.putIt('distributors', id, record);
            }

            //////////
            function getNewRecord(id) {
                return {
                    id: id,
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
        } // end function
})();