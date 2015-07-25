(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('SettingsController', SettingsController);

        SettingsController.$inject = [];

        /* @ngInject */
        function SettingsController() {
            /* jshint validthis: true */
            var vm = this;
            vm.showViewOpts = false;
            vm.showViewFltrs = false;

            vm.togShowViewOpts = function() {
                vm.showViewOpts = !vm.showViewOpts;
            };
            vm.togShowViewFltrs = function() {
                vm.showViewFltrs = !vm.showViewFltrs;
            };

            vm.updateSettings = function() {
                alert('Updating');
            }

            vm.user = JSON.parse(localStorage.getItem('user'));
            console.log(vm.user);

            //////////


        } // end function
})();