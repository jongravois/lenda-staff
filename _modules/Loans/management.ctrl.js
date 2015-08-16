(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ManagementController', ManagementController);

    ManagementController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$state', 'orderByFilter', 'AppFactory', 'LoansFactory', 'ManFactory'];

    /* @ngInject */
    function ManagementController($rootScope, $scope, $filter, $location, $state, orderByFilter, AppFactory, LoansFactory, ManFactory) {
        /* jshint validthis: true */
        var data = [];
        $scope.indWid = {
            hide: false,
            width: 136
        };

        $scope.pendingView = true;
        $scope.sortPending = sortPending;
        $scope.sortLoans = AppFactory.sortLoans;
        $scope.landing_view = 'settings';
        $scope.returnColor = AppFactory.returnColor;

        if(!$rootScope.currentUser) {
            try {
                var user = JSON.parse(localStorage.getItem('user'));
            } catch (exception) {
                $state.go('auth');
            }
        } else {
            var user = $rootScope.currentUser;
        }
        $scope.user = user;
        //console.log('user', user);

        LoansFactory.getLoans()
            .then(function(rsp){
                //console.log(rsp);
                $scope.loans = rsp;
                $scope.indWid = AppFactory.getIndicatorWidth($scope.user);
                var LoansBySettings = AppFactory.filterLoans($scope.loans, 'settings');
                var settingsLoans = $scope.sortLoans(LoansBySettings, 1);
                $scope.sortedLoanList = settingsLoans;
                $rootScope.loans = settingsLoans;
                $scope.hgt = $scope.sortedLoanList.length * 38;
                if($scope.hgt < 300) { $scope.hgt = 300; }

                var data = AppFactory.getSortedData($scope.pendingView, $scope.sortedLoanList);

                $scope.gridOptions.rowData = data;
                if ($scope.gridOptions.api) {
                    $scope.gridOptions.api.onNewRows();
                }
                console.log('Loans', $scope.loans);
            });

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
                headerName: '',
                templateUrl: './app/views/grid_tmpl/indicators.html',
                cellClass: 'text-center',
                suppressSizeToFit: true,
                width: $scope.indWid.width,
                hide: $scope.indWid.hide
            },
            {
                valueGetter: 'data.farmer.farmer',
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
                width: 18
            },
            {
                field: 'fsa_compliant',
                headerName: 'FSA',
                templateUrl: './_modules/Loans/_views/fsa.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'FSA eligible',
                width: 18
            },
            {
                field: 'prev_lien_verified',
                headerName: 'PLV',
                templateUrl: './_modules/Loans/_views/plv.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Prior liens verified',
                width: 18
            },
            {
                field: 'leases_valid',
                headerName: 'LSV',
                templateUrl: './_modules/Loans/_views/lsv.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Leases valid',
                width: 18
            },
            {
                field: 'bankruptcy_order_received',
                headerName: 'BOR',
                templateUrl: './_modules/Loans/_views/bor.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Bankruptcy order rcvd',
                width: 18
            },
            {
                field: 'received_3party',
                headerName: 'C3V',
                templateUrl: './_modules/Loans/_views/c3v.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Third party credit',
                width: 18
            },
            {
                field: 'recommended',
                headerName: 'REC',
                templateUrl: './_modules/Loans/_views/rec.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Recommended',
                width: 18
            },
            {
                field: 'dist_approved',
                headerName: 'DIS',
                templateUrl: './_modules/Loans/_views/dis.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Approved by distributor',
                width: 18
            },
            {
                field: 'arm_approved',
                headerName: 'ARM',
                templateUrl: './_modules/Loans/_views/arm.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Approved by ARM',
                width: 18
            },
            {
                field: 'loan_closed',
                headerName: 'CLO',
                templateUrl: './_modules/Loans/_views/clo.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Loan closed',
                width: 18
            },
            {
                field: 'added_land_verified',
                headerName: 'ADD',
                templateUrl: './_modules/Loans/_views/add.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Added land verified',
                width: 18
            },
            {
                field: 'permission_to_insure_verified',
                headerName: 'P2I',
                templateUrl: './_modules/Loans/_views/p2i.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Perm to ins verified',
                width: 18
            },
            {
                field: 'arm_ucc_received',
                headerName: 'UCC',
                templateUrl: './_modules/Loans/_views/ucc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'ARM UCC',
                width: 18
            },
            {
                field: 'dist_ucc_received',
                headerName: 'DCC',
                templateUrl: './_modules/Loans/_views/dcc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Distributor UCC',
                width: 18
            },
            {
                field: 'lien_letter_received',
                headerName: 'LLR',
                templateUrl: './_modules/Loans/_views/llr.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Lien Letter Received',
                width: 18
            },
            {
                field: 'aoi_received',
                headerName: 'AOI',
                templateUrl: './_modules/Loans/_views/aoi.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'AOI Recvd',
                width: 18
            },
            {
                field: 'ccc_received',
                headerName: 'CCC',
                templateUrl: './_modules/Loans/_views/ccc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'CCC Recvd',
                width: 18
            },
            {
                field: 'rebate_assignment',
                headerName: 'REB',
                templateUrl: './_modules/Loans/_views/reb.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Rebate assignment',
                width: 18
            },
            {
                field: 'crop_certified',
                headerName: 'CER',
                templateUrl: './_modules/Loans/_views/cer.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Crop certification',
                width: 18
            },
            {
                field: 'crop_inspection',
                headerName: 'INS',
                templateUrl: './_modules/Loans/_views/ins.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Crop inspection',
                width: 18
            },
            {
                field: 'limit_warning',
                headerName: 'LWN',
                templateUrl: './_modules/Loans/_views/lwn.html',
                headerClass: 'text-center bleft',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center bleft',
                headerTooltip: 'Limit warning',
                width: 18
            },
            {
                field: 'reconciliation',
                headerName: 'RCL',
                templateUrl: './_modules/Loans/_views/rcl.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Reconciliation',
                width: 18
            },
            {
                field: 'account_classification',
                headerName: 'CLA',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                headerTooltip: 'Account classification',
                width: 18
            }
        ];

        $scope.gridOptions = {
            angularCompileRows: true,
            angularCompileHeaders: true,
            columnDefs: columnDefs,
            colWidth: 100,
            rowHeight: 32,
            rowSelection: false,
            enableSorting: false,
            sortPending: sortPending,
            context: {
                pending_view: $scope.pendingView
            },
            ready: function (api) {
                api.setRows(data);
                api.sizeColumnsToFit();
            }
        };

        $scope.changeLandingView = function (val) {
            var loanset = AppFactory.filterLoans($scope.loans, val);
            $scope.sortedLoanList = loanset;
            data = AppFactory.getSortedData($scope.pendingView, $scope.sortedLoanList);
            $scope.gridOptions.api.setRows(data);
        };

        //////////
        function pendingHdr(params) {
            //console.log('before', params);
            if (params.context.pending_view) {
                return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="sortPending()" style="color:#000000;"></span></div>';
            } else {
                return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-circle-exclamation-mark" ng-click="sortPending()" style="color:#aaaaaa;"></span></div>';
            }
        }
        function managementHdr(params) {
            //console.log(params.value);
            switch (params.value) {
                case 'ITS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-list-alt"></span></div>';
                    break;
                case 'FSA':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-home"></span></div>';
                    break;
                case 'PLV':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-history"></span></div>';
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
                case 'DIS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-hand-up"></span></div>';
                    break;
                case 'ARM':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-thumbs-up"></span></div>';
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
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-king"></span></div>';
                    break;
                case 'DCC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-queen"></span></div>';
                    break;
                case 'LLR':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-edit"></span></div>';
                    break;
                case 'AOI':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-shield"></span></div>';
                    break;
                case 'CCC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-knight"></span></div>';
                    break;
                case 'REB':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-piggy-bank"></span></div>';
                    break;
                case 'CER':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-map"></span></div>';
                    break;
                case 'INS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-flower"></span></div>';
                    break;
                case 'LWN':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-alert"></span></div>';
                    break;
                case 'RCL':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-scale-classic"></span></div>';
                    break;
                case 'CLA':
                    return '<div style="text-align:center !important;">&nbsp;</div>';
                    break;
            }
        }
        function sortPending() {
            $scope.pendingView = !$scope.pendingView;
            $scope.gridOptions.context.pending_view = !$scope.gridOptions.context.pending_view;
            $scope.gridOptions.api.refreshHeader();
            var newData = AppFactory.getSortedData($scope.pendingView, $scope.sortedLoanList);
            $scope.gridOptions.api.setRows(newData);
        }
    } // end function
})();