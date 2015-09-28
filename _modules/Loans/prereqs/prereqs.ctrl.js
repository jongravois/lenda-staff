(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PrereqsController', PrereqsController);

        PrereqsController.$inject = ['$rootScope', '$scope', '$state', 'FILE_URL', 'AppFactory'];

        function PrereqsController($rootScope, $scope, $state, FILE_URL, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.treedata =
            [
                {
                    id: 'role1',
                    label: 'Stark, Tony',
                    children: [
                        {
                            id: 'role11',
                            label: 'All Glass Towers',
                            children : [
                                {
                                    id : 'role111',
                                    label: 'prereqs',
                                    children : [
                                        {
                                            id: 'role1111',
                                            label: 'CPA Financials',
                                            children: []
                                        },
                                        {
                                            id: 'role1112',
                                            label: 'Equipment Inventory',
                                            children: []
                                        },
                                        {
                                            id: 'role1113',
                                            label: 'Leases',
                                            children: [
                                                {
                                                    id: 'role11131',
                                                    label: 'Farm 123',
                                                    children: []
                                                },
                                                {
                                                    id: 'role11132',
                                                    label: 'Farm 456',
                                                    children: []
                                                },
                                                {
                                                    id: 'role11133',
                                                    label: 'Farm 567',
                                                    children: []
                                                },
                                                {
                                                    id: 'role11133',
                                                    label: 'Farm 789',
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    id : 'role112',
                                    label: 'loan docs',
                                    children : [
                                        {
                                            id: 'role1121',
                                            label: 'Security Agreement',
                                            children: []
                                        },
                                        {
                                            id: 'role1122',
                                            label: 'AOI Assignment',
                                            children: []
                                        },
                                        {
                                            id: 'role1123',
                                            label: 'FSA Assignment',
                                            children: []
                                        },
                                        {
                                            id: 'role1124',
                                            label: 'Guarantors',
                                            children: [
                                                {
                                                    id: 'role11241',
                                                    label: 'Sharon Guin',
                                                    children: []
                                                },
                                                {
                                                    id: 'role11242',
                                                    label: 'Bo Guin',
                                                    children: []
                                                }
                                            ]
                                        },
                                        {
                                            id: 'role1125',
                                            label: 'Cross Collateral',
                                            children: [
                                                {
                                                    id: 'role11251',
                                                    label: 'Empty',
                                                    children: []
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            id: 'role12',
                            label: 'Birth Certificate',
                            children: []
                        },
                        {
                            id: 'role13',
                            label: 'Pesticide Certificate',
                            children: []
                        }
                    ]
                }
            ];

            $scope.$watch( 'prereqs.currentNode', function( newObj, oldObj ) {
                if( $scope.prereqs && angular.isObject($scope.prereqs.currentNode) ) {
                    console.log( 'Node Selected!!' );
                    console.log( $scope.prereqs.currentNode );
                }
            }, false);
        } // end controller
})();