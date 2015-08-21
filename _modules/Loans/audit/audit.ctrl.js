(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AuditController', AuditController);

        AuditController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function AuditController($rootScope, $scope, AppFactory){
            //console.log($scope.loan.systemics);
        } // end controller
})();