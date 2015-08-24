(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeCommentController', CommitteeCommentController);

    CommitteeCommentController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'hotkeys'];

    function CommitteeCommentController($scope, $http, $filter, $timeout, AppFactory, Loans, hotkeys) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;
        console.log('loans', $scope.loans);
    }

})();
