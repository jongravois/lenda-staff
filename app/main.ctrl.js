(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('MainController', MainController);

    MainController.$inject = ['$rootScope', '$scope', '$http', '$auth', 'API_URL', 'DefaultsFactory', 'FeederFactory'];

    /* @ngInject */
    function MainController($rootScope, $scope, $http, $auth, API_URL, DefaultsFactory, FeederFactory) {
        /* jshint validthis: true */
        /*jshint -W030 */
        $scope.feeder;
        $scope.defaults;
        $scope.error;

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
        $rootScope.feeder = FeederFactory.getObject();

        DefaultsFactory.init();
        $rootScope.defaults = DefaultsFactory.getObject();
    } // end function
})();
