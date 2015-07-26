(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AppFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$stateParams', 'toastr', 'API_URL'];

    /* @ngInject */
    function AppFactory($http, $q, $state, $stateParamas, toastr, API_URL) {
        var publicAPI = {
            inArray: inArray,
            nullOrNot: nullOrNot,
            patchIt: patchIt,
            postIt: postIt,
            putIt: putIt,
            returnColor: returnColor,
            sumThese: sumThese
        };
        return publicAPI;

        //////////
        function inArray(needle, haystack) {
            if (haystack.indexOf(needle) === -1) {
                return false;
            }
            return true;
        }
        function nullOrNot(obj) {
            return !angular.isDefined(obj) || obj===null;
        }
        function patchIt(end, id, data) {
            return $http.patch(API_URL + end + id, data);
        }
        function postIt(end, data) {
            return $http.post(API_URL + end, data);
        }
        function putIt(end, id, data) {
            return $http.put(API_URL + end + id, data);
        }
        function returnColor(val) {
            /* 0-Gray, 1-Green, 2-Yellow, 3-Red, 4-Blue */
            /* 5-Orange, 6-Yellow+, 7-Orange+, 8-Red+ */
            var colors = ['gray', 'green', 'yellow', 'red', 'blue', 'orange', 'yellow_inner', 'orange_inner', 'red_inner'];
            return colors[val] || 'gray';
        }
        function sumThese(a, b) {
            return a + b;
        }
    } // end factory

})();