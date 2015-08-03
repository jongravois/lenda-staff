(function () {
    'use strict';

    angular
        .module('ARM')
        .controller('AuthController', AuthController);

    AuthController.$inject = ['$scope', '$auth', '$state', '$http', '$rootScope', 'API_URL'];

    function AuthController($scope, $auth, $state, $http, $rootScope, API_URL) {
        var vm = this;

        /*jshint -W030 */
        vm.loginError = false;
        vm.loginErrorText;

        vm.login = function () {
            var credentials = {
                email: vm.email,
                password: vm.password
            };

            $auth.login(credentials)
                .then(function () {
                    return $http.get(API_URL + 'authenticate/user');
                }, function (error) {
                    vm.loginError = true;
                    vm.loginErrorText = error.data.error;
                }).then(function (rsp) {
                    var user = JSON.stringify(rsp.data.data[0]);
                    localStorage.setItem('user', user);
                    $rootScope.authenticated = true;
                    $rootScope.currentUser = rsp.data.data[0];

                    //$state.go('locations');
                    $state.go('main.home');
                });
        }; // end authenticate function
    } // end controller
})();
