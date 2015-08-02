(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('DefaultsFactory', DefaultsFactory);

    DefaultsFactory.$inject = ['$http', 'toastr', 'API_URL'];

    /* @ngInject */
    function DefaultsFactory($http, toastr, API_URL) {
        var data = {
            admingraders: [],
            defaultexpenses: [],
            globvars: [],
            ratioconstraints: []
        };

        function getObject() {
            toastr.success('Loaded defaults lists', 'Success!');
            return data;
        }

        function getAdminGrader() {
            return $http.get(API_URL + 'admingraders')
                .then(function (response) {
                    data.admingraders = response.data.data;
                });
        }
        function getDefaultExpenses() {
            return $http.get(API_URL + 'defaultexpenses')
                .then(function (response) {
                    data.defaultexpenses = response.data.data;
                });
        }
        function getGlobalVariable() {
            return $http.get(API_URL + 'globals')
                .then(function (response) {
                    data.globvars = response.data.data;
                });
        }
        function getRatioConstraints() {
            return $http.get(API_URL + 'ratioconstraints')
                .then(function (response) {
                    data.ratioconstraints = response.data.data;
                });
        }

        function init() {
            getAdminGrader();
            getDefaultExpenses();
            getGlobalVariable();
            getRatioConstraints();
        }

        return {
            init: init,
            getObject: getObject,
            getRatioConstraints: getRatioConstraints,
            getGlobalVariable: getGlobalVariable,
            getDefaultExpenses: getDefaultExpenses,
            getAdminGrader: getAdminGrader
        };
    } // end factory
})();