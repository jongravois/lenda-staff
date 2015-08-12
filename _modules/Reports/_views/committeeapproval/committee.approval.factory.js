(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('CommitteeApprovalFactory', CommitteeApprovalFactory);

    CommitteeApprovalFactory.$inject = [];

    /* @ngInject */
    function CommitteeApprovalFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            console.log('CommitteeApprovalFactory.loans', loans);

            var committees = [];
            _.each(loans, function(item){

                var j = _.each(item.committee, function(i){
                    i.loan_id = item.id;
                    i.analyst = item.analyst;
                    i.analyst_abr = item.analyst_abr;
                    i.applicant = item.applicant.applicant;
                    i.crop_year = item.crop_year;
                    i.full_season = item.full_season;
                    i.loan_type = item.loan_type;
                    i.loantype_abr = item.loantype_abr;
                    i.is_addendum = item.is_addendum;
                    if(item.is_addendum) {
                        i.addendum_date = item.addendum_date;
                    } else {
                        i.addendum_date = '';
                    }
                    i.dist = item.distributor.distributor;
                    i.agency = item.agencies;
                    i.account_classification = item.account_classification;
                    i.committee_member = i.user.name;
                    committees.push(i);
                });
            });
            console.log('CommitteeApprovalFactory.committees', committees);
            return committees;
        }
    } // end factory
})();