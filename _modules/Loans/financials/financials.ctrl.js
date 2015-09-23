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

            $scope.tggl = {
                showBorrowerInfo: true,
                showBalanceSheet: false,
                showIncomeHistory: false,
                showCreditPoints: false,
                showBorrowerRating: true
            };

            $scope.creditPoints = {
                credit_score: 22, //loan.applicant.fins.credit_score
                debt_assets: 7, //getDebtToAssets()
                loan_networth: 0,
                years_farming: 5, //$scope.loan.farmer.farm_exp,
                total: 34
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
                var amt = Number($scope.loan.applicant.fins.amount_requested);
                var reserve = Number($scope.getTotalReserve());
                if(reserve == '0') { return 0; }
                return (amt/reserve) * 100;
            };
            //console.log('Loan', $scope.loan, 'Financials', $scope.afins, 'Globs', $scope.grads);
            
            $scope.updateFinancials = function() {
                alert('working');
            }
        } // end controller
})();