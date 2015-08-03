/**
 * For diagnostics for development.
 */
(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = [];

    /* @ngInject */
    function HomeFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            var retro = _.map(loans, function(item){
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
                data.due_date = item.due_date;

                data.agencies = item.agencies;
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

                data.beansFAC = item.fins.crop_acres.beansFAC;
                data.cotton = item.fins.crop_acres.cotton;
                data.corn = item.fins.crop_acres.corn;
                data.peanuts = item.fins.crop_acres.peanuts;
                data.rice = item.fins.crop_acres.rice;
                data.sorghum = item.fins.crop_acres.sorghum;
                data.soybeans = item.fins.crop_acres.soybeans;
                data.sugarcane = item.fins.crop_acres.sugarcane;
                data.sunflowers = item.fins.crop_acres.sunflowers;
                data.wheat = item.fins.crop_acres.wheat;

                /*
                 activity.detail
                 data.qb_date = item.;
                 data.qb_type = item.;
                 data.qb_cat = item.;
                 data.qb_amount = item.;

                 account.reconciliation
                 data.commit_arm = item.financials.commit_arm;
                 data.commit_dist = item.financials.commit_dist;
                 data.qb_balance = item.'
                 data.account_classification = item.account_classification'
                 data.is_acct_recon = item.';

                 cashflow
                 data.commit_arm = item.financials.commit_arm;
                 data.fee_total = item.;
                 data.int_percent_arm = item.fins.int_percent_arm;
                 data.cashflow = item.;
                 data.exposure = item.;

                 customer.budget
                 data.budget = item.;
                 data.spent = item.;
                 data.available = data.budget - data.spent;

                 account.summary
                 data.commit_arm = item.financials.commit_arm;
                 data.int_percent_arm = item.fins.int_percent_arm;
                 data.int_percent_dist = item.fins.int_percent_dist;

                 farm.history
                 data.commit_arm = item.financials.commit_arm;
                 data.commit_dist = item.financials.commit_dist;
                 data.fee_total = item.;
                 data.int_percent_arm = item.fins.int_percent_arm;

                 committee.approval
                 data.committee_member = item.;
                 data.analyst_abr = item.analyst_abr;
                 data.applicant = item.applicant;
                 data.crop_year = item.crop_year;
                 data.loantype_abr = item.loantype_abr;
                 data.addendum_date = item.;
                 data.distributor = item.distributor.distributor;
                 data.agencies = item.agencies;
                 data.vote = item.;
                 data.account_classification = item.account_classification'

                 committee.comment
                 data.committee_member = item.;
                 data.analyst_abr = item.analyst_abr;
                 data.applicant = item.applicant;
                 data.crop_year = item.crop_year;
                 data.loantype_abr = item.loantype_abr;
                 data.addendum_date = item.;
                 data.distributor = item.distributor.distributor;
                 data.agencies = item.agencies;
                 data.vote = item.;
                 data.account_classification = item.account_classification'
                 data.log = item.;

                 required

                 audit.user
                 */

                data.interest = Number(item.fins.commit_arm) * Number(item.fins.int_percent_arm);
                return data;
            });
            return retro;
        }
    } // end factory
})();