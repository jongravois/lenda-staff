(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('XcollateralsController', XcollateralsController);

        XcollateralsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function XcollateralsController($rootScope, $scope, AppFactory){
            $scope.tggl = {
                showCropTotals: false,
                showIncome: false,
                showArmExp: false,
                showDistExp: false,
                showOtherExp: false,
                showInsurance: false,
                showCommitment: false,
                showInsSummary: false,
                showCollateral: false,
                showTerms: false
            };

            $scope.loan.xcols = [
                {
                    applicant: 'Blind Justice',
                    total_acres: 1200,
                    crop_total: 1204300,
                    commit_arm: 147651,
                    commit_dist: 260905,
                    commit_other: 6000,
                    cash_flow: 12450,
                    ins_total_value: 1600104,
                    mpci_value: 1280083,
                    stax_sco_value: 187635,
                    ins_net_value: 1467718,
                    armAndDist: 408556,
                    ins_total_diff: -1191548,
                    collateral_crops: 1204300/2,
                    collateral_mpci: 487564,
                    collateral_stax_sco: 10499,
                    collateral_equipment: 0,
                    collateral_realestate: 0,
                    collateral_other: 0,
                    exposure: -321658,
                    origination_fee: 29899,
                    service_fee: 21080,
                    interest_arm: 47656,
                    interest_dist: 39990,
                    total_fee_interest: 138625
                }
            ];
        } // end controller
})();