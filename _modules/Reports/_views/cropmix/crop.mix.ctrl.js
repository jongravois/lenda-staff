(function () {
    'use strict';
    angular
        .module('ARM')
        .controller('CropMixController', CropMixController);

    CropMixController.$inject = ['$scope', '$http', '$filter', '$timeout', 'AppFactory', 'Loans', 'CropMixFactory'];

    function CropMixController($scope, $http, $filter, $timeout, AppFactory, Loans, CropMixFactory) {
        $scope.AppFactory = AppFactory;
        $scope.loans = Loans;
        //console.log('Loans', $scope.loans);    }

        $scope.reduced = CropMixFactory.getData($scope.loans);
        console.log('reduced', $scope.reduced);

        var totals = {};
        totals.beansFAC = _.sumCollection($scope.reduced, 'beansFAC');
        totals.cotton = _.sumCollection($scope.reduced, 'cotton');
        totals.corn = _.sumCollection($scope.reduced, 'corn');
        totals.peanuts = _.sumCollection($scope.reduced, 'peanuts');
        totals.rice = _.sumCollection($scope.reduced, 'rice');
        totals.sorghum = _.sumCollection($scope.reduced, 'sorghum');
        totals.soybeans = _.sumCollection($scope.reduced, 'soybeans');
        totals.sugarcane = _.sumCollection($scope.reduced, 'sugarcane');
        totals.sunflowers = _.sumCollection($scope.reduced, 'sunflowers');
        totals.wheat = _.sumCollection($scope.reduced, 'wheat');
        totals.total = _.sumCollection($scope.reduced, 'total');

        console.log('CropMixController.totals', totals);
        $scope.totals = totals;
    }
})();
