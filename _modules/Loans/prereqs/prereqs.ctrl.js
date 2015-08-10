(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PrereqsController', PrereqsController);

        PrereqsController.$inject = ['$rootScope', '$scope', 'FILE_URL', 'AppFactory'];

        function PrereqsController($rootScope, $scope, FILE_URL, AppFactory){
            $scope.FILE_URL = FILE_URL;
            $scope.docs = $scope.loan.attachments;
            //console.log('DOCS', $scope.docs);
        } // end controller
})();