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
        $scope.user;
        $scope.users;
        $scope.feeder;
        $scope.defaults;
        $scope.error;

        var user = JSON.parse(localStorage.getItem('user'));
        $http.get(API_URL + 'users/' + user.id)
            .success(function(rsp){
                $scope.user = rsp.data;
                var fulluser = JSON.stringify(rsp.data);
                localStorage.removeItem('user');
                localStorage.setItem('user', fulluser);
            });

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
