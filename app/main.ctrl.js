(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$http', '$auth', '$state', '$location', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($rootScope, $scope, $http, $auth, $state, $location, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        /*jshint -W030 */
        $scope.authenticated = ($rootScope.authenticated ? true : false);
        $scope.CY = moment().format('YYYY');

        $scope.user;
        $scope.users;
        $scope.feeder;
        $scope.defaults;
        $scope.loginError = false;
        $scope.error = false;
        $scope.loginErrorText;

        init();
        if(!$scope.feeder || !$scope.defaults) {
            bootstrapApp();
        }

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
                                //console.log('rsp', rsp);
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

        $scope.doSort = function(field) {
            //TODO: create table sorter
            alert('working');
        }

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
            $scope.feeder = FeederFactory.getObject();
            //console.log('Feeder', $scope.feeder);

            DefaultsFactory.init();
            $rootScope.defaults = DefaultsFactory.getObject();
            $scope.defaults = DefaultsFactory.getObject();
            //console.log('Defaults', $scope.defaults);
        }
    } // end function
})();
