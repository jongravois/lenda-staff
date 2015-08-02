(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$state', '$stateParams', 'AppFactory', 'Loan'];
    
        /* @ngInject */
        function EditLoanController($state, $stateParams, AppFactory, Loan) {
            /* jshint validthis: true */
            var vm = this;

            var user = JSON.parse(localStorage.getItem('user'));

            vm.loan = Loan;

            vm.AppFactory = AppFactory;
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

            vm.updateTerms = function() {
                alert('Updating');
                //TODO: Exception if due_date changed from default
            }

            //////////

        } // end function
})();