(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AdminFactory', AdminFactory);

    AdminFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function AdminFactory($http, $q, API_URL) {
        var publicAPI = {
            getDistributors: getDistributors
        };
        return publicAPI;

        //////////
        function getDistributors() {
            return $http.get(API_URL+'distributors');
        }
    } // end factory
})();