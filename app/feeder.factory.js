(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('FeederFactory', FeederFactory);

    FeederFactory.$inject = ['$http', 'toastr', 'API_URL'];

    /* @ngInject */
    function FeederFactory($http, toastr, API_URL) {
        var data = {
            comms: [
                {id: 'email', name: 'Email'},
                {id: 'SMS', name: 'Text'}
            ],
            hpOpts: [
                {id: 1, abr: 'll', option: 'Loan List'},
                {id: 2, abr: 'lm', option: 'Loan Management'}
            ],
            seasons: [
                {id: 1, abr: 'F', season: 'Fall'},
                {id: 2, abr: 'S', season: 'Spring'}
            ]
        };

        function getAgencies() {
            return $http.get(API_URL + 'agencies')
                .then(function (response) {
                    data.agencies = response.data.data;
                });
        }

        function getCrops() {
            return $http.get(API_URL + 'crops')
                .then(function success(response) {
                    data.crops = response.data.data;
                });
        }

        function getCounties() {
            return $http.get(API_URL + 'counties')
                .then(function (response) {
                    data.counties = response.data.data;
                });
        }

        function getDistributors() {
            return $http.get(API_URL + 'distributors')
                .then(function (response) {
                    data.distributors = response.data.data;
                });
        }

        function getEntityTypes() {
            return $http.get(API_URL + 'entitytypes')
                .then(function (response) {
                    data.entitytypes = response.data.data;
                });
        }

        function getInsOpts() {
            return $http.get(API_URL + 'insopts')
                .then(function (response) {
                    data.insopts = response.data.data;
                });
        }

        function getInsTypes() {
            return $http.get(API_URL + 'instypes')
                .then(function (response) {
                    data.instypes = response.data.data;
                });
        }

        function getInsUnits() {
            return $http.get(API_URL + 'insunits')
                .then(function (response) {
                    data.insunits = response.data.data;
                });
        }

        function getLoanStatuses() {
            return $http.get(API_URL + 'loanstatus')
                .then(function (response) {
                    data.loanstatuses = response.data.data;
                });
        }

        function getLoanTypes() {
            return $http.get(API_URL + 'loantypes')
                .then(function (response) {
                    data.loantypes = response.data.data;
                });
        }

        function getLocations() {
            return $http.get(API_URL + 'locations')
                .then(function (response) {
                    data.locations = response.data.data;
                });
        }

        function getMeasures() {
            return $http.get(API_URL + 'measures')
                .then(function (response) {
                    data.measures = response.data.data;
                });
        }

        function getRegions() {
            return $http.get(API_URL + 'regions')
                .then(function (response) {
                    data.regions = response.data.data;
                });
        }

        function getReports() {
            return $http.get(API_URL + 'reports')
                .then(function (response) {
                    data.reports = response.data.data;
                });
        }

        function getReportTrackers() {
            return $http.get(API_URL + 'reporttrackers')
                .then(function (response) {
                    data.reports = response.data.data;
                });
        }

        function getRoles() {
            return $http.get(API_URL + 'roles')
                .then(function (response) {
                    data.roles = response.data.data;
                });
        }

        function getSpendcats() {
            return $http.get(API_URL + 'spendcats')
                .then(function (response) {
                    data.spendcats = response.data.data;
                });
        }

        function getStates() {
            return $http.get(API_URL + 'states')
                .then(function (response) {
                    data.states = response.data.data;
                });
        }

        function getObject() {
            //toastr.success('Loaded feeder lists', 'Success!');
            return data;
        }

        function init() {
            // trigger http calls to get data.
            getAgencies();
            getCounties();
            getCrops();
            getDistributors();
            getEntityTypes();
            getInsOpts();
            getInsTypes();
            getInsUnits();
            getLoanStatuses();
            getLoanTypes();
            getLocations();
            getMeasures();
            getRegions();
            getReports();
            getReportTrackers();
            getRoles();
            getSpendcats();
            getStates();
        }

        return {
            init: init,
            getObject: getObject,
            getStates: getStates,
            getSpendcats: getSpendcats,
            getRoles: getRoles,
            getReportTrackers: getReportTrackers,
            getReports: getReports,
            getRegions: getRegions,
            getMeasures: getMeasures,
            getLocations: getLocations,
            getLoanStatuses: getLoanStatuses,
            getLoanTypes: getLoanTypes,
            getInsUnits: getInsUnits,
            getInsTypes: getInsTypes,
            getInsOpts: getInsOpts,
            getEntityTypes: getEntityTypes,
            getDistributors: getDistributors,
            getCounties: getCounties,
            getAgencies: getAgencies
        };
    } // end factory
})();