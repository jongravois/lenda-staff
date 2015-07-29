(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('LoansController', LoansController);

        LoansController.$inject = ['$scope', '$filter', 'orderByFilter', 'AppFactory', 'LoansFactory'];

        /* @ngInject */
        function LoansController($scope, $filter, orderByFilter, AppFactory, LoansFactory) {
            /* jshint validthis: true */
            var vm = this;
            var user = JSON.parse(localStorage.getItem('user'));
            vm.user = user;

            var indWid = getIndicatorWidth();

            vm.sortLoans = AppFactory.sortLoans;
            vm.landing_view = 'settings';
            vm.pending_view = 1;

            LoansFactory.getLoans()
                .then(function(rsp){
                    var loans = rsp.data.data;
                    vm.loans = loans;
                    vm.indWid = getIndicatorWidth();

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
                    $scope.sortedLoanList = vm.sortedLoanList = settingsLoans;
                });

            vm.changeLandingView = function(val) {
                var loanset = AppFactory.filterLoans(vm.loans, val);
                $scope.sortedLoanList = vm.sortedLoanList = loanset;
            };

            var columnDefs = [
                {
                    field: 'pending',
                    displayName: ' ',
                    cellTemplate: './app/views/grid_tmpl/pending.icons.html',
                    headerCellTemplate: './app/views/grid_tmpl/pending.header.cell.html',
                    headerClass: 'text-center',
                    cellClass: 'text-center',
                    width: '95'
                },
                {
                    field: 'notification',
                    displayName: ' ',
                    cellTemplate: './app/views/grid_tmpl/indicators.html',
                    cellClass: 'text-center',
                    width: indWid.width,
                    visible: indWid.visible
                },
                {
                    field: 'farmer',
                    displayName: 'Farmer',
                    headerClass: 'text-center',
                    width: '140'
                },
                {
                    field: 'applicant',
                    displayName: 'Applicant',
                    headerClass: 'text-center',
                    cellTemplate: './app/views/grid_tmpl/applicant.html',
                    width: '140'
                },
                {
                    field: 'loantype_abr',
                    displayName: 'Type',
                    cellClass: 'text-center',
                    headerClass: 'text-center'
                },
                {
                    field: 'crop_year',
                    displayName: 'Year',
                    cellClass: 'text-center',
                    headerClass: 'text-center'
                },
                {
                    field: 'app_date',
                    displayName: 'App Date',
                    headerClass: 'text-center'
                },
                {
                    field: 'location.loc_abr',
                    displayName: 'Loc',
                    cellClass: 'text-center',
                    headerClass: 'text-center'
                },
                {
                    field: 'status.id',
                    displayName: 'Status',
                    cellClass: 'text-center',
                    headerClass: 'text-center',
                    cellTemplate: './app/views/grid_tmpl/status.html'
                },
                {
                    field: 'due_date',
                    displayName: 'Due',
                    headerClass: 'text-center',
                    //visible: ($scope.user ? $scope.user.viewopts.voDueDate : false)
                },
                {
                    field: 'region',
                    displayName: 'Reg',
                    headerClass: 'text-center',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voRegion : false)
                },
                {
                    field: 'full_season',
                    displayName: 'Season',
                    headerClass: 'text-center',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voSeason : false)
                },
                {
                    field: 'distributor.distributor',
                    displayName: 'Dist',
                    headerClass: 'text-center',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voDistributor : false)
                },
                {
                    field: 'agency',
                    displayName: 'Agency',
                    headerClass: 'text-center',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAgency : false)
                },
                {
                    field: 'fins.commit_total',
                    displayName: 'Total Commit',
                    headerClass: 'text-center',
                    cellFilter: 'flexCurrency:0',
                    cellClass: 'text-right',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voCommitTotal : false)
                },
                {
                    field: 'fins.commit_arm',
                    displayName: 'ARM Commit',
                    headerClass: 'text-center',
                    cellFilter: 'flexCurrency:0',
                    cellClass: 'text-right',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voCommitArm : false)
                },
                {
                    field: 'fins.commit_dist',
                    displayName: 'Dist Commit',
                    headerClass: 'text-center',
                    cellFilter: 'flexCurrency:0',
                    cellClass: 'text-right',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voCommitDistributor : false)
                },
                {
                    field: 'fins.commit_other',
                    displayName: 'Other Commit',
                    headerClass: 'text-center',
                    cellFilter: 'flexCurrency:0',
                    cellClass: 'text-right',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voCommitOther : false)
                },
                {
                    field: 'fins.total_fee_percent',
                    displayName: 'Fee %',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'flexPercent:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voFeePercentage : false)
                },
                {
                    field: 'fins.fee_total',
                    displayName: 'Fee Total',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'currency',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voFeeTotal : false)
                },
                {
                    field: 'fins.int_percent_arm',
                    displayName: 'ARM Rate %',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'displaypercent',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voRateArm : false)
                },
                {
                    field: 'fins.int_percent_dist',
                    displayName: 'Dist Rate %',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'displaypercent',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voRateDist : false)
                },
                {
                    field: 'fins.balance_remaining',
                    displayName: 'Balance',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'currency',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voBalanceDue : false)
                },
                {
                    field: 'fins.total_acres',
                    displayName: 'Acres: Total',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresTotal : false)
                },
                {
                    field: 'fins.crop_acres.corn',
                    displayName: 'Acres: Corn',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresCorn : false)
                },
                {
                    field: 'fins.crop_acres.soybeans',
                    displayName: 'Acres: Soybeans',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresSoybeans : false)
                },
                {
                    field: 'fins.crop_acres.beansFAC',
                    displayName: 'Acres: Soybeans FAC',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresBeansFAC : false)
                },
                {
                    field: 'fins.crop_acres.sorghum',
                    displayName: 'Acres: Sorghum',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresSorghum : false)
                },
                {
                    field: 'fins.crop_acres.wheat',
                    displayName: 'Acres: Wheat',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresWheat : false)
                },
                {
                    field: 'fins.crop_acres.cotton',
                    displayName: 'Acres: Cotton',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresCotton : false)
                },
                {
                    field: 'fins.crop_acres.rice',
                    displayName: 'Acres: Rice',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresRice : false)
                },
                {
                    field: 'fins.crop_acres.peanuts',
                    displayName: 'Acres: Peanuts',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresPeanuts : false)
                },
                {
                    field: 'fins.crop_acres.sugarcane',
                    displayName: 'Acres: Cane',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresSugarcane : false)
                },
                {
                    field: 'fins.crop_acres.sunflowers',
                    displayName: 'Acres: Sunflowers',
                    cellClass: 'text-right',
                    headerClass: 'text-center',
                    cellFilter: 'number:1',
                    visible: false
                    //visible: ($scope.user ? $scope.user.viewopts.voAcresOther : false)
                }
            ];

            vm.gridOptions = {
                data: 'sortedLoanList',
                rowHeight: 40,
                showFilter: true,
                enableRowSelection: false,
                columnDefs: columnDefs
            };

            //////////
            function getIndicatorWidth() {
                var cnt = 0;

                /*if(vm.user.viewopts.voIconAddendum) {
                 cnt += 1;
                 }
                 if(vm.user.viewopts.voIconCross) {
                 cnt += 1;
                 }
                 if(vm.user.viewopts.voIconBankruptcy) {
                 cnt += 1;
                 }
                 if(vm.user.viewopts.voIcon3pcredit) {
                 cnt += 1;
                 }
                 if(vm.user.viewopts.voIconAddedland) {
                 cnt += 1;
                 }
                 if(vm.user.viewopts.voIconDisbursement) {
                 cnt += 1;
                 }
                 if($scope.user.viewopts.voIconAttachments) {
                 cnt += 1;
                 }

                 return {
                 visible: (cnt === 0 ? false : true),
                 width: cnt * 17
                 };*/ //140;
                return {
                    visible: true,
                    width: 140
                };
            }
        } // end function
})();