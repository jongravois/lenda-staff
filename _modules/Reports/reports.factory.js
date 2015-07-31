(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('ReportsFactory', ReportsFactory);

    ReportsFactory.$inject = [];

    /* @ngInject */
    function ReportsFactory() {
        var publicAPI = {
            getJonsToy: getJonsToy
        };
        return publicAPI;

        //////////
        function getJonsToy(loans) {
            var retro = _.map(loans, function(item){
                var jon = {};
                jon.applicant = item.applicant;
                jon.farmer = item.farmer;
                jon.interest = Number(item.fins.commit_arm) * Number(item.fins.int_percent_arm);
                return jon;
            });
            return retro;
        }
    } // end factory
})();