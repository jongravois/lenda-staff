(function() {
    'use strict';

    angular
        .module('ARM')
        .controller('UserController', UserController);

    UserController.$inject = ['$http', '$auth', '$rootScope', 'API_URL'];

    function UserController($http, $auth, $rootScope, API_URL) {
        var vm = this;

        /*jshint -W030 */
        vm.user;
        vm.users;
        vm.locations;
        vm.error;

        var user = JSON.parse(localStorage.getItem('user'));
        $http.get(API_URL + 'users/' + user.id)
            .success(function(rsp){
                vm.user = rsp.data;
                var fulluser = JSON.stringify(rsp.data);
                localStorage.removeItem('user');
                localStorage.setItem('user', fulluser);
            });

        vm.getUsers = function() {
            $http.get(API_URL + 'authenticate')
                .success(function(users) {
                    vm.users = users;
                })
                .error(function(error) {
                    vm.error = error;
                });
        };

        vm.getLocations = function() {
            $http.get(API_URL + 'locations')
                .success(function(locations) {
                    vm.locations = locations.data;
                })
                .error(function(error) {
                    vm.error = error;
                });
        };

        vm.logout = function() {
            $auth.logout()
                .then(function() {
                    localStorage.removeItem('user');
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;
                });
        };
    } // end controller
})();
