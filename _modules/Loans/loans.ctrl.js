(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('LoansController', LoansController);

        LoansController.$inject = ['$filter', '$location', 'orderByFilter', 'AppFactory', 'LoansFactory'];

        /* @ngInject */
        function LoansController($filter, $location, orderByFilter, AppFactory, LoansFactory) {
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
                .then(function(loans){
                    vm.loans = loans;
                    vm.indWid = AppFactory.getIndicatorWidth(vm.user);

                    var LoansBySettings = AppFactory.filterLoans(loans, 'settings');
                    //console.log('LoansBySettings', LoansBySettings);
                    var settingsLoans = vm.sortLoans(LoansBySettings, 1);
                    vm.sortedLoanList = settingsLoans;
                    vm.hgt = vm.sortedLoanList.length * 38;
                    data = AppFactory.getSortedData(vm.pendingView, vm.sortedLoanList);
                    //console.log('data', data);

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
                    templateUrl: './app/views/grid_tmpl/listing.indicators.html',
                    cellClass: 'text-center',
                    suppressSizeToFit: true,
                    width: indWid.width,
                    hide: indWid.hide
                },
                {
                    field: 'farmer',
                    headerName: 'Farmer',
                    headerTooltip: 'Farmer',
                    width: 140
                },
                {
                    field: 'applicant',
                    headerName: 'Applicant',
                    headerClass: 'text-center',
                    templateUrl: './app/views/grid_tmpl/applicant.html',
                    headerTooltip: 'Applicant',
                    width: 140
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
                    field: 'app_date',
                    headerName: 'App Date',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    headerTooltip: 'App Date',
                    width: 90
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
                    width: 60
                },
                {
                    field: 'due_date',
                    headerName: 'Due',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    width: 90,
                    headerTooltip: 'Due Date',
                    hide: !user.viewopts.voDueDate
                },
                {
                    field: 'region',
                    headerName: 'Reg',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Region',
                    hide: !user.viewopts.voRegion
                },
                {
                    field: 'full_season',
                    headerName: 'Season',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    width: 90,
                    headerTooltip: 'Season',
                    hide: !user.viewopts.voSeason
                },
                {
                    valueGetter: 'data.distributor.distributor',
                    headerName: 'Dist',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Distributor',
                    hide: !user.viewopts.voDistributor
                },
                {
                    field: 'agencies',
                    headerName: 'Agency',
                    headerClass: 'text-center',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Agency',
                    hide: !user.viewopts.voAgency
                },
                {
                    valueGetter: 'data.fins.commit_total',
                    headerName: 'Total Commit',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.commit_total, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 90,
                    headerTooltip: 'Total Commit',
                    hide: !user.viewopts.voCommitTotal
                },
                {
                    valueGetter: 'data.fins.commit_arm',
                    headerName: 'ARM Commit',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.commit_arm, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 90,
                    headerTooltip: 'ARM Commit',
                    hide: !user.viewopts.voCommitArm
                },
                {
                    valueGetter: 'data.fins.commit_dist',
                    headerName: 'Dist Commit',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.commit_dist, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 90,
                    headerTooltip: 'Dist Commit',
                    hide: !user.viewopts.voCommitDistributor
                },
                {
                    valueGetter: 'data.fins.commit_other',
                    headerName: 'Other Commit',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.commit_other, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: '3p Commit',
                    hide: !user.viewopts.voCommitOther
                },
                {
                    valueGetter: 'data.fins.total_fee_percent',
                    headerName: 'Fee %',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexPercent')(params.data.fins.total_fee_percent, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Total Fee %',
                    hide: !user.viewopts.voFeePercentage
                },
                {
                    valueGetter: 'data.fins.fee_total',
                    headerName: 'Fee Total',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.fee_total, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Total Fee',
                    hide: !user.viewopts.voFeeTotal
                },
                {
                    vaueGetter: 'data.fins.int_percent_arm',
                    headerName: 'ARM Rate %',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexPercent')(params.data.fins.int_percent_arm, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'ARM Rate',
                    hide: !user.viewopts.voRateArm
                },
                {
                    valueGetter: 'data.fins.int_percent_dist',
                    headerName: 'Dist Rate %',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexPercent')(params.data.fins.int_percent_dist, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Dist Rate',
                    hide: !user.viewopts.voRateDist
                },
                {
                    valueGetter: 'data.fins.balance_remaining',
                    headerName: 'Balance',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('flexCurrency')(params.data.fins.balance_remaining, 0);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Balance',
                    hide: !user.viewopts.voBalanceDue
                },
                {
                    valueGetter: 'data.fins.total_acres',
                    headerName: 'Acres: Total',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.total_acres, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Total Acres',
                    hide: !user.viewopts.voAcresTotal
                },
                {
                    valueGetter: 'data.fins.crop_acres.corn',
                    headerName: 'Acres: Corn',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.corn, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Corn Acres',
                    hide: !user.viewopts.voAcresCorn
                },
                {
                    valueGetter: 'data.fins.crop_acres.soybeans',
                    headerName: 'Acres: Soybeans',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.soybeans, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Soybean Acres',
                    hide: !user.viewopts.voAcresSoybeans
                },
                {
                    valueGetter: 'data.fins.crop_acres.beansFAC',
                    headerName: 'Acres: Soybeans FAC',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.beansFAC, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Soybean FAC Acres',
                    hide: !user.viewopts.voAcresBeansFAC
                },
                {
                    valueGetter: 'data.fins.crop_acres.sorghum',
                    headerName: 'Acres: Sorghum',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.sorghum, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Sorghum Acres',
                    hide: !user.viewopts.voAcresSorghum
                },
                {
                    valueGetter: 'data.fins.crop_acres.wheat',
                    headerName: 'Acres: Wheat',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.wheat, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Wheat Acres',
                    hide: !user.viewopts.voAcresWheat
                },
                {
                    valueGetter: 'data.fins.crop_acres.cotton',
                    headerName: 'Acres: Cotton',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.cotton, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Cotton Acres',
                    hide: !user.viewopts.voAcresCotton
                },
                {
                    valueGetter: 'data.fins.crop_acres.rice',
                    headerName: 'Acres: Rice',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.rice, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Rice Acres',
                    hide: !user.viewopts.voAcresRice
                },
                {
                    valueGetter: 'data.fins.crop_acres.peanuts',
                    headerName: 'Acres: Peanuts',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.peanuts, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Peanut Acres',
                    hide: !user.viewopts.voAcresPeanuts
                },
                {
                    valueGetter: 'data.fins.crop_acres.sugarcane',
                    headerName: 'Acres: Cane',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.sugarcane, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Sugar Cane Acres',
                    hide: !user.viewopts.voAcresSugarcane
                },
                {
                    valueGetter: 'data.fins.crop_acres.sunflowers',
                    headerName: 'Acres: Sunflowers',
                    headerClass: 'text-center',
                    cellRenderer: function(params) {
                        return $filter('number')(params.data.fins.crop_acres.sunflowers, 1);
                    },
                    cellClass: 'text-right',
                    suppressSizeToFit: true,
                    width: 60,
                    headerTooltip: 'Sunflower Acres',
                    hide: !user.viewopts.voAcresOther
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

            vm.gridOptions = {
                angularCompileRows: true,
                angularCompileHeaders: true,
                columnDefs: columnDefs,
                colWidth: 100,
                rowHeight: 32,
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

            vm.onHardRefresh = function() {
                vm.gridOptions.api.refreshView();
            };

            //////////
            function sortPending() {
                vm.pendingView = !vm.pendingView;
                vm.gridOptions.context.pending_view = !vm.gridOptions.context.pending_view;
                vm.gridOptions.api.refreshHeader();
                var newData = AppFactory.getSortedData(vm.pendingView, vm.sortedLoanList);
                vm.gridOptions.api.setRows(newData);
            }
            function numberNewValueHandler(params) {
                var valueAsNumber = parseInt(params.newValue);
                if (isNaN(valueAsNumber)) {
                    window.alert("Invalid value " + params.newValue + ", must be a number");
                } else {
                    params.data[params.colDef.field] = valueAsNumber;
                }
            }
            function cellValueChangedFunction() {
                // after a value changes, get the volatile cells to update
                vm.gridOptions.api.softRefreshView();
            }
            function gtZero(value) {
                var val = Number(value);
                if (val <= 0) {
                    return 'text-center';
                }
                else {
                    return 'text-right';
                }
            }
        } // end function
})();