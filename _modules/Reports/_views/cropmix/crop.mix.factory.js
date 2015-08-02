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
            console.log('CropMixFactory.retro', retro);

            function sum(arr, key, val){
                return _.reduce(arr, function(result, item){
                    result[item[key]] = result[item[key]] || 0;
                    result[item[key]] += item[val];
                    return result;
                }, {});
            }
            var summed = sum(retro, 'location', 'soybeans');
            console.log('summed', summed);

            var locations = _(retro).chain().pluck('location').unique().value();
            console.log('CropMixFactory.locations', locations);
            return retro;




            //var groupByCrop = _.partial(_.ary(_.groupBy, 2), _, 'fins.crop_acres');

            var mapped = _(loans).chain()
                .groupBy('location.loc_abr')
                .mapValues(groupByCrop);

            var reduced = _(mapped).chain()
                .map(function (locationGroup) {
                    return _.mapValues(locationGroup, function (v) {
                        var initial = _(v).chain().first().clone().value();
                        return _.reduce(_.rest(v), function (result, n) {
                            result.soybeans += n.fins.crop_acres.soybeans;
                            return result;
                        }, initial);
                    });
                });

            $scope.mapped = mapped.value();
            console.log('$scope.mapped', $scope.mapped);
            var redux = reduced.value();
            var flattened = redux;
            $scope.reduced = flattened;
            console.log('$scope.reduced', $scope.reduced);
            //return $scope.reduced;


        }
    } // end factory
})();