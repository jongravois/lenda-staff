(function() {
    'use strict';
    angular
        .module('ARM')
        .config(function(toastrConfig) {
            angular.extend(toastrConfig, {
                closeButton: true,
                timeOut: 3000
            });
        })
        .config(function() {
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
                return _.reduce(arr, function(sum, item) {
                    return sum += Number(item[val]);
                }, 0);
            }

            function pluckuniq(col, val) {
                return _.first(_.uniq(_.pluck(col, val)));
            }

            /*
             * col (collection) | val (to be adjusted) | factor (percent field)
             */
            function weighted(col, val, factor) {
                var totalFactor = _.sumCollection(col, factor);

                return _.reduce(col, function(sum, current) {
                    return sum += (current[val]) * (current[factor] / totalFactor);
                }, 0);
            }

            function average(col, cb) {
                return _(col)
                        .map(cb)
                        .reduce(function(result, item) {
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
        .run(function($window) {
            $window.onbeforeunload = function($window) {
                return 'You have requested a browser refresh. Any unsaved or unconfirmed changes will be lost.';
            };
        })
        .run(function ($rootScope, $location, $anchorScroll) {
            $rootScope.$on('$stateChangeSuccess', function() {
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            });
        })
        .run(function(editableOptions) {
            editableOptions.theme = 'default'; // bootstrap3 theme. Can be 'bs3', 'bs2', 'default'
        })
        .config(function($stateProvider, $urlRouterProvider, $authProvider, $httpProvider, $provide, API_URL, APP_URL) {
            function redirectWhenLoggedOut($q, $injector) {
                return {
                    responseError: function(rejection) {
                        var $state = $injector.get('$state');
                        var rejectionReasons = ['token_not_provided', 'token_expired', 'token_absent', 'token_invalid'];
                        angular.forEach(rejectionReasons, function(value, key) {

                            if(rejection.data.error === value) {
                                localStorage.removeItem('user');
                                $state.go('auth');
                            }
                        });

                        return $q.reject(rejection);
                    }
                };
            } // end redirect function

            $provide.factory('redirectWhenLoggedOut', redirectWhenLoggedOut);
            $httpProvider.interceptors.push('redirectWhenLoggedOut');

            $authProvider.loginUrl = API_URL + 'authenticate';
        });
})();
