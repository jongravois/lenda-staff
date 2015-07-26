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
            vm.feeders_section = false;
            vm.library_section = false;
            vm.loans_section = false;
            vm.system_section = false;
            vm.users_section = false;

            vm.ngcLink = function (slug) {
                //alert(slug);
                $state.go('admin.' + slug);
            };

            vm.toggleSection = function(slug) {
                switch(slug){
                    case 'feeders':
                        vm.feeders_section = !vm.feeders_section;
                        break;
                    case 'library':
                        vm.library_section = !vm.library_section;
                        break;
                    case 'loans':
                        vm.loans_section = !vm.loans_section;
                        break;
                    case 'system':
                        vm.system_section = !vm.system_section;
                        break;
                    case 'users':
                        vm.users_section = !vm.users_section;
                        break;
                };
            }
            
            //////////
            
        } // end function
})();