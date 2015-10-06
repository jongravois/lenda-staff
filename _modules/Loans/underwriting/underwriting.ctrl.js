(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('UnderwritingController', UnderwritingController);

        UnderwritingController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function UnderwritingController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;

            $scope.getTotalStoAmt = function() {
                return _.sumCollection($scope.loan.storage, 'contract_amount');
            }
            $scope.getTotalStoRev = function() {
                return _.sumCollection($scope.loan.storage, 'revenue');
            }
            $scope.getTotalStoEligible = function() {
                return _.sumCollection($scope.loan.storage, 'eligible_proceeds');
            }
            $scope.calcAddCurrentOrigFee = function() {
                return 100;
                //(((loan.fins.commit_arm+loan.fins.commit_dist)-loan.addendums[loan.addendums.length - 1].arm_and_dist)*(loan.fins.fee_processing/100))-(AppFactory.calcAddendumOrigFee(loan.addendums[loan.addendums.length-1], loan))
            };
            $scope.calcAddCurrentSrveFee = function() {
                return 150;
                //AppFactory.calcAddendumSrvcFee(((loan.fins.commit_arm+loan.fins.commit_dist)-loan.addendums[loan.addendums.length - 1].arm_and_dist)*(loan.fins.fee_service/100) - loan.addendums[loan.addendums.length-1], loan)
            };
            $scope.calcAddCurrentCommittment = function() {
                return 200;
                //(loan.fins.commit_arm+loan.fins.commit_dist)-loan.addendums[loan.addendums.length-1].arm_and_dist
            };
            $scope.calcAddLastOrigFee = function() {
                return 1000;
                //((loan.fins.commit_arm+loan.fins.commit_dist)-loan.addendums[loan.addendums.length - 1].arm_and_dist)*(loan.fins.fee_processing/100)
            };
            $scope.calcAddLastSrvcFee = function() {
                return 2000;
                //((loan.fins.commit_arm+loan.fins.commit_dist)-loan.addendums[loan.addendums.length - 1].arm_and_dist)*(loan.fins.fee_service/100)
            };

            //console.log('Loan', $scope.loan);
            //console.log('LoanCrops', $scope.loan.loancrops);
            //console.log('InsPols', $scope.loan.inspols);
            //console.log('Addendums', $scope.loan.addendums);

        } // end controller
})();