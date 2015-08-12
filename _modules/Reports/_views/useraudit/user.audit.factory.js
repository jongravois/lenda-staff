(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('UserAuditFactory', UserAuditFactory);

    UserAuditFactory.$inject = [];

    /* @ngInject */
    function UserAuditFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
           //console.log('UserAuditFactory.loans', loans);
           var audit_trail = [];
           _.each(loans, function(item){
                _.each(item.systemics, function(i){
                    i.account_classification = item.account_classification;
                    i.addendum_date = item.addendum_date;
                    i.agencies = item.agencies;
                    i.analyst_abr = item.analyst_abr;
                    i.applicant = item.applicant.applicant;
                    i.crop_year = item.crop_year;
                    i.distributor = item.distributor.distributor;
                    i.farmer = item.farmer.farmer;
                    i.full_season = item.full_season;
                    i.loantype_abr = item.loantype_abr;
                    i.location = item.location.loc_abr;
                    i.region = item.location.regions.region;

                    i.audit_activity = i.action;
                    i.audit_date = i.updated_at;
                    i.audit_time = i.updated_at;
                    i.audit_user = i.user;
                    audit_trail.push(i);
                });
                //console.log('UserAuditFactory.audit_trail', audit_trail);
            });
            return audit_trail;
        }
    } // end factory
})();