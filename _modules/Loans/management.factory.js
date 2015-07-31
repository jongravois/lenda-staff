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
        function clickManagement(loanID, val, step) {
            console.log(val+' at step '+step+' for loan '+loanID);
        }
    } // end factory
})();