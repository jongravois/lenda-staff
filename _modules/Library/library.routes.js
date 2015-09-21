(function(){
    'use strict';
    angular
        .module('ARM')
        .config(function($stateProvider, $urlRouterProvider, API_URL) {
            $stateProvider
                .state('arm.library', {
                    url: '/library',
                    abstract: true,
                    template: '<div ui-view></div>',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.classroom', {
                    url: '/classroom',
                    templateUrl: './_modules/Library/_views/classroom/classroom.html',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.guide', {
                    url: '/guide',
                    templateUrl: './_modules/Library/_views/userguide/guide.html',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.home', {
                    url: '/home',
                    templateUrl: './_modules/Library/home/shell.html',
                    controller: 'LibraryController'
                })
                .state('arm.library.legaldocs', {
                    url: '/legaldocs',
                    templateUrl: './_modules/Library/_views/legaldocs/legaldocs.html',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.loanproducts', {
                    url: '/loanproducts',
                    templateUrl: './_modules/Library/_views/products/loanproducts.html',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.matrix', {
                    url: '/matrix',
                    templateUrl: './_modules/Library/_views/matrix/matrix.html',
                    controller: 'LibraryController as library'
                })
                .state('arm.library.pdfapps', {
                    url: '/pdfapps',
                    templateUrl: 'angular/library/pdf-apps/pdfapps.html',
                    controller: 'PdfAppsController',
                    resolve: {
                        InitialData: function($http, API_URL){
                            var url = API_URL + '/pdfapps';
                            return $http.get(url)
                                .then(function(rsp){
                                    return rsp.data.data;
                                });
                        }
                    }
                })
                .state('arm.library.polsprocs', {
                    url: '/polsprocs',
                    templateUrl: './_modules/Library/_views/policies/pols.procs.tmpl.html',
                    controller: 'PolsProcsController',
                    controllerAS: 'polsprocs'
                })
                .state('arm.library.resources', {
                    url: '/resources',
                    templateUrl: './_modules/Library/_views/resources/resources.html',
                    controller: 'LibraryController as library'
                });
        });
})();