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
            scope: { obj: '=' },
            templateUrl: './_modules/Loans/comments/_comment.card.html'
        };
    }
})();