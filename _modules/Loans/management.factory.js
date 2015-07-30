(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('ManFactory', ManFactory);

    ManFactory.$inject = [];

    /* @ngInject */
    function ManFactory() {
        var publicAPI = {
            clickManagement: clickManagement
        };
        return publicAPI;

        //////////
        function clickManagement(val, step) {
            alert(val + ' at step ' + step);
        }
    } // end factory
})();