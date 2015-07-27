(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

        DistributorsController.$inject = ['AppFactory'];

        /* @ngInject */
        function DistributorsController(AppFactory) {
            /* jshint validthis: true */
            var vm = this;

            vm.insertNew = function() {
                var ids = [];
                _.each(vm.distributors, function(row){
                    ids.push(row.id);
                });
                var max = _.max(ids);
                var nu = getNewRecord(Number(max) + 1);
                AppFactory.postIt('distributors', nu);
                vm.distributors.push(nu);
            }

            AppFactory.getAll('distributors')
                .then(function(rsp){
                    vm.distributors = rsp.data.data;
                });

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