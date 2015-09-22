(function () {
    'use strict';

    angular
        .module('ARM', [
            'ui.router',
            'ui.bootstrap',
            'satellizer',
            'toastr',
            'oitozero.ngSweetAlert',
            'angularGrid',
            'ui.mask',
            'xeditable',
            'angular-loading-bar',
            'ui.bootstrap-slider',
            'ng-pdfmake'
        ])
        .config(function(){
            function groupByMulti(obj, values, context) {
                if (!values.length) {
                    return obj;
                }
                var byFirst = _.groupBy(obj, values[0], context),
                    rest = values.slice(1);
                for(var prop in byFirst) {
                    byFirst[prop] = _.groupByMulti(byFirst[prop], rest, context);
                }
                return byFirst;
            }

            function sumCollection(arr, val) {
                return _.reduce(arr, function(sum, item){
                    return sum += Number(item[val]);
                }, 0);
            }

            function pluckuniq(col, val) {
                return _.first(_.uniq(_.pluck(col, val)));
            }

            /*
             * col (collection) | val (to be adjusted) | factor (percent field)
             */
            function weighted(col, val, factor){
                var total_factor = _.sumCollection(col, factor);

                return _.reduce(col, function(sum, current) {
                    return sum += (current[val]) * (current[factor] / total_factor);
                }, 0);
            }

            function average(col, cb) {
                return _(col)
                        .map(cb)
                        .reduce(function(result, item){
                            return result + item;
                        }) / _.size(col);
            }

            _.mixin({
                groupByMulti: groupByMulti,
                sumCollection: sumCollection,
                pluckuniq: pluckuniq,
                weighted: weighted,
                average: average
            });
        })
        .run(function ($rootScope, $location) {
            $rootScope.$on('$stateChangeSuccess', function(event, toState) {
                $rootScope.path = toState.url.substr(1);
                //console.log($rootScope.path);
            });
        });
})();
