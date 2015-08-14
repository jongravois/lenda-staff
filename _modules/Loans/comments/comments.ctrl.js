(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommentsController', CommentsController);

        CommentsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        /* @ngInject */
        function CommentsController($rootScope, $scope, AppFactory) {
            /* jshint validthis: true */
            $scope.comments = $scope.loan.parsedComments;
            console.log('Comments', $scope.comments);

            $scope.checkCommentStatus = function(obj) {
                if(!obj.status || obj.status.length === 0) {
                    return false;
                }
                return true;
            };

            $scope.btnCommentOk = function(comm) {
                return comm.status == true;
            }
            $scope.btnCommentReply = function(comm) {
                alert('Replying');
            }
            //////////

        } // end function
})();