(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['Loans', 'HomeFactory'];

    function HomeController(Loans, HomeFactory) {
        $scope.loans = Loans;
        console.log(Loans);
        console.log($scope.loans);

        $scope.arr = HomeFactory.getData($scope.loans);
        console.log($scope.arr);

    } // end function
})();