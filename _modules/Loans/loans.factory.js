(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('LoansFactory', LoansFactory);

    LoansFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function LoansFactory($http, $q, API_URL) {
        var publicAPI = {
            getLoan: getLoan,
            getLoans: getLoans
        };
        return publicAPI;

        //////////
        function getLoan(id) {
            return $http.get(API_URL + 'loans/' + id);
        }
        function getLoans() {
            return $http.get(API_URL + 'loans');
        }
    } // end factory
})();