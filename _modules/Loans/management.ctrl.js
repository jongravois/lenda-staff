(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('ManagementController', ManagementController);

    ManagementController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$state', 'orderByFilter', 'AppFactory', 'LoansFactory', 'ManFactory'];

    /* @ngInject */
    function ManagementController($rootScope, $scope, $filter, $location, $state, orderByFilter, AppFactory, LoansFactory, ManFactory) {
        /* jshint validthis: true */
        $scope.ManFactory = ManFactory;
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

        if (!$rootScope.currentUser) {
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

        if (!$rootScope.loans) {
            LoansFactory.getLoans()
                .then(function (rsp) {
                    //console.log(rsp);
                    $scope.loans = rsp;
                    $scope.indWid = AppFactory.getIndicatorWidth($scope.user);
                    var LoansBySettings = AppFactory.filterLoans($scope.loans, 'settings');
                    var settingsLoans = $scope.sortLoans(LoansBySettings, 1);
                    $scope.sortedLoanList = settingsLoans;
                    $rootScope.loans = settingsLoans;
                    $scope.hgt = $scope.sortedLoanList.length * 38;
                    if ($scope.hgt < 300) {
                        $scope.hgt = 300;
                    }

                    var data = AppFactory.getSortedData($scope.pendingView, $scope.sortedLoanList);

                    $scope.gridOptions.rowData = data;
                    if ($scope.gridOptions.api) {
                        $scope.gridOptions.api.onNewRows();
                    }
                    console.log('Loans', $scope.loans);
                });
        }

        var columnDefs = [
            {
                field: '',
                headerName: 'Pending',
                suppressSorting: true,
                templateUrl: './app/views/grid_tmpl/pending.icons.html',
                width: 90,
                suppressSizeToFit: true,
                headerCellRenderer: pendingHdr,
                headerTooltip: ''
            },
            {
                field: 'notification',
                headerName: '',
                templateUrl: './app/views/grid_tmpl/indicators.html',
                cellClass: 'text-center',
                suppressSizeToFit: true,
                width: $scope.indWid.width,
                hide: $scope.indWid.hide,
                headerTooltip: ''
            },
            {
                valueGetter: 'data.farmer.farmer',
                headerName: 'Farmer',
                width: 90
            },
            {
                field: 'applicant',
                headerName: 'Applicant',
                headerClass: 'text-center',
                templateUrl: './app/views/grid_tmpl/applicant.html',
                width: 90
            },
            {
                field: 'loantype_abr',
                headerName: 'Type',
                cellClass: 'text-center',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 60
            },
            {
                field: 'crop_year',
                headerName: 'Year',
                cellClass: 'text-center',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 60
            },
            {
                field: 'loc_abr',
                headerName: 'Loc',
                cellClass: 'text-center',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 60
            },
            {
                field: 'status.id',
                headerName: 'Status',
                cellClass: 'text-center',
                headerClass: 'text-center',
                templateUrl: './_modules/Loans/_views/manstats.html',
                suppressSizeToFit: true,
                width: 50
            },
            {
                field: 'its_list',
                headerName: 'ITS',
                templateUrl: './_modules/Loans/_views/its.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'fsa_compliant',
                headerName: 'FSA',
                templateUrl: './_modules/Loans/_views/fsa.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'prev_lien_verified',
                headerName: 'PLV',
                templateUrl: './_modules/Loans/_views/plv.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'leases_valid',
                headerName: 'LSV',
                templateUrl: './_modules/Loans/_views/lsv.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'bankruptcy_order_received',
                headerName: 'BOR',
                templateUrl: './_modules/Loans/_views/bor.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'received_3party',
                headerName: 'C3V',
                templateUrl: './_modules/Loans/_views/c3v.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'recommended',
                headerName: 'REC',
                templateUrl: './_modules/Loans/_views/rec.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'dist_approved',
                headerName: 'DIS',
                templateUrl: './_modules/Loans/_views/dis.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'arm_approved',
                headerName: 'ARM',
                templateUrl: './_modules/Loans/_views/arm.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'loan_closed',
                headerName: 'CLO',
                templateUrl: './_modules/Loans/_views/clo.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'added_land_verified',
                headerName: 'ADD',
                templateUrl: './_modules/Loans/_views/add.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'permission_to_insure_verified',
                headerName: 'P2I',
                templateUrl: './_modules/Loans/_views/p2i.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'arm_ucc_received',
                headerName: 'UCC',
                templateUrl: './_modules/Loans/_views/ucc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'dist_ucc_received',
                headerName: 'DCC',
                templateUrl: './_modules/Loans/_views/dcc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'lien_letter_received',
                headerName: 'LLR',
                templateUrl: './_modules/Loans/_views/llr.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'aoi_received',
                headerName: 'AOI',
                templateUrl: './_modules/Loans/_views/aoi.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'ccc_received',
                headerName: 'CCC',
                templateUrl: './_modules/Loans/_views/ccc.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'rebate_assignment',
                headerName: 'REB',
                templateUrl: './_modules/Loans/_views/reb.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'crop_certified',
                headerName: 'CER',
                templateUrl: './_modules/Loans/_views/cer.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'crop_inspection',
                headerName: 'INS',
                templateUrl: './_modules/Loans/_views/ins.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'limit_warning',
                headerName: 'LWN',
                templateUrl: './_modules/Loans/_views/lwn.html',
                headerClass: 'text-center bleft',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center bleft',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'reconciliation',
                headerName: 'RCL',
                templateUrl: './_modules/Loans/_views/rcl.html',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            },
            {
                field: 'account_classification',
                headerName: 'CLA',
                headerClass: 'text-center',
                headerCellRenderer: managementHdr,
                cellClass: 'text-center',
                width: 18,
                headerTooltip: false
            }
        ];

        $scope.gridOptions = {
            angularCompileRows: true,
            angularCompileHeaders: true,
            columnDefs: columnDefs,
            colWidth: 100,
            rowHeight: 32,
            rowSelection: false,
            suppressCellSelection: true,
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
            switch (params.value) {
                case 'ITS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-list-alt" tooltip="ITS List" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'FSA':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-home" tooltip="FSA Eligible" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'PLV':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-history" tooltip="Prior liens verified" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'LSV':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-leaf" tooltip="Leases verified" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'BOR':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-fire" tooltip="Bankruptcy Order Rcvd" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'C3V':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-charts" tooltip="Third Party Credit" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'REC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-share" tooltip="Recommended" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'DIS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-hand-up" tooltip="Distributor Approved" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'ARM':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-thumbs-up" tooltip="ARM Approved" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'CLO':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-folder-closed" tooltip="Loan Closed" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'ADD':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-flag" tooltip="Added land verified" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'P2I':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-gift" tooltip="Permission to Insure verified" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'UCC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-king" tooltip="ARM UCC" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'DCC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-queen" tooltip="Dist UCC" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'LLR':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-edit" tooltip="Lien Letter" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'AOI':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-shield" tooltip="AOI Rcvd" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'CCC':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-knight" tooltip="CCC Rcvd" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'REB':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-piggy-bank" tooltip="Rebate Assignment" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'CER':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-map" tooltip="Crops Certified" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'INS':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-flower" tooltip="Inspection requested" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'LWN':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-alert" tooltip="Limits Warning" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
                    break;
                case 'RCL':
                    return '<div style="text-align:center !important;"><span class="pendicon glyphicons glyphicons-scale-classic" tooltip="Account Reconciliation" tooltip-append-to-body="true" tooltip-placement="bottom"></span></div>';
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