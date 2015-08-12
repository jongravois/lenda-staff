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
            console.log('CropMixFactory.loans', loans);

            var mapped = _.map(loans, function (item) {
                var data = {};

                data.region = item.location.regions.region;
                data.location = item.location.loc_abr;
                data.crop_year = item.crop_year;

                data.beansFAC = _.find(item.fins.crop_acres, {crop: 'beansFAC'}).acres;
                data.cotton = _.find(item.fins.crop_acres, {crop: 'cotton'}).acres;
                data.corn = _.find(item.fins.crop_acres, {crop: 'corn'}).acres;
                data.peanuts = _.find(item.fins.crop_acres, {crop: 'peanuts'}).acres;
                data.rice = _.find(item.fins.crop_acres, {crop: 'rice'}).acres;
                data.sorghum = _.find(item.fins.crop_acres, {crop: 'sorghum'}).acres;
                data.soybeans = _.find(item.fins.crop_acres, {crop: 'soybeans'}).acres;
                data.sugarcane = _.find(item.fins.crop_acres, {crop: 'sugarcane'}).acres;
                data.sunflowers = _.find(item.fins.crop_acres, {crop: 'sunflowers'}).acres;
                data.wheat = _.find(item.fins.crop_acres, {crop: 'wheat'}).acres;
                data.total = data.beansFAC + data.cotton + data.corn + data.peanuts + data.rice + data.sorghum +
                    data.soybeans + data.sugarcane + data.sunflowers + data.wheat;

                return data;
            });
            //console.log('CropMixFactory.cotton', mapped.cotton);
            console.log('CropMixFactory.mapped', mapped);

            function getRegion(coll, loc) {
                var val = _.find(mapped, function (i) {
                    if (i.location == loc) {
                        return i;
                    }
                });
                return val.region || '';
            }

            function getCropYear(coll, loc) {
                var val = _.find(mapped, function (i) {
                    if (i.location == loc) {
                        return i;
                    }
                });
                return val.crop_year || '';
            }

            var locations = _(mapped).chain().groupBy('location').pairs().value();
            console.log('CropMixFactory.locations', locations);

            var arr = [];
            _.each(locations, function (loc) {
                var rec = {
                    region: getRegion(mapped, loc[0]),
                    location: loc[0],
                    crop_year: getCropYear(mapped, loc[0]),
                    beansFAC: _.sumCollection(loc[1], 'beansFAC'),
                    corn: _.sumCollection(loc[1], 'corn'),
                    cotton: _.sumCollection(loc[1], 'cotton'),
                    peanuts: _.sumCollection(loc[1], 'peanuts'),
                    rice: _.sumCollection(loc[1], 'rice'),
                    sorghum: _.sumCollection(loc[1], 'sorghum'),
                    soybeans: _.sumCollection(loc[1], 'soybeans'),
                    sugarcane: _.sumCollection(loc[1], 'sugarcane'),
                    sunflowers: _.sumCollection(loc[1], 'sunflowers'),
                    wheat: _.sumCollection(loc[1], 'wheat'),
                    total: _.sumCollection(loc[1], 'total')
                };
                arr.push(rec);
            });
            console.log('CropMixFactory.arr', arr);
            return arr;
        }
    } // end factory
})();