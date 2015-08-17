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
            //console.log('CommitteeApprovalFactory.loans', loans);

            var committees = [];
            _.each(loans, function (item) {
                _.each(item.committee, function (c) {
                    try {
                        c.loan_id = item.id;
                        c.analyst_abr = item.analyst_abr;
                        c.applicant = item.applicant.applicant;
                        c.full_season = item.full_season;
                        c.crop_year = item.crop_year;
                        c.loantype_abr = item.loantype_abr;
                        c.addendum_date = item.addendum_date;
                        c.dist = item.distributor.distributor;
                        c.agency = item.agencies;
                        c.account_classification = item.account_classification;
                        c.committee_member = c.user.name;
                        c.vote = c.vote;
                        committees.push(c);
                    } catch(err) {
                        console.error('ERROR', err.name + ': "' + err.message);
                    }
                });
            });
            return committees;
            //console.log('CommitteeApprovalFactory.committees', committees);
        }
    } // end factory
})();