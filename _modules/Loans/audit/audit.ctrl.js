(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AuditController', AuditController);

        AuditController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function AuditController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            //console.log($scope.loan.systemics);
        } // end controller
})();