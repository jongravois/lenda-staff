(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AdminController', AdminController);
    
        AdminController.$inject = ['$state', 'AppFactory'];
    
        /* @ngInject */
        function AdminController($state, AppFactory) {
            /* jshint validthis: true */
            var vm = this;
            closeAll();
            vm.system_section = true;

            vm.ngcLink = function (slug) {
                //alert(slug);
                if(slug === 'reports') {
                    closeAll();
                }
                $state.go('admin.' + slug);
            };

            vm.toggleSection = function(slug) {
                closeAll();
                switch(slug){
                    case 'feeders':
                        vm.feeders_section = true;
                        break;
                    case 'library':
                        vm.library_section = true;
                        break;
                    case 'loans':
                        vm.loans_section = true;
                        break;
                    case 'system':
                        vm.system_section = true;
                        break;
                    case 'users':
                        vm.users_section = true;
                        break;
                };
            }
            
            //////////
            function closeAll() {
                vm.feeders_section = false;
                vm.library_section = false;
                vm.loans_section = false;
                vm.system_section = false;
                vm.users_section = false;
            }
        } // end function
})();