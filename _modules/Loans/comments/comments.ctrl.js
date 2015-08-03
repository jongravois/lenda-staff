(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommentsController', CommentsController);

        CommentsController.$inject = ['$rootScope', '$scope'];

        /* @ngInject */
        function CommentsController($rootScope, $scope) {
            /* jshint validthis: true */
            var vm = this;
            console.log('commentsLoan', $scope.loan);

            //////////

        } // end function
})();