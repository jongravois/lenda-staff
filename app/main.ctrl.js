(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$http', '$auth', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($rootScope, $http, $auth, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        var vm = this;

        /*jshint -W030 */
        vm.users;
        vm.feeder;
        vm.defaults;
        vm.error;

        vm.getUsers = function () {
            $http.get(API_URL + 'authenticate')
                .success(function (users) {
                    vm.users = users;
                    $rootScope.allUsers = users;
                })
                .error(function (error) {
                    vm.error = error;
                });
        };

        vm.logout = function () {
            $auth.logout()
                .then(function () {
                    localStorage.removeItem('user');
                    $rootScope.authenticated = false;
                    $rootScope.currentUser = null;
                });
        };

        // FEEDER LISTS
        FeederFactory.init();
        $rootScope.feeder = FeederFactory.getObject();

        DefaultsFactory.init();
        $rootScope.defaults = DefaultsFactory.getObject();
    } // end function
})();
