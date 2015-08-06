(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('QuickBooksService', QuickBooksService);

    QuickBooksService.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function QuickBooksService($http, $q, API_URL) {
        var publicAPI = {
            getQBData: getQBData
        };
        return publicAPI;

        //////////
        function getQBData(){
            return $http.get('angular/quickbooks/sync.json');
        }
    } // end factory
})();