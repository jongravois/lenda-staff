(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = [];

    /* @ngInject */
    function HomeFactory() {
        var publicAPI = {
            getJonsToy: getJonsToy
        };
        return publicAPI;

        //////////
        function getJonsToy(loans) {
            var retro = _.map(loans, function(item){
                var data = {};
                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;
                if (item.season == 'S'){
                    data.season = 'Spring';
                } else if (item.season == 'F'){
                    data.season = 'Fall';
                }
                data.analyst = item.analyst_abr;
                data.farmer = item.farmer;
                data.applicant = item.applicant;
                data.applicant = item.loantype_abr;
                data.applicant = item.dist;
                data.applicant = item.orig_date;
                data.interest = Number(item.fins.commit_arm) * Number(item.fins.int_percent_arm);
                return data;
            });
            return retro;
        }
    } // end factory
})();