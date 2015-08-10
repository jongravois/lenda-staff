(function () {
    'use strict';
    angular
        .module('ARM')
        .factory('CropMixFactory', CropMixFactory);

    CropMixFactory.$inject = [];

    /* @ngInject */
    function CropMixFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            //console.log('CropMixFactory.loans', loans);

            var groupByCrop = _.partial(_.ary(_.groupBy, 2), _, 'fins.crop_acres');

            var retro = _.map(loans, function(item){
                var data = {};

                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;

                data.beansFAC = _.find(item.fins.crop_acres, {crop:'beansFAC'}).acres;
                data.cotton = _.find(item.fins.crop_acres, {crop:'cotton'}).acres;
                data.corn = _.find(item.fins.crop_acres, {crop:'corn'}).acres;
                data.peanuts = _.find(item.fins.crop_acres, {crop:'peanuts'}).acres;
                data.rice = _.find(item.fins.crop_acres, {crop:'rice'}).acres;
                data.sorghum = _.find(item.fins.crop_acres, {crop:'sorghum'}).acres;
                data.soybeans = _.find(item.fins.crop_acres, {crop:'soybeans'}).acres;
                data.sugarcane = _.find(item.fins.crop_acres, {crop:'sugarcane'}).acres;
                data.sunflowers = _.find(item.fins.crop_acres, {crop:'sunflowers'}).acres;
                data.wheat = _.find(item.fins.crop_acres, {crop:'wheat'}).acres;

                return data;
            });
            //console.log('CropMixFactory.retro', retro);

            function getRegion(coll, loc) {
                var val = _.find(retro, function(i){
                    if(i.location == loc) {
                        return i;
                    }
                });
                return val.region || '';
            }

            /**
             * getCropYear get a year associated with the location abbreviation of the office, i.e., JON
             * for Jonesboro, Arkansas.  The problem associated with this function is that the year it
             * gets may not be associated with the crop mix.  A location could easily have multiple years
             * of crop data. This needs to be changed ASAP.
             *
             * 2015-07-31
             *
             * @param coll
             * @param loc
             * @returns {*|string}
             */
            function getCropYear(coll, loc) {
                var val = _.find(retro, function(i){
                    if(i.location == loc) {
                        return i;
                    }
                });
                return val.crop_year || '';
            }

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
            return arr;
        }
    } // end factory
})();