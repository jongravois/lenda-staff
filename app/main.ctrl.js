(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$http', '$auth', '$rootScope', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($http, $auth, $rootScope, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        var vm = this;

        /*jshint -W030 */
        vm.users;
        vm.error;

        vm.getUsers = function () {
            $http.get(API_URL + 'authenticate')
                .success(function (users) {
                    vm.users = users;
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
        vm.feeder = FeederFactory.getObject();
        console.log(vm.feeder);

        DefaultsFactory.init();
        vm.defaults = DefaultsFactory.getObject();
        console.log(vm.defaults);
    } // end function
})();
