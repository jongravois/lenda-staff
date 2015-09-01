(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('commentCard', CommentCardDirective);

    AddNewDirective.$inject = [];

    function CommentCardDirective() {
        return {
            restrict: 'A',
            transclude: true,
            controller: 'MenuController as menu',
            templateUrl: './_modules/Loans/_comment.card.html'
        };
    }
})();