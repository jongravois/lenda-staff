(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AuditController', AuditController);

    AuditController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

    function AuditController($rootScope, $scope, $state, AppFactory){
        $scope.newapplications = $state.current.data.newapplications;
        AppFactory.getRaw('loans/'+$scope.loan.id+'/audit')
            .then(function(rsp){
                $scope.loan.systemics = rsp.data.data;
            });
        //console.log($scope.loan.systemics);
    } // end controller
})();