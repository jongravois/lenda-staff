(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('MenuController', MenuController);

        MenuController.$inject = ['$scope', 'MenuFactory'];

        /* @ngInject */
        function MenuController($scope, MenuFactory) {
            /* jshint validthis: true */
            MenuFactory.getLoantypes()
                .then(function success(rsp) {
                    $scope.loantypes = rsp.data.data;
                });
            MenuFactory.getReports()
                .then(function success(rsp) {
                    $scope.reports = rsp.data.data;
                });
            $scope.status = { isopen: false };

            //////////
            $scope.toggled = function (open) {
                //$log.log('Dropdown is now: ', open);
            };
            $scope.toggleDropdown = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.status.isopen = !$scope.status.isopen;
            };

        } // end controller
})();