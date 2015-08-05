(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PrereqsController', PrereqsController);

        PrereqsController.$inject = ['$rootScope', '$scope', 'AppFactory'];

        function PrereqsController($rootScope, $scope, AppFactory){
            $scope.docs = $scope.loan.attachments;
            console.log($scope.docs);
        } // end controller
})();