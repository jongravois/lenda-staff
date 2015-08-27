(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteesController', CommitteesController);

        CommitteesController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function CommitteesController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;
            $scope.comments = AppFactory.parseComments($scope.loan.comments);
            console.log($scope.loan.committee, 'comments', $scope.comments.Committee);

            $scope.alertChosen = function(id) {
                if(id === 0 || id === '0') {
                    return 'cRed';
                } else {
                    return 'cBlack'
                }
            };
            $scope.alertRow = function(id) {
                if(id === 0 || id === '0') {
                    return 'danger';
                }
            };
            $scope.createCommittee = function() {
                alert('working');
            };
        } // end controller
})();