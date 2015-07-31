(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReportsController', ReportsController);

        ReportsController.$inject = ['Loans', 'ReportsFactory'];

        /* @ngInject */
        function ReportsController(Loans, ReportsFactory) {
            /* jshint validthis: true */
            var vm = this;
            vm.loans = Loans;
            console.log(Loans);

            vm.toy = ReportsFactory.getJonsToy(vm.loans);
            console.log('GJT', vm.toy);

            vm.reporter = [];
            //////////

        } // end function
})();