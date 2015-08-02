(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$rootScope', '$state', '$stateParams', 'AppFactory', 'DefaultsFactory', 'FeederFactory', 'Loan'];
    
        /* @ngInject */
        function EditLoanController($rootScope, $state, $stateParams, AppFactory, DefaultsFactory, FeederFactory, Loan) {
            /* jshint validthis: true */
            var vm = this;
            //FeederFactory.init();
            //DefaultsFactory.init();

            var user = JSON.parse(localStorage.getItem('user'));
            vm.AppFactory = AppFactory;
            vm.feeder = $rootScope.feeder;
            //vm.feeder = FeederFactory.getObject();
            vm.globals = $rootScope.defaults;
            //vm.globals = DefaultsFactory.getObject();

            vm.loan = Loan;
            console.log('loan', vm.loan);
            vm.user = user;
            vm.states = vm.feeder.states;

            vm.XColView = false; //true;
            vm.showSidebar = user.full_sidebar;
            //console.log('from resolve', Loan);
            //console.log(user);

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