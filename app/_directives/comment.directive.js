(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('commentCard', CommentCardDirective);

    CommentCardDirective.$inject = [];

    function CommentCardDirective() {
        return {
            restrict: 'AE',
            transclude: true,
            scope: {
                obj: '=',
                accept: '&',
                accepted: '&',
                reply: '&'
            },
            templateUrl: './_modules/Loans/comments/_comment.card.html'
        };
    }
})();