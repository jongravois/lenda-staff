(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('MenuFactory', MenuFactory);

    MenuFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function MenuFactory($http, $q, API_URL) {
        var publicAPI = {
            getLoantypes: getLoantypes,
            getReports: getReports
        };
        return publicAPI;

        //////////
        function getLoantypes() {
            return $http.get(API_URL + 'loantypes');
        }
        function getReports() {
            return $http.get(API_URL + 'reports');
        }

    } // end factory
})();