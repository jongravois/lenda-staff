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
            //console.log('AFINS', $scope.afins);

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
                showBorrowerRating: true
            };

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
            //console.log('Loan', $scope.loan, 'Financials', $scope.afins, 'Globs', $scope.grads);

            $scope.creditPoints = calcCreditPoints();
            console.log('POINTS', $scope.creditPoints);
            
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