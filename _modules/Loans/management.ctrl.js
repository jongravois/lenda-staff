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
                    data = AppFactory.getSortedData(vm.pendingView, vm.sortedLoanList);
                    vm.gridOptions.api.setRows(data);
                });

            vm.changeLandingView = function(val) {
                var loanset = AppFactory.filterLoans(vm.loans, val);
                vm.sortedLoanList = loanset;
                data = getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(data);
            };

            var columnDefs = [
                {
                    field: '',
                    headerName: 'Pending',
                    suppressSorting: true,
                    templateUrl: './app/views/grid_tmpl/pending.icons.html',
                    width: 90,
                    suppressSizeToFit: true,
                    headerCellRenderer: pendingHdr,
                    headerTooltip: 'On/Off'
                },
                {
                    field: 'notification',
                    headerName: ' ',
                    templateUrl: './app/views/grid_tmpl/management.indicators.html',
                    cellClass: 'text-center',
                    suppressSizeToFit: true,
                    width: indWid.width,
                    hide: indWid.hide
                },
                {
                    field: 'farmer',
                    headerName: 'Farmer',
                    headerTooltip: 'Farmer',
                    width: 90
                },
                {
                    field: 'applicant',
                    headerName: 'Applicant',
                    headerClass: 'text-center',
                    templateUrl: './app/views/grid_tmpl/applicant.html',
                    headerTooltip: 'Applicant',
                    width: 90
                },
                {
                    field: 'loantype_abr',
                    headerName: 'Type',
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    headerTooltip: 'Loan Type',
                    width: 60
                },
                {
                    field: 'crop_year',
                    headerName: 'Year',
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    headerTooltip: 'Crop Year',
                    width: 60
                },
                {
                    field: 'loc_abr',
                    headerName: 'Loc',
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    headerTooltip: 'Location',
                    width: 60
                },
                {
                    field: 'status.id',
                    headerName: 'Status',
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                    templateUrl: './app/views/grid_tmpl/status.html',
                    suppressSizeToFit: true,
                    headerTooltip: 'Status',
                    width: 50
                },
                {
                    field: 'its_list',
                    headerName: 'ITS',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'fsa_eligibility',
                    headerName: 'FSA',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                },
                {
                    field: 'prior_lien',
                    headerName: 'PL',
                    templateUrl: './app/views/grid_tmpl/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    width: 20
                }
            ];

            function pendingHdr(params) {
                //console.log('before', params);
                if(params.context.pending_view){
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="loans.sortPending()" style="color:#000000;"></span></div>';
                } else {
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="loans.sortPending()" style="color:#aaaaaa;"></span></div>';
                }
            }
            function managementHdr(params) {
                console.log(params.value);
            }

            vm.gridOptions = {
                angularCompileRows: true,
                angularCompileHeaders: true,
                columnDefs: columnDefs,
                colWidth: 100,
                rowSelection: 'single',
                enableSorting: false,
                sortPending: sortPending,
                context: {
                    pending_view: vm.pendingView
                },
                ready: function(api) {
                    api.setRows(data);
                    api.sizeColumnsToFit();
                }
            };

            //////////
            function sortPending() {
                vm.pendingView = !vm.pendingView;
                vm.gridOptions.context.pending_view = !vm.gridOptions.context.pending_view;
                vm.gridOptions.api.refreshHeader();
                var newData = AppFactory.getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(newData);
            }

        } // end function
})();