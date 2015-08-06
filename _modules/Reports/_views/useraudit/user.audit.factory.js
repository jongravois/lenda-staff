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
            console.log('UserAuditFactory.loans', loans);

            var audit_trail = [];
            _.each(loans, function(item){
                var j = _.each(item.systemics, function(i){
                    i.loan_id = item.id;
                    i.region = item.location.regions.region;
                    i.location = item.location.loc_abr;
                    i.crop_year = item.crop_year;

                    if (item.season == 'S') {
                        i.season = 'Spring';
                    } else if (item.season == 'F') {
                        i.season = 'Fall';
                    }

                    i.analyst_abr = item.analyst_abr;
                    i.farmer = item.farmer.farmer;
                    i.applicant = item.applicant.applicant;
                    i.loantype_abr = item.loantype_abr;

                    i.audit_date = i.updated_at;
                    i.audit_time = i.updated_at;
                    i.audit_user = i.user;
                    i.audit_activity = i.action;

                    audit_trail.push(i);
                });
            });
            console.log('UserAuditFactory.audit_trail', audit_trail);
            return audit_trail;

        }
    } // end factory
})();