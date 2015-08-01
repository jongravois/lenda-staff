(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = [];

    /* @ngInject */
    function HomeFactory() {
        var publicAPI = {
            getJons: getJons
        };
        return publicAPI;

        function getJons(loans) {
            var retro = _.map(loans, function(item){
                var data = {};
                data.has_addendum = item.has_addendum;
                data.is_cross_collateralized = item.is_cross_collateralized;
                data.bankruptcy_history = item.bankruptcy_history;
                data.required_3party = item.required_3party;
                data.added_land = item.added_land;
                data.controlled_disbursement = item.controlled_disbursement;
                data.attachments = item.attachments.length;
                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;
                if (item.season == 'S'){
                    data.season = 'Spring';
                } else if (item.season == 'F'){
                    data.season = 'Fall';
                }
                data.analyst = item.analyst;
                data.analyst_abr = item.analyst_abr;
                data.farmer = item.farmer;
                data.applicant = item.applicant;
                data.loan_type = item.loan_type;
                data.loantype_abr = item.loantype_abr;
                data.distributor = item.distributor.distributor;
                data.app_date = item.app_date;
                data.status_id = item.status.id;
                data.agencies = item.agencies;
                data.interest = Number(item.fins.commit_arm) * Number(item.fins.int_percent_arm);
                return data;
            });
            return retro;
        }
    } // end factory
})();