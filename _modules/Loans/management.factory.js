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
            switch(step) {
                case 'lwn':
                    return false;
                    break;
                default:
                    console.log(val+' at step '+step+' for loan '+loanID);
                    break;
            }
        }
    } // end factory
})();