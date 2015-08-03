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
                return data;
            });
            //console.log('CropMixFactory.retro', retro);

            function match(coll, loc) {
                var val = _.find(retro, function(i){
                    if(i.location == loc) {
                        return i;
                    }
                });
                return val.region || '';
            }

            var arr = [];

            var locations = _(retro).chain().groupBy('location').pairs().value();
            _.each(locations, function(loc){
                var rec = {
                    region: match(retro, loc[0]),
                    location: loc[0],
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