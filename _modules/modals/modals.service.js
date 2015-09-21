(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$modal'];

    /* @ngInject */
    function ModalService($modal) {
        var service = {
            alpine: alpine,
            commentReply: commentReply,
            confirm: confirm,
            confirmDelete: confirmDelete,
            newAnalystComment: newAnalystComment,
            newCommitteeComment: newCommitteeComment,
            newCommitteeReply: newCommitteeReply,
            newDisbursementComment: newDisbursementComment,
            newWatchlistComment: newWatchlistComment,
            optionalUpload: optionalUpload,
            requestDocument: requestDocument,
            requiredUpload: requiredUpload,
            terms: terms
        };

        return service;

        //////////
        function alpine(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/alpine.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'xl'
            });

            return modalInstance.result;
        }
        function commentReply(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/reply.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {};
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function confirm(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/confirm.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
        function confirmDelete(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/confirm.delete.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {};
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
        function newAnalystComment(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/_comment.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function newCommitteeComment(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/_comment.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function newCommitteeReply(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/_comment.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function newDisbursementComment(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/_comment.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function newWatchlistComment(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/_watchlist.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            title: data.title,
                            message: data.message,
                            is_watched: data.is_watched,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'lg'
            });

            return modalInstance.result;
        }
        function optionalUpload(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/upload.optional.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            document: data.document,
                            filename: data.filename,
                            title: data.title,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
        function requestDocument(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/request.document.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            document: data.document,
                            filename: data.filename,
                            title: data.title,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
        function requiredUpload(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/upload.required.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loanID: data.loanID,
                            document: data.document,
                            filename: data.filename,
                            title: data.title,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
        function terms(data) {
            var modalInstance = $modal.open({
                templateUrl: '_modules/modals/terms.modal.html',
                controller: 'ModalController',
                resolve: {
                    data: function(){
                        return {
                            loan_terms: data.loan_terms,
                            loan_type: data.loan_type,
                            title: data.title,
                            message: data.message,
                            buttons: data.buttons
                        };
                    }
                },
                size: 'sm'
            });

            return modalInstance.result;
        }
    }
})();