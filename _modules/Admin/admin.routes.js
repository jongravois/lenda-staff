(function(){
    'use strict';
    angular
        .module('ARM')
            .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('arm.admin', {
                    url: '/admin',
                    abstract: true,
                    templateUrl: '_modules/Admin/_views/admin.view.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.agents', {
                    url: '/agents',
                    templateUrl: '_modules/Admin/agents/agents.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.applicants', {
                    url: '/applicants',
                    templateUrl: '_modules/Admin/applicants/applicants.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.applications', {
                    url: '/applications',
                    templateUrl: '_modules/Admin/applications/applications.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.archive', {
                    url: '/archive',
                    templateUrl: '_modules/Admin/archive/archive.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.budgets', {
                    url: '/budgets',
                    templateUrl: '_modules/Admin/budgets/budgets.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.classroom', {
                    url: '/classroom',
                    templateUrl: '_modules/Admin/classroom/classroom.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.closing', {
                    url: '/closing',
                    templateUrl: '_modules/Admin/closing/closing.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.committee', {
                    url: '/committee',
                    templateUrl: '_modules/Admin/committee/committee.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.committeespecs', {
                    url: '/committeespecs',
                    templateUrl: '_modules/Admin/committeespecs/committeespecs.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.conversions', {
                    url: '/conversions',
                    templateUrl: '_modules/Admin/conversions/conversions.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.crops', {
                    url: '/crops',
                    templateUrl: '_modules/Admin/crops/crops.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.data', {
                    url: '/data',
                    templateUrl: '_modules/Admin/data/data.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.distributors', {
                    url: '/distributors',
                    templateUrl: '_modules/Admin/distributors/distributors.html',
                    controller: 'Admin_DistributorsController',
                    resolve: {
                        List: function(AppFactory) {
                            return AppFactory.getAll('distributors');
                        },
                        States: function(AppFactory) {
                            return AppFactory.getAll('states');
                        }
                    }
                })
                .state('arm.admin.employees', {
                    url: '/employees',
                    templateUrl: '_modules/Admin/employees/employees.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.entitytypes', {
                    url: '/entitytypes',
                    templateUrl: '_modules/Admin/entitytypes/entitytypes.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.farmers', {
                    url: '/farmers',
                    templateUrl: '_modules/Admin/farmers/farmers.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.globals', {
                    url: '/globals',
                    templateUrl: '_modules/Admin/globals/globals.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.grade', {
                    url: '/grade',
                    templateUrl: '_modules/Admin/grade/grade.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.instypes', {
                    url: '/instypes',
                    templateUrl: '_modules/Admin/instypes/instypes.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.insurance', {
                    url: '/insurance',
                    templateUrl: '_modules/Admin/insurance/insurance.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.legal', {
                    url: '/legal',
                    templateUrl: '_modules/Admin/legal/legal.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.loantypes', {
                    url: '/loantypes',
                    templateUrl: '_modules/Admin/loantypes/loantypes.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.locations', {
                    url: '/locations',
                    templateUrl: '_modules/Admin/locations/locations.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.matrix', {
                    url: '/matrix',
                    templateUrl: '_modules/Admin/matrix/matrix.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.measures', {
                    url: '/measures',
                    templateUrl: '_modules/Admin/measures/measures.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.policies', {
                    url: '/policies',
                    templateUrl: '_modules/Admin/policies/policies.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.prerequisites', {
                    url: '/prerequisites',
                    templateUrl: '_modules/Admin/prerequisites/prerequisites.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.products', {
                    url: '/products',
                    templateUrl: '_modules/Admin/products/products.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.qbsync', {
                    url: '/qbsync',
                    templateUrl: '_modules/Admin/quickbooks/qbsync.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.regions', {
                    url: '/regions',
                    templateUrl: '_modules/Admin/regions/regions.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.reports', {
                    url: '/reports',
                    templateUrl: '_modules/Admin/reports/reports.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.reqins', {
                    url: '/reqins',
                    templateUrl: '_modules/Admin/reqins/reqins.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.reqrec', {
                    url: '/reqrec',
                    templateUrl: '_modules/Admin/reqrec/reqrec.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.roles', {
                    url: '/roles',
                    templateUrl: '_modules/Admin/roles/roles.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.staff', {
                    url: '/staff',
                    templateUrl: '_modules/Admin/staff/staff.html',
                    controller: 'AdminController as admin'
                })
                .state('arm.admin.users', {
                    url: '/users',
                    templateUrl: '_modules/Admin/users/users.html',
                    controller: 'AdminController as admin'
                });
        });
})();