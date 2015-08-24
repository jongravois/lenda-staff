(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReportsController', ReportsController);

        ReportsController.$inject = ['$scope', 'Loans', 'ReportsFactory'];

        /* @ngInject */
        function ReportsController($scope, Loans, ReportsFactory) {
            /* jshint validthis: true */
            $scope.loans = Loans;
            console.log(Loans);

            $scope.toy = ReportsFactory.getJonsToy($scope.loans);
            console.log('GJT', $scope.toy);

            $scope.reporter = [];
            //////////

        } // end function
})();