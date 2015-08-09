(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteeCommentController', CommitteeCommentController);

    CommitteeCommentController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans'];

    function CommitteeCommentController($scope, $http, $filter, $timeout, AppFactory, Loans) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;
        console.log('loans', $scope.loans);

        /**
        * comments []
        *   type: "Committee"
        *   comment: "There are concerns ..."
        *   user
        *     name: "Kenn E. Thompson"
        *     nick: "KET"
        *   responses: []
        *     body: "Applicand admitted that he was ..."
        *     user
        *       name: "Kenn E. Thompson"
        *       nick: "KET"
        */
        var comments = _.map($scope.loans, "comments");
        console.log('comments', comments);

        //angular.forEach(comments, function(item){
        //    var temp = AppFactory.parseComments(item);
        //    return temp;
        //});

        $scope.comments = comments;
    }

})();
