(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$http', '$auth', '$state', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($rootScope, $scope, $http, $auth, $state, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        /*jshint -W030 */
        $scope.authenticated = false; //($rootScope.authenticated ? true : false);
        $scope.user;
        $scope.users;
        $scope.feeder;
        $scope.defaults;
        $scope.loginError = false;
        $scope.error = false;
        $scope.loginErrorText;

        init();

        $scope.login = function (credentials) {
            $auth.login(credentials)
                .then(function () {
                    return $http.get(API_URL + 'authenticate/user');
                }, function (error) {
                    $scope.loginError = true;
                    $scope.loginErrorText = error.data.error;
                })
                .then(function (rsp) {
                    if(rsp) {
                        var user = rsp.data.data[0];
                        $http.get(API_URL + 'users/' + user.id)
                            .success(function (rsp) {
                                $scope.user = rsp.data;
                                var strUser = JSON.stringify(rsp.data);
                                localStorage.setItem('user', strUser);
                                $scope.authenticated = $rootScope.authenticated = true;
                                $rootScope.currentUser = rsp.data;
                                bootstrapApp();
                                $state.go('arm.home');
                            });
                    }
                });
        };

        $scope.logout = function () {
            $auth.logout()
                .then(function () {
                    localStorage.removeItem('user');
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;
                    $state.go('auth');
                });
        };


        //////////
        function init() {
            if(!$scope.authenticated) {
                $state.go('auth');
            } else {
                $state.go('arm.home');
            }
        }
        function bootstrapApp() {
            // FEEDER LISTS
            FeederFactory.init();
            $rootScope.feeder = FeederFactory.getObject();

            //DefaultsFactory.init();
            $rootScope.defaults = DefaultsFactory.getObject();
        }
    } // end function
})();
