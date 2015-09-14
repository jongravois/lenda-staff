(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('LoansController', LoansController);

    LoansController.$inject = ['$rootScope', '$scope', '$filter', '$location', '$state', 'orderByFilter', 'AppFactory', 'LoansFactory'];

    /* @ngInject */
    function LoansController($rootScope, $scope, $filter, $location, $state, orderByFilter, AppFactory, LoansFactory) {
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

        LoansFactory.getLoans()
            .then(function (rsp) {
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
                headerName: ' ',
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
                width: 85,
                headerTooltip: 'Due Date',
                hide: !user.viewopts.voDueDate
            },
            {
                field: 'region',
                headerName: 'Reg',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Region',
                hide: !user.viewopts.voRegion
            },
            {
                field: 'full_season',
                headerName: 'Season',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Season',
                hide: !user.viewopts.voSeason
            },
            {
                valueGetter: 'data.distributor.distributor',
                headerName: 'Dist',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Distributor',
                hide: !user.viewopts.voDistributor
            },
            {
                field: 'agencies',
                headerName: 'Agency',
                headerClass: 'text-center',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Agency',
                hide: !user.viewopts.voAgency
            },
            {
                valueGetter: 'data.fins.commit_total',
                headerName: 'Total Commit',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.commit_total, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Total Commit',
                hide: !user.viewopts.voCommitTotal
            },
            {
                valueGetter: 'data.fins.commit_arm',
                headerName: 'ARM Commit',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.commit_arm, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'ARM Commit',
                hide: !user.viewopts.voCommitArm
            },
            {
                valueGetter: 'data.fins.commit_dist',
                headerName: 'Dist Commit',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.commit_dist, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Dist Commit',
                hide: !user.viewopts.voCommitDistributor
            },
            {
                valueGetter: 'data.fins.commit_other',
                headerName: 'Other Commit',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.commit_other, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: '3p Commit',
                hide: !user.viewopts.voCommitOther
            },
            {
                valueGetter: 'data.fins.total_fee_percent',
                headerName: 'Fee %',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.fins.total_fee_percent, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Total Fee %',
                hide: !user.viewopts.voFeePercentage
            },
            {
                valueGetter: 'data.fins.fee_total',
                headerName: 'Fee Total',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.fee_total, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Total Fee',
                hide: !user.viewopts.voFeeTotal
            },
            {
                vaueGetter: 'data.fins.int_percent_arm',
                headerName: 'ARM Rate %',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.fins.int_percent_arm, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'ARM Rate',
                hide: !user.viewopts.voRateArm
            },
            {
                valueGetter: 'data.fins.int_percent_dist',
                headerName: 'Dist Rate %',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexPercent')(params.data.fins.int_percent_dist, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Dist Rate',
                hide: !user.viewopts.voRateDist
            },
            {
                valueGetter: 'data.fins.balance_remaining',
                headerName: 'Balance',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('flexCurrency')(params.data.fins.balance_remaining, 0);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Balance',
                hide: !user.viewopts.voBalanceDue
            },
            {
                valueGetter: 'data.fins.total_acres',
                headerName: 'Acres: Total',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.total_acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Total Acres',
                hide: !user.viewopts.voAcresTotal
            },
            {
                valueGetter: 'data.fins.crop_acres.corn',
                headerName: 'Acres: Corn',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[0].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Corn Acres',
                hide: !user.viewopts.voAcresCorn
            },
            {
                valueGetter: 'data.fins.crop_acres.soybeans',
                headerName: 'Acres: Soybeans',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[1].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Soybean Acres',
                hide: !user.viewopts.voAcresSoybeans
            },
            {
                valueGetter: 'data.fins.crop_acres.beansFAC',
                headerName: 'Acres: Soybeans FAC',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[2].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Soybean FAC Acres',
                hide: !user.viewopts.voAcresBeansFAC
            },
            {
                valueGetter: 'data.fins.crop_acres.sorghum',
                headerName: 'Acres: Sorghum',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[3].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Sorghum Acres',
                hide: !user.viewopts.voAcresSorghum
            },
            {
                valueGetter: 'data.fins.crop_acres.wheat',
                headerName: 'Acres: Wheat',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[4].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Wheat Acres',
                hide: !user.viewopts.voAcresWheat
            },
            {
                valueGetter: 'data.fins.crop_acres.cotton',
                headerName: 'Acres: Cotton',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[5].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Cotton Acres',
                hide: !user.viewopts.voAcresCotton
            },
            {
                valueGetter: 'data.fins.crop_acres.rice',
                headerName: 'Acres: Rice',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[6].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Rice Acres',
                hide: !user.viewopts.voAcresRice
            },
            {
                valueGetter: 'data.fins.crop_acres.peanuts',
                headerName: 'Acres: Peanuts',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[7].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Peanut Acres',
                hide: !user.viewopts.voAcresPeanuts
            },
            {
                valueGetter: 'data.fins.crop_acres.sugarcane',
                headerName: 'Acres: Cane',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[8].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 90,
                headerTooltip: 'Sugar Cane Acres',
                hide: !user.viewopts.voAcresSugarcane
            },
            {
                valueGetter: 'data.fins.crop_acres.sunflowers',
                headerName: 'Acres: Sunflowers',
                headerClass: 'text-center',
                cellRenderer: function (params) {
                    return $filter('number')(params.data.fins.crop_acres[9].acres, 1);
                },
                cellClass: 'text-right',
                suppressSizeToFit: true,
                width: 85,
                headerTooltip: 'Sunflower Acres',
                hide: !user.viewopts.voAcresOther
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

        function sortPending() {
            $scope.pendingView = !$scope.pendingView;
            $scope.gridOptions.context.pending_view = !$scope.gridOptions.context.pending_view;
            $scope.gridOptions.api.refreshHeader();
            var newData = AppFactory.getSortedData($scope.pendingView, $scope.sortedLoanList);
            $scope.gridOptions.api.setRows(newData);
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