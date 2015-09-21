(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('MenuController', MenuController);

        MenuController.$inject = ['$rootScope', '$scope', '$state', 'MenuFactory'];

        /* @ngInject */
        function MenuController($rootScope, $scope, $state, MenuFactory) {
            /* jshint validthis: true */
            $scope.path = $rootScope.path;
            //console.log('PATH', $scope.path);

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

            $scope.newLoan = function(id, loantypes) {
                var types = _.find(loantypes, function(item){
                    return item.id === id;
                });

                $rootScope.newlyCreated = {
                    type_id: id,
                    chosenLT: types.loantype,
                    chosenLT_id: types.id
                };

                $state.go('arm.new.applicant', {loantypeID: types.id, loanID: 0});
            }
        } // end controller
})();