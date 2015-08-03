(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', '$http', '$auth', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($scope, $http, $auth, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        /*jshint -W030 */
        $scope.users;
        $scope.feeder;
        $scope.defaults;
        $scope.error;

        $scope.getUsers = function () {
            $http.get(API_URL + 'authenticate')
                .success(function (users) {
                    $scope.users = users;
                })
                .error(function (error) {
                    $scope.error = error;
                });
        };

        $scope.logout = function () {
            $auth.logout()
                .then(function () {
                    localStorage.removeItem('user');
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;
                });
        };

        // FEEDER LISTS
        FeederFactory.init();
        $scope.feeder = FeederFactory.getObject();

        DefaultsFactory.init();
        $scope.defaults = DefaultsFactory.getObject();
    } // end function
})();
