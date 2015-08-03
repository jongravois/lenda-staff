(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('LoanManagementFactory', LoanManagementFactory);

    LoanManagementFactory.$inject = [];

    /* @ngInject */
    function LoanManagementFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            console.log('LoanManagementFactory.loans', loans);

            var groupByCrop = _.partial(_.ary(_.groupBy, 2), _, 'fins.crop_acres');

            var retro = _.map(loans, function (item) {
                var data = {};

                data.has_addendum = item.has_addendum;
                data.is_cross_collateralized = item.is_cross_collateralized;
                data.bankruptcy_history = item.bankruptcy_history;
                data.required_3party = item.required_3party;
                data.added_land = item.added_land;
                data.controlled_disbursement = item.controlled_disbursement;
                data.num_attachments = item.attachments.length;

                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;

                if (item.season == 'S') {
                    data.season = 'Spring';
                } else if (item.season == 'F') {
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
                data.due_date = item.due_date;

                data.agency = item.agencies;
                data.status_id = item.status.id;

                data.its_list = item.its_list;
                data.fsa_compliant = item.fsa_compliant;
                data.prev_lien_verified = item.prev_lien_verified;
                data.leases_valid = item.leases_valid;
                data.bankruptcy_order_received = item.bankruptcy_order_received;
                data.received_3party = item.received_3party;
                data.recommended = item.recommended;
                data.arm_approved = item.arm_approved;
                data.dist_approved = item.dist_approved;
                data.loan_closed = item.loan_closed;
                data.added_land_verified = item.added_land_verified;
                data.permission_to_insure_verified = item.permission_to_insure_verified;
                data.arm_ucc_received = item.arm_ucc_received;
                data.dist_ucc_received = item.dist_ucc_received;
                data.aoi_received = item.aoi_received;
                data.ccc_received = item.ccc_received;
                data.rebate_assignment = item.rebate_assignment;
                data.reconciliation = item.reconciliation;

                data.commit_arm = item.financials.commit_arm;
                data.commit_dist = item.financials.commit_dist;

                data.account_classification = item.account_classification;

                data.int_percent_arm = item.fins.int_percent_arm;
                data.int_percent_dist = item.fins.int_percent_dist;

                return data;
            });
            console.log('LoanManagementFactory.retro', retro);
            return retro;

        }
    } // end factory
})();