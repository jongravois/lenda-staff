(function() {
    'use strict';

    angular
        .module('ARM')
        .controller('UserController', UserController);

<<<<<<< HEAD
    UserController.$inject = ['$rootScope', '$scope', 'AppFactory'];

    function UserController($rootScope, $scope, AppFactory) {

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
        //console.log('user', user);

        AppFactory.getAll('users')
            .then(function(rsp){
                $scope.users = rsp.data.data;
            });
=======
    UserController.$inject = ['$rootScope', '$scope', '$http', '$auth', 'API_URL'];

    function UserController($rootScope, $scope, $http, $auth, API_URL) {
        
        /*jshint -W030 */
        $scope.user;
        $scope.users;
        $scope.locations;
        $scope.error;

        var user = JSON.parse(localStorage.getItem('user'));
        $http.get(API_URL + 'users/' + user.id)
            .success(function(rsp){
                $scope.user = rsp.data;
                var fulluser = JSON.stringify(rsp.data);
                localStorage.removeItem('user');
                localStorage.setItem('user', fulluser);
            });

        $scope.getUsers = function() {
            $http.get(API_URL + 'authenticate')
                .success(function(users) {
                    $scope.users = users;
                })
                .error(function(error) {
                    $scope.error = error;
                });
        };

        $scope.getLocations = function() {
            $http.get(API_URL + 'locations')
                .success(function(locations) {
                    $scope.locations = locations.data;
                })
                .error(function(error) {
                    $scope.error = error;
                });
        };

        $scope.logout = function() {
            $auth.logout()
                .then(function() {
                    localStorage.removeItem('user');
                    localStorage.removeItem('currentUserID');
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;
                });
        };
>>>>>>> work
    } // end controller
})();
