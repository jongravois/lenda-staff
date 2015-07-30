(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ManagementController', ManagementController);

        ManagementController.$inject = ['$location', 'AppFactory', 'LoansFactory'];

        /* @ngInject */
        function ManagementController($location, AppFactory, LoansFactory) {
            /* jshint validthis: true */
            var vm = this;

            var data = [];
            var user = JSON.parse(localStorage.getItem('user'));
            vm.user = user;
            //console.log('user', user);

            vm.pendingView = true;
            vm.sortPending = sortPending;
            var indWid = AppFactory.getIndicatorWidth(vm.user);

            vm.sortLoans = AppFactory.sortLoans;
            vm.landing_view = 'settings';

            LoansFactory.getLoans()
                .then(function(rsp){
                    var loans = rsp.data.data;
                    vm.loans = loans;
                    vm.indWid = AppFactory.getIndicatorWidth(vm.user);

                    //comments
                    _.each(loans, function(item){
                        //console.log('loans', item);
                        item.has_comment = false;
                        if(item.comments.length !== 0) {
                            _.each(item.comments, function(it){
                                _.each(it.status, function(i){
                                    if(i.status === 'pending' && Number(i.recipient_id) === Number(user.id)) {
                                        item.has_comment = true;
                                    }
                                });
                            });
                        }
                    });

                    //vote
                    _.each(loans, function(item){
                        item.vote_pending = false;
                        if(item.committee.length !== 0) {
                            _.each(item.committee, function(i){
                                if(i.vote_status === 'pending' && Number(i.user_id) === Number(user.id)) {
                                    item.vote_pending = true;
                                }
                            });
                        }
                    });

                    var LoansBySettings = AppFactory.filterLoans(loans, 'settings');
                    var settingsLoans = vm.sortLoans(LoansBySettings, 1);
                    vm.sortedLoanList = settingsLoans;
                    data = getSortedData(vm.pendingView, vm.sortedLoanList);

                    if($location.path() === '/main/home') {
                        vm.gridOptions.api.setRows(data);
                    }
                });

            vm.changeLandingView = function(val) {
                var loanset = AppFactory.filterLoans(vm.loans, val);
                vm.sortedLoanList = loanset;
                data = getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(data);
            };

            //////////
            function sortPending() {
                vm.pendingView = !vm.pendingView;
                vm.gridOptions.context.pending_view = !vm.gridOptions.context.pending_view;
                vm.gridOptions.api.refreshHeader();
                var newData = getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(newData);
            }
            function getSortedData(state, collection) {
                var ds = [];
                if(state) {
                    ds = _.sortByAll(collection, ['vote_pending', 'has_comment', 'is_stale', 'is_watched', 'disbursement_issue']).reverse();
                    //console.log('true', ds);
                    return ds;
                } else {
                    ds = _.sortByAll(collection, ['farmer']);
                    //console.log('false', ds);
                    return ds;
                }
            }
            function sortPending() {
                vm.pendingView = !vm.pendingView;
                vm.gridOptions.context.pending_view = !vm.gridOptions.context.pending_view;
                vm.gridOptions.api.refreshHeader();
                var newData = getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(newData);
            }

        } // end function
})();