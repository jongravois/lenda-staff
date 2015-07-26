(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$state', 'AppFactory'];
    
        /* @ngInject */
        function EditLoanController($state, AppFactory) {
            /* jshint validthis: true */
            var user = JSON.parse(localStorage.getItem('user'));
            var vm = this;
            vm.XColView = false;
            vm.showSidebar = user.full_sidebar;
            //console.log(user);

            vm.ngcLink = function (slug) {
                //alert(slug);
                $state.go('^.' + slug);
            };

            vm.toggleSidebar = function() {
                vm.showSidebar = !vm.showSidebar;
                user.full_sidebar = !user.full_sidebar;
                var upd = JSON.stringify(user);
                localStorage.setItem('user', upd);
                AppFactory.patchIt('users/', user.id, {full_sidebar: !vm.showSidebar});
            }
            
            //////////

        } // end function
})();