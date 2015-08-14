(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('UnderwritingController', UnderwritingController);

        UnderwritingController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function UnderwritingController($rootScope, $scope, AppFactory){
            console.log('LoanCrops', $scope.loan.loancrops);

            $scope.calcCropAcres = function(obj) {
                var practices = obj.practices;
                return _.sumCollection(practices, 'acres');
            };
            $scope.calcCropAph = function(obj) {
                var practices = obj.practices;
                return _.weighted(practices, 'aph', 'acres');
            };
            $scope.calcCropProdPrice = function(obj) {
                var practices = obj.practices;
                return _.weighted(practices, 'prod_price', 'acres');
            };
            $scope.calcCropProdShare = function(obj) {
                var practices = obj.practices;
                return _.weighted(practices, 'prod_share', 'acres');
            };
            $scope.calcCropValue = function(obj) {
                return Number($scope.calcCropAcres(obj)) * Number($scope.calcCropAph(obj)) * Number($scope.calcCropProdPrice(obj)) * (Number($scope.calcCropProdShare(obj))/100)
            };
            $scope.calcBookAdj = function(obj) {
                var bka = (Number(obj.bkprice) - Number($scope.calcCropProdPrice(obj))) * Number(obj.bkqty);
                if(bka < 0) {
                    return 0;
                } else {
                    return bka;
                }
            };
            $scope.calcHvstAdj = function(obj) {
                var hvsta = Number($scope.calcCropAcres(obj)) * Number($scope.calcCropAph(obj)) * Number(obj.var_harvest);
                if(hvsta < 0) {
                    return 0;
                } else {
                    return hvsta;
                }
            };
        } // end controller
})();