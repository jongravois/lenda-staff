(function(){
'use strict';
    angular
        .module('ARM')
        .controller('SettingsController', SettingsController);

        SettingsController.$inject = ['$rootScope', '$scope', 'AppFactory', 'toastr'];

        /* @ngInject */
        function SettingsController($rootScope, $scope, AppFactory, toastr) {
            /* jshint validthis: true */
            $scope.showViewOpts = false;
            $scope.showViewFltrs = false;

            if (!$rootScope.currentUser) {
                try {
                    var user = JSON.parse(localStorage.getItem('user'));
                } catch (exception) {
                    $state.go('auth');
                }
            } else {
                var user = $rootScope.currentUser;
            }
            $scope.user = user;
            //console.log('user', $scope.user);

            $scope.togShowViewOpts = function() {
                $scope.showViewOpts = !$scope.showViewOpts;
            };
            $scope.togShowViewFltrs = function() {
                $scope.showViewFltrs = !$scope.showViewFltrs;
            };

            $scope.updateSettings = function() {
                updateUserInfo();
                updateViewPrefs();
                updateViewFilters();
                updateOptimizerFields();
                toastr.success('User settings have been updated.', 'Success');
            };

            //////////
            function updateUserInfo() {
                var oUpd = {
                    phone: $scope.user.phone,
                    email: $scope.user.email,
                    outlook: $scope.user.outlook,
                    comms_email: $scope.user.comms_email,
                    comms_sms: $scope.user.comms_sms,
                    comms_outlook: $scope.user.comms_outlook,
                    comms_online: $scope.user.comms_online
                };
                AppFactory.putIt('users', $scope.user.id, oUpd);
            }
            function updateViewPrefs() {
                var obj = $scope.user.viewopts;
                AppFactory.putIt('viewoptions', $scope.user.id, obj);
            }
            function updateViewFilters() {
                var obj = $scope.user.viewfltrs;
                AppFactory.putIt('viewfilters', $scope.user.id, obj);
            }
            function updateOptimizerFields() {
                var obj = $scope.user.optimopts;
                AppFactory.putIt('optimizerviewoptions', $scope.user.id, obj);
            }

        } // end function
})();