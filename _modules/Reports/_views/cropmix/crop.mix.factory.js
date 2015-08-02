(function(){
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
            //var kt = _.chain(loans).groupBy('location.location').pairs().value();
            //console.log('kt', kt);

            var groupByCrop = _.partial(_.ary(_.groupBy, 2), _, 'crop');

            var mapped = _(loans).chain()
                .groupBy('location')
                .mapValues(groupByCrop);

            var reduced = _(mapped).chain()
                .map(function(locationGroup) {
                    return _.mapValues(locationGroup, function(v) {
                        var initial = _(v).chain().first().clone().value();
                        return _.reduce(_.rest(v), function(result, n) {
                            result.acres += n.acres;
                            return result;
                        }, initial);
                    });
                });

            /*$scope.budget_subtotals = _.map(reduced, function(item, key) {
             return item.reduce(function(previous, current) {
             previous.acres += current.acres;
             return previous;
             }, 0);
             });*/

            $scope.mapped = mapped.value();
            var redux = reduced.value();
            var flattened = redux;
            $scope.reduced = flattened;
            return $scope.reduced;

            //var retro = _.map(loans, function(item){
            //    var data = {};
            //    data.region = item.location.regions.region;
            //    data.location = item.location.loc_abr;
            //    data.crop_year = item.crop_year;
            //    data.beansFAC = item.fins.crop_acres.beansFAC;
            //    data.cotton = item.fins.crop_acres.cotton;
            //    data.corn = item.fins.crop_acres.corn;
            //    data.peanuts = item.fins.crop_acres.peanuts;
            //    data.rice = item.fins.crop_acres.rice;
            //    data.sorghum = item.fins.crop_acres.sorghum;
            //    data.soybeans = item.fins.crop_acres.soybeans;
            //    data.sugarcane = item.fins.crop_acres.sugarcane;
            //    data.sunflowers = item.fins.crop_acres.sunflowers;
            //    data.wheat = item.fins.crop_acres.wheat;
            //
            //    return data;
            //});
            //return retro;
        }
    } // end factory
})();