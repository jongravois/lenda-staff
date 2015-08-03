(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'Loan'];
    
        /* @ngInject */
        function EditLoanController($rootScope, $scope, $state, AppFactory, Loan) {
            /* jshint validthis: true */
            var vm = this;

            //var user = JSON.parse(localStorage.getItem('user'));
            var user = $rootScope.currentUser;
            vm.user = user;
            vm.AppFactory = AppFactory;
            vm.feeder = $rootScope.feeder;
            vm.globals = $rootScope.defaults;

            vm.loan = Loan;
            $scope.loan = Loan;
            vm.states = vm.feeder.states;

            vm.XColView = false; //true;
            vm.showSidebar = user.full_sidebar;
            //console.log('loan', vm.loan);

            vm.ngcLink = function (slug) {
                //alert(slug);
                $state.go('edit.' + slug);
            };

            vm.toggleSidebar = function() {
                vm.showSidebar = !vm.showSidebar;
                user.full_sidebar = !user.full_sidebar;
                var upd = JSON.stringify(user);
                localStorage.setItem('user', upd);
                AppFactory.patchIt('users/', user.id, {full_sidebar: !vm.showSidebar});
            }

            vm.toggleCrossColateral = function() {
                vm.XColView = !vm.XColView;
            }

            //////////
            vm.updateTerms = function() {
                alert('Updating');
                //TODO: Exception if due_date changed from default
            }
            vm.updateFarmer = function() {
                alert('updateFarmer');
            }
            //////////

        } // end function
})();