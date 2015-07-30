(function(){
'use strict';
    angular
        .module('ARM')
        .controller('SettingsController', SettingsController);

        SettingsController.$inject = ['AppFactory', 'toastr'];

        /* @ngInject */
        function SettingsController(AppFactory, toastr) {
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
                updateUserInfo();
                updateViewPrefs();
                updateViewFilters();
                updateOptimizerFields();
                toastr.success('User settings have been updated.', 'Success');
            }

            vm.user = JSON.parse(localStorage.getItem('user'));
            //console.log(vm.user);

            //////////
            function updateUserInfo() {
                var oUpd = {
                    phone: vm.user.phone,
                    email: vm.user.email,
                    outlook: vm.user.outlook,
                    comms_email: vm.user.comms_email,
                    comms_sms: vm.user.comms_sms,
                    comms_outlook: vm.user.comms_outlook,
                    comms_online: vm.user.comms_online
                };
                AppFactory.putIt('users', vm.user.id, oUpd);
            }
            function updateViewPrefs() {
                var obj = vm.user.viewopts;
                AppFactory.putIt('viewoptions', vm.user.id, obj);
            }
            function updateViewFilters() {
                var obj = vm.user.viewfltrs;
                AppFactory.putIt('viewfilters', vm.user.id, obj);
            }
            function updateOptimizerFields() {
                var obj = vm.user.optimopts;
                AppFactory.putIt('optimizerviewoptions', vm.user.id, obj);
            }

        } // end function
})();