(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = [];
    
        /* @ngInject */
        function EditLoanController() {
            /* jshint validthis: true */
            var vm = this;
            vm.XColView = false;
            vm.showSidebar = true;
            
            //////////
            
        } // end function
})();