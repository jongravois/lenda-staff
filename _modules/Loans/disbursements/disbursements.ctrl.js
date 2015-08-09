(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DisbursementsController', DisbursementsController);

        DisbursementsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function DisbursementsController($rootScope, $scope, AppFactory){
            var payouts = $scope.loan.disbursements;
            var arm_tots = 0;
            var rem_tots = 0;
            var spent_tots = 0;

            $scope.disburse_arm_total = function() {
                arm_tots = _.sumCollection(payouts, 'arm_budget');
                return arm_tots;
            }
            $scope.disburse_rem_total = function() {
                return arm_tots - spent_tots;
            }
            $scope.disburse_spent_total = function() {
                spent_tots = _.sumCollection(payouts, 'spent');
                return spent_tots;
            }
        } // end controller
})();