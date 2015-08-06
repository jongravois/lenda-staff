(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('CommitteeCommentFactory', CommitteeCommentFactory);

    CommitteeCommentFactory.$inject = [];

    function CommitteeCommentFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            console.log('CommitteeCommentFactory.loans', loans);

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
                data.farmer = item.farmer.farmer;
                data.applicant = item.applicant.applicant;
                data.loan_type = item.loan_type;
                data.loantype_abr = item.loantype_abr;
                data.dist = item.distributor.distributor;
                data.app_date = item.app_date;
                data.due_date = item.due_date;
                data.past_due = item.past_due;

                data.agency = item.agencies;
                data.status_id = item.status.id;

                data.commit_arm = item.financials.commit_arm;
                data.commit_dist = item.financials.commit_dist;

                data.account_classification = item.account_classification;

                data.int_percent_arm = item.fins.int_percent_arm;
                data.int_percent_dist = item.fins.int_percent_dist;

                data.fee_total = item.financials.fee_total;

                data.comments = item.comments;

                /**
                 * NOT SURE ABOUT THIS DATE
                 * @type {*|data.app_date}
                 */
                data.addendum_date = item.app_date;
                if (item.has_addendum){
                    data.addendum_date_color = "#007700";
                } else {
                    data.addendum_date_color = "#000000";
                }

                //if (params.data.committee_vote == 1){
                //    return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-up" style="color:#007700;"></span></div>';
                //} else if (params.data.committee_vote == 0){
                //    return '<div style="text-align:center !important;"><span class="pendicon glyphicon glyphicon-thumbs-down"  style="color:#770000;"></span></div>';
                //} else {
                //    return '<div style="text-align:center !important;"> - </div>';
                //}

                //comments:
                //        comment: "The grain was inspected and is top quality. It has less than 9% moisture. I don't know what else to write about the grain because I am not really an analyst but this serves as an example of a Loan Comment for this loan.",
                //        responses: [ ],
                //        user:
                //            name: "Jonathan Gravois",
                //            nick: "JWG",
                //console.log('CommitteeCommentFactory.loans.comments', loans.comments);

                var comments = [];

                _.each(loans, function(obj){
                    var j = _.each(obj.comments, function(i){
                        var newbie = {};
                        newbie.user_name = i.user.name;
                        newbie.user_nick = i.user.nick;
                //        newbie.comment = i.comments.comment;
                //        newbie.comment_type = i.comments.comment.type;
                        comments.push(newbie);
                    });
                });
                console.log('CommitteeCommentFactory.comments', comments);
                
                return data;
            });
            console.log('CommitteeCommentFactory.retro', retro);
            return retro;

        }
    } // end factory
})();