(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('NewLoanController', NewLoanController);

        NewLoanController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'DefaultsFactory', 'FeederFactory'];

        function NewLoanController($rootScope, $scope, $state, $stateParams, AppFactory, DefaultsFactory, FeederFactory){
            /* jshint validthis: true */
            $scope.newapplication = $state.current.data.newapplication;
            $scope.AppFactory = AppFactory;

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

            if(!$rootScope.feeder) {
                FeederFactory.init();
                $scope.feeder = FeederFactory.getObject();
            } else {
                $scope.feeder = $rootScope.feeder;
            }

            if(!$rootScope.defaults) {
                DefaultsFactory.init();
                $scope.defaults = DefaultsFactory.getObject();
            } else {
                $scope.defaults = $rootScope.defaults;
            }

            $scope.states = $scope.feeder.states;

            $scope.XColView = false; //true;
            $scope.showSidebar = user.full_sidebar;

            $scope.ngcLink = function (slug) {
                //alert(slug);
                $state.go('arm.new.' + slug);
            };

            $scope.toggleSidebar = function() {
                $scope.showSidebar = !$scope.showSidebar;
                user.full_sidebar = !user.full_sidebar;
                var upd = JSON.stringify(user);
                localStorage.setItem('user', upd);
                AppFactory.patchIt('users', user.id, {full_sidebar: $scope.showSidebar});
            }
        } // end controller
})();