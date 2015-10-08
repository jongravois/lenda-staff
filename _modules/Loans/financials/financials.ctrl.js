(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('FinancialsController', FinancialsController);

        FinancialsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'DefaultsFactory'];

        function FinancialsController($rootScope, $scope, $state, AppFactory, DefaultsFactory){
            $scope.AppFactory = AppFactory;
            if(!$rootScope.defaults) {
                DefaultsFactory.init();
                var globs =  DefaultsFactory.getObject();
                //console.log('Globs', globs, 'Graders', globs.admingraders);
                $scope.grads = globs.admingraders;
            } else {
                $scope.grads = $rootScope.defaults.admingraders;
            }
            $scope.afins = $scope.loan.applicant.fins;
            $scope.appfins = {
                balance: [
                    {
                        type: 'Current',
                        assets: Number($scope.afins.current_assets),
                        disc: Number($scope.afins.current_assets_factor),
                        liability: Number($scope.afins.current_assets_liability)
                    },
                    {
                        type: 'Intermediate',
                        assets: Number($scope.afins.intermediate_assets),
                        disc: Number($scope.afins.intermediate_assets_factor),
                        liability: Number($scope.afins.intermediate_assets_liability)
                    },
                    {
                        type: 'Fixed',
                        assets: Number($scope.afins.fixed_assets),
                        disc: Number($scope.afins.fixed_assets_factor),
                        liability: Number($scope.afins.fixed_assets_liability)
                    }
                ],
                income: [
                    {
                        year: 'Year 1',
                        rev: Number($scope.afins.year_1_revenue),
                        exp: Number($scope.afins.year_1_expenses),
                    },
                    {
                        year: 'Year 2',
                        rev: Number($scope.afins.year_2_revenue),
                        exp: Number($scope.afins.year_2_expenses),
                    },
                    {
                        year: 'Year 3',
                        rev: Number($scope.afins.year_3_revenue),
                        exp: Number($scope.afins.year_3_expenses),
                    }
                ]
            };
            //console.log('AFINS', $scope.afins, 'APPFINS', $scope.appfins);

            $scope.gradeA = false;
            $scope.gradeB = false;
            $scope.gradeC = false;
            $scope.gradeD = false;

            if($scope.afins.grade == 'A') {
                $scope.gradeA = true;
            }
            if($scope.afins.grade == 'B') {
                $scope.gradeB = true;
            }
            if($scope.afins.grade == 'C') {
                $scope.gradeC = true;
            }
            if($scope.afins.grade == 'D') {
                $scope.gradeD = true;
            }

            $scope.tggl = {
                showBorrowerInfo: true,
                showBalanceSheet: false,
                showIncomeHistory: false,
                showCreditPoints: false,
                showBorrowerRating: false
            };

            //BALANCE SHEET
            $scope.gridOptsBalsh = {
                enableCellEditOnFocus: true,
                showColumnFooter: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'type',
                        enableCellEdit: false,
                        displayName: 'Balance Sheet',
                        cellClass: 'text-left',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span>Total:</span>',
                        width: '100'
                    },
                    {
                        name: 'assets',
                        enableCellEdit: true,
                        displayName: 'Assets',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalAssets()|flexZeroCurrency:0}}</div>',
                        width: '128'
                    },
                    {
                        name: 'disc',
                        enableCellEdit: true,
                        displayName: 'Disc',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexPercent:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="text-center black nBold">-</div>',
                        width: '88'
                    },
                    {
                        name: 'a_val',
                        enableCellEdit: false,
                        displayName: 'Adj Value',
                        cellClass: 'text-right',
                        cellTemplate: '<div class="padd">{{row.entity.assets*(1-(row.entity.disc/100))|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalAssetAdj()|flexZeroCurrency:0}}</div>',
                        width: '128'
                    },
                    {
                        name: 'liability',
                        enableCellEdit: true,
                        displayName: 'Liability',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalLiabilities()|flexZeroCurrency:0}}</div>',
                        width: '128'
                    },
                    {
                        name: 'reserve',
                        enableCellEdit: false,
                        displayName: 'Reserve',
                        cellClass: 'text-right',
                        cellTemplate: '<div class="padd">{{(row.entity.assets*(1-(row.entity.disc/100)))-row.entity.liability|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalReserve()|flexZeroCurrency:0}}</div>',
                        width: '128'
                    }
                ],
                data: $scope.appfins.balance
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.appfins.balance, function (rawdata) {
                var record = {};
                record.changedAttrs = {};

                Object.defineProperty(record, 'isDirty', {
                    get: function () {
                        return Object.getOwnPropertyNames(record.changedAttrs).length > 0;
                    }
                });

                angular.forEach(rawdata, function (value, key) {
                    Object.defineProperty(record, key, {
                        get: function () {
                            return rawdata[key];
                        },

                        set: function (value) {
                            var origValue = record.changedAttrs[key] ? record.changedAttrs[key][0] : rawdata[key];

                            if(value !== origValue) {
                                record.changedAttrs[key] = [origValue, value];
                            } else {
                                delete record.changedAttrs[key];
                            }
                            rawdata[key] = value;
                        }
                    })
                });
                records.push(record);
            });

            $scope.gridOptsBalsh.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.bs_hgt = 32 + ($scope.appfins.balance.length+1) * 30;
                $scope.bs_wdt = 700;
                $scope.gridApi.gridHeight = $scope.bs_hgt;
                $scope.gridApi.gridWidth = $scope.bs_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //BALANCE SHEET

            //INCOME HISTORY
            $scope.gridOptsIH = {
                enableCellEditOnFocus: true,
                showColumnFooter: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'year',
                        enableCellEdit: false,
                        displayName: 'Income History',
                        cellClass: 'text-left',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'cTotal padd',
                        footerCellTemplate: '<span>Total:</span>',
                        width: '100'
                    },
                    {
                        name: 'rev',
                        enableCellEdit: true,
                        displayName: 'Revenue',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroNumber:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalRevenue()|flexZeroCurrency:0}}</div>',
                        width: '200'
                    },
                    {
                        name: 'exp',
                        enableCellEdit: true,
                        displayName: 'Expenses',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexZeroCurrency:0',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalExpenses()|flexZeroCurrency:0}}</div>',
                        width: '200'
                    },
                    {
                        name: 'i_val',
                        enableCellEdit: false,
                        displayName: 'Income',
                        cellClass: 'text-right',
                        cellTemplate: '<div class="padd">{{row.entity.rev-row.entity.exp|flexZeroCurrency:0}}</div>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        footerCellClass: 'text-right cTotal padd',
                        footerCellTemplate: '<div class="black nBold">{{grid.appScope.getTotalIncome()|flexZeroCurrency:0}}</div>',
                        width: '200'
                    }
                ],
                data: $scope.appfins.income
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.appfins.income, function (rawdata) {
                var record = {};
                record.changedAttrs = {};

                Object.defineProperty(record, 'isDirty', {
                    get: function () {
                        return Object.getOwnPropertyNames(record.changedAttrs).length > 0;
                    }
                });

                angular.forEach(rawdata, function (value, key) {
                    Object.defineProperty(record, key, {
                        get: function () {
                            return rawdata[key];
                        },

                        set: function (value) {
                            var origValue = record.changedAttrs[key] ? record.changedAttrs[key][0] : rawdata[key];

                            if(value !== origValue) {
                                record.changedAttrs[key] = [origValue, value];
                            } else {
                                delete record.changedAttrs[key];
                            }
                            rawdata[key] = value;
                        }
                    })
                });
                records.push(record);
            });

            $scope.gridOptsIH.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.inc_hgt = 32 + ($scope.appfins.income.length+1) * 30;
                $scope.inc_wdt = 700;
                $scope.gridApi.gridHeight = $scope.inc_hgt;
                $scope.gridApi.gridWidth = $scope.inc_wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //INCOME HISTORY

            $scope.getCurrentVal = function() { //1321817.15
                var factor = Number($scope.afins.current_assets_factor);
                return Number($scope.afins.current_assets) * ((100 - factor)/100);
            };
            $scope.getCurrentReserve = function() {
                return Number($scope.getCurrentVal()) - Number($scope.afins.current_assets_liability);
            };
            $scope.getIntermediateVal = function() {
                var factor = Number($scope.afins.intermediate_assets_factor);
                return Number($scope.afins.intermediate_assets) * ((100 - factor)/100);
            };
            $scope.getIntermediateReserve = function() {
                return Number($scope.getIntermediateVal()) - Number($scope.afins.intermediate_assets_liability);
            };
            $scope.getFixedVal = function() {
                var factor = Number($scope.afins.fixed_assets_factor);
                return Number($scope.afins.fixed_assets) * ((100 - factor)/100);
            };
            $scope.getFixedReserve = function() {
                return Number($scope.getFixedVal()) - Number($scope.afins.fixed_assets_liability);
            };
            $scope.getTotalAssets = function() {
                return Number($scope.afins.current_assets) + Number($scope.afins.intermediate_assets) + Number($scope.afins.fixed_assets);
            };
            $scope.getTotalAssetAdj = function() {
                return Number($scope.getCurrentVal()) + Number($scope.getIntermediateVal()) + Number($scope.getFixedVal());
            };
            $scope.getTotalLiabilities = function() {
                return Number($scope.afins.current_assets_liability) + Number($scope.afins.intermediate_assets_liability) + Number($scope.afins.fixed_assets_liability);
            };
            $scope.getTotalReserve = function() {
                return Number($scope.getCurrentReserve()) + Number($scope.getIntermediateReserve()) + Number($scope.getFixedReserve());
            };
            $scope.getTotalRevenue = function() {
                return _.sumCollection($scope.appfins.income, 'rev');
            }
            $scope.getTotalExpenses = function() {
                return _.sumCollection($scope.appfins.income, 'exp');
            }
            $scope.getTotalIncome = function() {
                return Number($scope.getTotalRevenue()) - Number($scope.getTotalExpenses());
            }

            $scope.getDebtToAssets = function() {
                var adj = Number($scope.getTotalAssetAdj());
                var lib = Number($scope.getTotalLiabilities());

                if(adj === 0) { return 0; }
                return (lib/adj) * 100;
            };
            $scope.getLoanNetworth = function() {
                //crop_loan, amt = total_committment; !crop_loan, amt = amount_requested
                var amt = Number($scope.afins.amount_requested);
                var reserve = Number($scope.getTotalReserve());
                if(reserve == '0') { return 0; }
                return (amt/reserve) * 100;
            };

            $scope.creditPoints = calcCreditPoints();
            //console.log('POINTS', $scope.creditPoints);
            
            $scope.updateFinancials = function() {
                alert('working');
            };
            //////////
            function calcCreditPoints() {
                var cred_score_pts = 0;
                var debt_assets_pts = 0;
                var loan_networth_pts = 0;
                var years_farming_pts = 0;

                //CREDIT SCORE
                var cred_score = Number($scope.afins.credit_score);

                if (_.range(cred_score, 610, 630)) { cred_score_pts = 7; }
                if (_.range(cred_score, 630, 650)) { cred_score_pts = 10; }
                if (_.range(cred_score, 650, 665)) { cred_score_pts = 13; }
                if (_.range(cred_score, 665, 680)) { cred_score_pts = 15; }
                if (_.range(cred_score, 680, 700)) { cred_score_pts = 17; }
                if (_.range(cred_score, 700, 725)) { cred_score_pts = 20; }
                if (_.range(cred_score, 725, 750)) { cred_score_pts = 22; }
                if (cred_score >= 750) { cred_score_pts = 25; }

                //DEBT TO ASSETS
                var d2a = Number($scope.getDebtToAssets());

                if (_.range(d2a, 65, 70)) { debt_assets_pts = 1; }
                if (_.range(d2a, 60, 65)) { debt_assets_pts = 2; }
                if (_.range(d2a, 55, 60)) { debt_assets_pts = 3; }
                if (_.range(d2a, 50, 55)) { debt_assets_pts = 4; }
                if (_.range(d2a, 45, 50)) { debt_assets_pts = 5; }
                if (_.range(d2a, 40, 45)) { debt_assets_pts = 6; }
                if (_.range(d2a, 35, 40)) { debt_assets_pts = 7; }
                if (_.range(d2a, 30, 35)) { debt_assets_pts = 8; }
                if (_.range(d2a, 25, 30)) { debt_assets_pts = 9; }
                if (d2a <= 25) { debt_assets_pts = 10; }

                //LOAN TO NETWORTH
                var lnw = Number($scope.getLoanNetworth());

                if (_.range(lnw, 25, 28)) { loan_networth_pts = 1; }
                if (_.range(lnw, 23, 25)) { loan_networth_pts = 2; }
                if (_.range(lnw, 20, 23)) { loan_networth_pts = 3; }
                if (_.range(lnw, 18, 20)) { loan_networth_pts = 4; }
                if (_.range(lnw, 15, 18)) { loan_networth_pts = 5; }
                if (_.range(lnw, 13, 15)) { loan_networth_pts = 6; }
                if (_.range(lnw, 10, 13)) { loan_networth_pts = 7; }
                if (_.range(lnw, 8, 10)) { loan_networth_pts = 8; }
                if (_.range(lnw, 5, 8)) { loan_networth_pts = 9; }
                if (lnw <= 5) { loan_networth_pts = 10; }

                //FARMING EXPERIENCE
                var exp = Number($scope.loan.farmer.farm_exp);

                if(_.range(exp, 3,5)) { years_farming_pts = 1; }
                if(_.range(exp, 5,10)) { years_farming_pts = 2; }
                if(_.range(exp, 10,15)) { years_farming_pts = 3; }
                if(_.range(exp, 15,20)) { years_farming_pts = 4; }
                if( exp > 19) { years_farming_pts = 5; }

                return {
                    credit_score: cred_score_pts,
                    debt_assets: debt_assets_pts,
                    loan_networth: loan_networth_pts,
                    years_farming: years_farming_pts,
                    total: cred_score_pts + debt_assets_pts + loan_networth_pts + years_farming_pts
                }
            }
        } // end controller
})();