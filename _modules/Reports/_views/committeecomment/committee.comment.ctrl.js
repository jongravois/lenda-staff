(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeCommentController', CommitteeCommentController);

    CommitteeCommentController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CommitteeCommentFactory'];

    function CommitteeCommentController($scope, $http, $filter, $timeout, AppFactory, Loans, CommitteeCommentFactory) {
        $scope.AppFactory = AppFactory;
        console.log('CommitteeCommentController.$scope.loans', Loans);

        $scope.reduced = CommitteeCommentFactory.getData(Loans);
        console.log('reduced', $scope.reduced);
    }

})();
