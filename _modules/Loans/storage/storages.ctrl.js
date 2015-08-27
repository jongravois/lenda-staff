(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('StoragesController', StoragesController);

        StoragesController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function StoragesController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
        } // end controller
})();