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
            console.log($scope.loan.committee);

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
            $scope.voteApprove = function(obj) {
                alert('I approve');
            }
            $scope.voteReject = function(obj) {
                alert('I reject');
            }
            $scope.createComment = function(obj) {
                alert("Where's my modal");
            }
        } // end controller
})();