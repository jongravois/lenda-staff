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

            vm.arr = HomeFactory.getJons(vm.loans);
            console.log(vm.arr);

            vm.reporter = [];
            //////////

        } // end function
})();