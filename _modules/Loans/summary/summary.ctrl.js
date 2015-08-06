(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('SummaryController', SummaryController);

        SummaryController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function SummaryController($rootScope, $scope, AppFactory){
            $scope.comments = AppFactory.parseComments($scope.loan.comments);
            console.log($scope.comments);
        } // end controller
})();