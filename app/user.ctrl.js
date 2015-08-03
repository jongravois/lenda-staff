(function() {
    'use strict';

    angular
        .module('ARM')
        .controller('UserController', UserController);

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
    } // end controller
})();
