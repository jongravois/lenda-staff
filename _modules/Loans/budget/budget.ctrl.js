(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('Budget', Budget);

        Budget.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function Budget($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;
            //console.log('XPS', $scope.loan.expenses);
        } // end controller
})();