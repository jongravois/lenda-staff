(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommentsController', CommentsController);

        CommentsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'ModalService'];

        /* @ngInject */
        function CommentsController($rootScope, $scope, $state, AppFactory, ModalService) {
            /* jshint validthis: true */
            $scope.newapplications = $state.current.data.newapplications;
            $scope.comments = $scope.loan.parsedComments;
            console.log('Comments', $scope.comments.Others);

            $scope.newComment = function(comm_type) {
                switch(comm_type) {
                    case 'analyst':
                        var data = {
                            loan_id: $scope.loan.id,
                            title: 'Analyst Comment',
                            message: '',
                            buttons: ['ok', 'cancel']
                        };
                        ModalService.newAnalystComment(data)
                            .then(function() {
                                // OK Button Clicked
                                alert(data.message);
                            }, function() {
                                // Cancel Button Clicked
                            });
                        break;
                    case 'disbursement':
                        var data = {
                            loan_id: $scope.loan.id,
                            title: 'Disbursement Comment',
                            message: '',
                            buttons: ['ok', 'cancel']
                        };
                        ModalService.newDisbursementComment(data)
                            .then(function() {
                                // OK Button Clicked
                                alert(data.message);
                            }, function() {
                                // Cancel Button Clicked
                            });
                        break;
                    case 'watchlist':
                        var data = {
                            loan_id: $scope.loan.id,
                            title: 'Watchlist Comment',
                            message: '',
                            is_watched: $scope.loan.is_watched,
                            buttons: ['ok', 'cancel']
                        };
                        ModalService.newWatchlistComment(data)
                            .then(function() {
                                // OK Button Clicked
                                alert(data.message);
                            }, function() {
                                // Cancel Button Clicked
                            });
                        break;
                    default:
                        var data = {
                            loan_id: $scope.loan.id,
                            title: 'Committee Comment',
                            message: '',
                            buttons: ['ok', 'cancel']
                        };
                        ModalService.newCommitteeComment(data)
                            .then(function() {
                                // OK Button Clicked
                                alert(data.message);
                            }, function() {
                                // Cancel Button Clicked
                            });
                        break;
                        break;
                }
            };
            $scope.checkCommentStatus = function(obj) {
                if(!obj.status || obj.status.length === 0) {
                    return false;
                }
                return true;
            };

            $scope.btnAcceptComment = function(comm) {
                alert(comm.accepted);
                console.log(comm);
            }
            $scope.btnCommentAccepted = function(comm) {
                alert('You have already accepted this comment.');
            }
            $scope.btnCommentReply = function(comm) {
                alert(comm.accepted);
                console.log(comm);
            }
            //////////

        } // end function
})();