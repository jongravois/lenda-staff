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
                .state('admin.agents', {
                    url: '/agents',
                    templateUrl: '_modules/Admin/agents/agents.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.applicants', {
                    url: '/applicants',
                    templateUrl: '_modules/Admin/applicants/applicants.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.applications', {
                    url: '/applications',
                    templateUrl: '_modules/Admin/applications/applications.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.archive', {
                    url: '/archive',
                    templateUrl: '_modules/Admin/archive/archive.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.budgets', {
                    url: '/budgets',
                    templateUrl: '_modules/Admin/budgets/budgets.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.classroom', {
                    url: '/classroom',
                    templateUrl: '_modules/Admin/classroom/classroom.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.closing', {
                    url: '/closing',
                    templateUrl: '_modules/Admin/closing/closing.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.committee', {
                    url: '/committee',
                    templateUrl: '_modules/Admin/committee/committee.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.committeespecs', {
                    url: '/committeespecs',
                    templateUrl: '_modules/Admin/committeespecs/committeespecs.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.conversions', {
                    url: '/conversions',
                    templateUrl: '_modules/Admin/conversions/conversions.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.crops', {
                    url: '/crops',
                    templateUrl: '_modules/Admin/crops/crops.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.data', {
                    url: '/data',
                    templateUrl: '_modules/Admin/data/data.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.distributors', {
                    url: '/distributors',
                    templateUrl: '_modules/Admin/distributors/distributors.html',
                    controller: 'Admin_DistributorsController as vm',
                    resolve: {
                        List: function(AppFactory) {
                            return AppFactory.getAll('distributors');
                        },
                        States: function(AppFactory) {
                            return AppFactory.getAll('states');
                        }
                    }
                })
                .state('admin.employees', {
                    url: '/employees',
                    templateUrl: '_modules/Admin/employees/employees.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.entitytypes', {
                    url: '/entitytypes',
                    templateUrl: '_modules/Admin/entitytypes/entitytypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.farmers', {
                    url: '/farmers',
                    templateUrl: '_modules/Admin/farmers/farmers.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.globals', {
                    url: '/globals',
                    templateUrl: '_modules/Admin/globals/globals.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.grade', {
                    url: '/grade',
                    templateUrl: '_modules/Admin/grade/grade.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.instypes', {
                    url: '/instypes',
                    templateUrl: '_modules/Admin/instypes/instypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.insurance', {
                    url: '/insurance',
                    templateUrl: '_modules/Admin/insurance/insurance.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.legal', {
                    url: '/legal',
                    templateUrl: '_modules/Admin/legal/legal.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.loantypes', {
                    url: '/loantypes',
                    templateUrl: '_modules/Admin/loantypes/loantypes.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.locations', {
                    url: '/locations',
                    templateUrl: '_modules/Admin/locations/locations.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.matrix', {
                    url: '/matrix',
                    templateUrl: '_modules/Admin/matrix/matrix.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.measures', {
                    url: '/measures',
                    templateUrl: '_modules/Admin/measures/measures.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.policies', {
                    url: '/policies',
                    templateUrl: '_modules/Admin/policies/policies.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.prerequisites', {
                    url: '/prerequisites',
                    templateUrl: '_modules/Admin/prerequisites/prerequisites.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.products', {
                    url: '/products',
                    templateUrl: '_modules/Admin/products/products.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.qbsync', {
                    url: '/qbsync',
                    templateUrl: '_modules/Admin/quickbooks/qbsync.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.regions', {
                    url: '/regions',
                    templateUrl: '_modules/Admin/regions/regions.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.reports', {
                    url: '/reports',
                    templateUrl: '_modules/Admin/reports/reports.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.reqins', {
                    url: '/reqins',
                    templateUrl: '_modules/Admin/reqins/reqins.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.reqrec', {
                    url: '/reqrec',
                    templateUrl: '_modules/Admin/reqrec/reqrec.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.roles', {
                    url: '/roles',
                    templateUrl: '_modules/Admin/roles/roles.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.staff', {
                    url: '/staff',
                    templateUrl: '_modules/Admin/staff/staff.html',
                    controller: 'AdminController as admin'
                })
                .state('admin.users', {
                    url: '/users',
                    templateUrl: '_modules/Admin/users/users.html',
                    controller: 'AdminController as admin'
                });
        });
})();