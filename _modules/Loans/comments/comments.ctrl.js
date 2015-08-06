(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommentsController', CommentsController);

        CommentsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        /* @ngInject */
        function CommentsController($rootScope, $scope, AppFactory) {
            /* jshint validthis: true */
            var comms = $scope.loan.comments;
            $scope.comments = AppFactory.parseComments(comms);
            //console.log('Comments', $scope.comments);

            $scope.btnCommentOk = function(comm) {
                alert('Acknowledged');
            }
            $scope.btnCommentReply = function(comm) {
                alert('Replying');
            }
            //////////

        } // end function
})();