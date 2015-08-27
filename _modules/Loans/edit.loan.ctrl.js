(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'DefaultsFactory', 'FeederFactory', 'Loan', 'ManFactory'];
    
        /* @ngInject */
        function EditLoanController($rootScope, $scope, $state, AppFactory, DefaultsFactory, FeederFactory, Loan, ManFactory) {
            /* jshint validthis: true */
            $scope.AppFactory = AppFactory;
            $scope.ManFactory = ManFactory;

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
                $scope.globals = $rootScope.defaults;
            }

            $scope.loan = Loan;
            $scope.states = $scope.feeder.states;

            $scope.XColView = false; //true;
            $scope.showSidebar = user.full_sidebar;
            //console.log('EditloansCtrl', $scope.loan);

            $scope.ngcLink = function (slug) {
                //alert(slug);
                $state.go('arm.edit.' + slug);
            };

            $scope.toggleSidebar = function() {
                $scope.showSidebar = !$scope.showSidebar;
                user.full_sidebar = !user.full_sidebar;
                var upd = JSON.stringify(user);
                localStorage.setItem('user', upd);
                AppFactory.patchIt('users', user.id, {full_sidebar: $scope.showSidebar});
            }

            $scope.toggleCrossColateral = function() {
                $scope.XColView = !$scope.XColView;
            }

            //////////
            $scope.updateTerms = function() {
                alert('Updating');
                //TODO: Exception if due_date changed from default
            }
            $scope.updateFarmer = function() {
                alert('updateFarmer');
            }
            //////////

        } // end function
})();