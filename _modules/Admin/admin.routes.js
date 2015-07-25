(function(){
    'use strict';
    angular
        .module('ARM')
            .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: '_modules/Admin/_views/admin.view.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.home', {
                    url: '/home',
                    templateUrl: '_modules/Admin/_views/home.tmpl.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.agents', {
                    url: '/agents',
                    templateUrl: '_modules/Admin/_views/agents/agents.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.applicants', {
                    url: '/applicants',
                    templateUrl: '_modules/Admin/_views/applicants/applicants.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.committeespecs', {
                    url: '/committeespecs',
                    templateUrl: '_modules/Admin/_views/committeespecs/committeespecs.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.crops', {
                    url: '/crops',
                    templateUrl: '_modules/Admin/_views/crops/crops.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.distributors', {
                    url: '/distributors',
                    templateUrl: '_modules/Admin/_views/distributors/distributors.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.entitytypes', {
                    url: '/entitytypes',
                    templateUrl: '_modules/Admin/_views/entitytypes/entitytypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.farmers', {
                    url: '/farmers',
                    templateUrl: '_modules/Admin/_views/farmers/farmers.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.instypes', {
                    url: '/instypes',
                    templateUrl: '_modules/Admin/_views/instypes/instypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.loantypes', {
                    url: '/loantypes',
                    templateUrl: '_modules/Admin/_views/loantypes/loantypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.locations', {
                    url: '/locations',
                    templateUrl: '_modules/Admin/_views/locations/locations.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.measures', {
                    url: '/measures',
                    templateUrl: '_modules/Admin/_views/measures/measures.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.regions', {
                    url: '/regions',
                    templateUrl: '_modules/Admin/_views/regions/regions.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.reports', {
                    url: '/reports',
                    templateUrl: '_modules/Admin/_views/reports/reports.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.roles', {
                    url: '/roles',
                    templateUrl: '_modules/Admin/_views/roles/roles.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.users', {
                    url: '/users',
                    templateUrl: '_modules/Admin/_views/users/users.html',
                    controller: 'AdminController as admin'
                });
        });
})();