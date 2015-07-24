(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('MenuController', MenuController);

        MenuController.$inject = ['MenuFactory'];

        /* @ngInject */
        function MenuController(MenuFactory) {
            /* jshint validthis: true */
            var vm = this;
            MenuFactory.getLoantypes()
                .then(function success(rsp) {
                    vm.loantypes = rsp.data.data;
                });
            MenuFactory.getReports()
                .then(function success(rsp) {
                    vm.reports = rsp.data.data;
                });
            vm.status = { isopen: false };

            //////////
            vm.toggled = function (open) {
                //$log.log('Dropdown is now: ', open);
            };
            vm.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                vm.status.isopen = !vm.status.isopen;
            };


        } // end function
})();