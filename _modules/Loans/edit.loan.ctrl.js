(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('EditLoanController', EditLoanController);
    
        EditLoanController.$inject = ['$state', '$stateParams', 'AppFactory', 'LoansFactory'];
    
        /* @ngInject */
        function EditLoanController($state, $stateParams, AppFactory, LoansFactory) {
            /* jshint validthis: true */
            var user = JSON.parse(localStorage.getItem('user'));
            var vm = this;
            vm.calcCashFlow = AppFactory.calcCashFlow;
            vm.calcExposure = AppFactory.calcExposure;
            vm.calcAdjExposure = AppFactory.calcAdjExposure;
            vm.XColView = false;
            vm.showSidebar = user.full_sidebar;
            //console.log(user);

            LoansFactory.getLoan($stateParams.loanID)
                .then(function(rsp){
                    console.log(rsp.data.data);
                    vm.loan = rsp.data.data;
                });

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