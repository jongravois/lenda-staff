(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('QuestsController', QuestsController);

        QuestsController.$inject = ['$rootScope', '$scope', '$state', 'toastr', 'AppFactory'];

        function QuestsController($rootScope, $scope , $state, toastr, AppFactory){
            $scope.newapplications = ($state.current ? $state.current.data.newapplications : false);
            //console.log('Loan', $scope.loan);
            //console.log('Quests', $scope.loan.quests);
            $scope.updateLoanQuestions = function() {
                var q = $scope.loan.quests;
                var doit = AppFactory.putIt('loanquestions', $scope.loan.id, q);
                if(doit) {
                    toastr.success('Updated loan questions.', 'Success');
                } else {
                    toastr.danger('Unable to update loan questions.', 'Please try again.');
                }
            };
        } // end controller
})();