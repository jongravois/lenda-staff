(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Loans', 'HomeFactory'];

        /* @ngInject */
        function HomeController(Loans, HomeFactory) {
            /* jshint validthis: true */
            var vm = this;
            vm.loans = Loans;
            console.log(Loans);

            vm.toy = HomeFactory.getJonsToy(vm.loans);
            console.log('GJT', vm.toy);

            vm.reporter = [];
            //////////

        } // end function
})();