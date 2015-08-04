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

            function ObjToArray(obj) {
                var arr = obj instanceof Array;

                return (arr ? obj : Object.keys(obj)).map(function(i) {
                    var val = arr ? i : obj[i];
                    if(typeof val === 'object')
                        return ObjToArray(val);
                    else
                        return val;
                });
            }
            console.log('CommitteeApprovalFactory.committee', committee);
            alert(JSON.stringify(ObjToArray(loans.committee, ' ')));

            //var retro = _.map(loans, function (item) {
            //    var committee = [];
            //    var committees = _(item.committee).chain().groupBy('id').value();
            //    console.log('CommitteeApprovalFactory.committee', committee);


                //var loan = {};
                //loan.id = item.id;
                //loan.account_classification = item.account_classification;
                //loan.agency = item.agencies;
                //loan.analyst = item.analyst;
                //loan.analyst_abr = item.analyst_abr;
                //loan.app_date = item.app_date;
                //loan.applicant = item.applicant.applicant;
                //loan.commit_arm = item.financials.commit_arm;
                //loan.commit_dist = item.financials.commit_dist;
                //loan.crop_year = item.crop_year;
                //loan.dist = item.distributor.distributor;
                //loan.due_date = item.due_date;
                //loan.farmer = item.farmer.farmer;
                //loan.int_percent_arm = item.fins.int_percent_arm;
                //loan.int_percent_dist = item.fins.int_percent_dist;
                //loan.loan_type = item.loan_type;
                //loan.loantype_abr = item.loantype_abr;
                //loan.location = item.location.loc_abr;
                //loan.region = item.location.regions.region;
                //loan.season = item.season;
                //loan.status_id = item.status.id;
                //
                //if (loan.season == 'S') {
                //    loan.season = 'Spring';
                //} else if (loan.season == 'F') {
                //    loan.season = 'Fall';
                //}
                //console.log('CommitteeApprovalFactory.loan', loan);

                /*
                var arr = [];
                var locations = _(retro).chain().groupBy('location').pairs().value();
                _.each(locations, function(loc){
                    var rec = {
                        region: getRegion(retro, loc[0]),
                        location: loc[0],
                        crop_year: getCropYear(retro, loc[0]),
                        beansFAC: _.sumCollection(loc[1], 'beansFAC'),
                        corn: _.sumCollection(loc[1], 'corn'),
                        cotton: _.sumCollection(loc[1], 'cotton'),
                        peanuts: _.sumCollection(loc[1], 'peanuts'),
                        rice: _.sumCollection(loc[1], 'rice'),
                        sorghum: _.sumCollection(loc[1], 'sorghum'),
                        soybeans: _.sumCollection(loc[1], 'soybeans'),
                        sugarcane: _.sumCollection(loc[1], 'sugarcane'),
                        sunflowers: _.sumCollection(loc[1], 'sunflowers'),
                        wheat: _.sumCollection(loc[1], 'wheat')
                    };
                    arr.push(rec);
                });
                console.log('CropMixFactory.locations', locations, 'arr', arr);
                */

                //return loan;
            //});
            //console.log('CommitteeApprovalFactory.loan', loan);
            //return retro;

        }
    } // end factory
})();