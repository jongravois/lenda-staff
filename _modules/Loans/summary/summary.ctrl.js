(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('SummaryController', SummaryController);

        SummaryController.$inject = ['$rootScope', '$scope', '$state', '$templateCache', 'AppFactory'];

        function SummaryController($rootScope, $scope, $state, $templateCache, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            var view = $templateCache.get();
            //console.log('HTML', view);

            $scope.comments = AppFactory.parseComments($scope.loan.comments);
            var optimizer = AppFactory.optimized($scope.loan);

            $scope.getCropProdYield = function(obj) {
                return _.weighted(obj.practices, 'prod_yield', 'acres');
            };
            $scope.getCropProdPrice = function(obj) {
                return _.weighted(obj.practices, 'prod_price', 'acres');
            };
            $scope.getCropProdShare = function(obj) {
                return _.weighted(obj.practices, 'prod_share', 'acres');
            }
            $scope.getCropTotal = function(obj) {
                var crop_value = Number(obj.acres) * Number($scope.getCropProdYield(obj) * (Number($scope.getCropProdShare(obj)/100)));
                var bk_adj = (obj.bkprice - Number($scope.getCropProdPrice(obj))) * obj.bkqty;
                var harvest_adj = (Number(obj.acres) * Number($scope.getCropProdYield(obj))) - obj.var_harvest;

                return crop_value + bk_adj + harvest_adj;
            }
            $scope.calcAgInput = function(loan) {
                var runner = 0;
                _.each(loan.loancrops, function(i){
                    var cl = $scope.getCropTotal(i);
                    runner += cl;
                });
                return runner;
            }
            $scope.calcTotalRevenue = function(loan) {
                return Number($scope.calcAgInput(loan)) + Number(loan.fins.total_fsa_pay) + Number(loan.fins.total_indirect);
            };
            $scope.calcCropHailValue = function(obj) {
                return 0;
            };
            $scope.calcCropHailTotalValue = function(obj) {
                //TOTAL ACRES OF PRACTICE IN COUNTY x AMOUNT
                return 0;
            };

            //TEMP
            $scope.loan.lien_letter_received = 0;
            //console.log('LOAN', $scope.loan, 'LC', $scope.loan.loancrops);
        } // end controller
})();