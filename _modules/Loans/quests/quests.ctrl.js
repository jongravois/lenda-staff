(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('QuestsController', QuestsController);

        QuestsController.$inject = ['$rootScope', '$scope', '$state'];

        function QuestsController($rootScope, $scope , $state){
            $scope.newapplications = $state.current.data.newapplications;
            //console.log('Loan', $scope.loan);
            //console.log('Quests', $scope.loan.quests);
            $scope.updateLoanQuestions = function() {
                alert('working');
            };
        } // end controller
})();