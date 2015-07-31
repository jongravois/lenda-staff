(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ManagementController', ManagementController);

        ManagementController.$inject = ['$location', 'AppFactory', 'LoansFactory', 'ManFactory'];

        /* @ngInject */
        function ManagementController($location, AppFactory, LoansFactory, ManFactory) {
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
            vm.returnColor = AppFactory.returnColor;
            vm.clickManagement = ManFactory.clickManagement;
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
                data = AppFactory.getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(data);
            };

            var columnDefs = [
                {
                    field: '',
                    headerName: 'Pending',
                    suppressSorting: true,
                    templateUrl: './_modules/Loans/_views/pending.icons.html',
                    width: 90,
                    suppressSizeToFit: true,
                    headerCellRenderer: pendingHdr,
                    headerTooltip: 'On/Off'
                },
                {
                    field: 'notification',
                    headerName: '',
                    templateUrl: './_modules/Loans/_views/indicators.html',
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
                    templateUrl: './_modules/Loans/_views/manstats.html',
                    suppressSizeToFit: true,
                    //headerTooltip: 'Status',
                    width: 50
                },
                {
                    field: 'its_list',
                    headerName: 'ITS',
                    templateUrl: './_modules/Loans/_views/its.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'ITS List',
                    width: 20
                },
                {
                    field: 'fsa_compliant',
                    headerName: 'FSA',
                    templateUrl: './_modules/Loans/_views/fsa.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'FSA eligible',
                    width: 20
                },
                {
                    field: 'prev_lien_verified',
                    headerName: 'PLV',
                    templateUrl: './_modules/Loans/_views/plv.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Prior liens verified',
                    width: 20
                },
                 {
                    field: 'leases_valid',
                    headerName: 'LSV',
                    templateUrl: './_modules/Loans/_views/lsv.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Leases valid',
                    width: 20
                },
                {
                    field: 'bankruptcy_order_received',
                    headerName: 'BOR',
                    templateUrl: './_modules/Loans/_views/bor.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Bankruptcy order rcvd',
                    width: 20
                },
                {
                    field: 'received_3party',
                    headerName: 'C3V',
                    templateUrl: './_modules/Loans/_views/c3v.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Third party credit',
                    width: 20
                },
                {
                    field: 'recommended',
                    headerName: 'REC',
                    templateUrl: './_modules/Loans/_views/rec.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Recommended',
                    width: 20
                },
                {
                    field: 'arm_approved',
                    headerName: 'ARM',
                    templateUrl: './_modules/Loans/_views/arm.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Approved by ARM',
                    width: 20
                },
                 {
                    field: 'dist_approved',
                    headerName: 'DIS',
                    templateUrl: './_modules/Loans/_views/dis.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Approved by distributor',
                    width: 20
                },
                  {
                    field: 'loan_closed',
                    headerName: 'CLO',
                    templateUrl: './_modules/Loans/_views/clo.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Loan closed',
                    width: 20
                },
                   {
                    field: 'added_land_verified',
                    headerName: 'ADD',
                    templateUrl: './_modules/Loans/_views/add.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Added land verified',
                    width: 20
                },
                    {
                    field: 'permission_to_insure_verified',
                    headerName: 'P2I',
                    templateUrl: './_modules/Loans/_views/p2i.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Perm to ins verified',
                    width: 20
                },
                     {
                    field: 'arm_ucc_received',
                    headerName: 'UCC',
                    templateUrl: './_modules/Loans/_views/ucc.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'ARM UCC',
                    width: 20
                },
                    {
                    field: 'dist_ucc_verified',
                    headerName: 'DCC',
                    templateUrl: './_modules/Loans/_views/dcc.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Distributor UCC',
                    width: 20
                },
                {
                    field: 'aoi_received',
                    headerName: 'AOI',
                    templateUrl: './_modules/Loans/_views/aoi.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'AOI Recvd',
                    width: 20
                },
                 {
                    field: 'ccc_received',
                    headerName: 'CCC',
                    templateUrl: './_modules/Loans/_views/ccc.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'CCC Recvd',
                    width: 20
                },
                  {
                    field: 'rebate_assignment',
                    headerName: 'REB',
                    templateUrl: './_modules/Loans/_views/reb.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Rebate assignment',
                    width: 20
                },
                   {
                    field: 'crop_inspection',
                    headerName: 'INS',
                    templateUrl: './_modules/Loans/_views/ins.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Crop inspection',
                    width: 20
                },
                    {
                    field: 'crop_certified',
                    headerName: 'CER',
                    templateUrl: './_modules/Loans/_views/cer.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Crop certification',
                    width: 20
                },
                     {
                    field: 'limit_warning',
                    headerName: 'LWN',
                    templateUrl: './_modules/Loans/_views/lwn.html',
                    headerClass: 'text-center bleft',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center bleft',
                    headerTooltip: 'Limit warning',
                    width: 20
                },
                {
                    field: 'reconciliation',
                    headerName: 'RCL',
                    templateUrl: './_modules/Loans/_views/rcl.html',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Reconciliation',
                    width: 20
                },
                {
                    field: 'account_classification',
                    headerName: 'CLA',
                    headerClass: 'text-center',
                    headerCellRenderer: managementHdr,
                    cellClass: 'text-center',
                    headerTooltip: 'Account classification',
                    width: 20
                }
            ];

            function pendingHdr(params) {
                //console.log('before', params);
                if(params.context.pending_view){
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="loanman.sortPending()" style="color:#000000;"></span></div>';
                } else {
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="loanman.sortPending()" style="color:#aaaaaa;"></span></div>';
                }
            }
            function managementHdr(params) {
                //console.log(params.value);
                switch(params.value) {
                    case 'ITS':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-list-alt"></span></div>';
                        break;
                    case 'FSA':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-home"></span></div>';
                        break;
                    case 'PLV':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-star"></span></div>';
                        break;
                    case 'LSV':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-leaf"></span></div>';
                        break;
                    case 'BOR':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-fire"></span></div>';
                        break;
                    case 'C3V':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-charts"></span></div>';
                        break;
                    case 'REC':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-share"></span></div>';
                        break;
                    case 'ARM':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-thumbs-up"></span></div>';
                        break;
                    case 'DIS':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-hand-up"></span></div>';
                        break;
                    case 'CLO':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-folder-closed"></span></div>';
                        break;
                    case 'ADD':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-flag"></span></div>';
                        break;
                    case 'P2I':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-gift"></span></div>';
                        break;
                    case 'UCC':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-log-in"></span></div>';
                        break;
                    case 'DCC':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-log-in"></span></div>';
                        break;
                    case 'AOI':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-arrow-right"></span></div>';
                        break;
                    case 'CCC':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-link"></span></div>';
                        break;
                    case 'REB':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-cogwheel"></span></div>';
                        break;
                    case 'INS':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-flower"></span></div>';
                        break;
                    case 'CER':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-map"></span></div>';
                        break;
                    case 'LWN':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-wifi-alt"></span></div>';
                        break;
                    case 'RCL':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-retweet-2"></span></div>';
                        break;
                    case 'CLA':
                        return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-sort-by-alphabet"></span></div>';
                        break;
                }
            }

            vm.gridOptions = {
                angularCompileRows: true,
                angularCompileHeaders: true,
                columnDefs: columnDefs,
                colWidth: 100,
                rowSelection: false,
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