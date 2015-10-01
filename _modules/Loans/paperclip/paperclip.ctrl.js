(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PaperclipsController', PaperclipsController);

    PaperclipsController.$inject = ['$rootScope', '$scope', '$state', 'FILE_URL', 'AppFactory'];

    function PaperclipsController($rootScope, $scope, $state, FILE_URL, AppFactory){
        $scope.newapplications = $state.current.data.newapplications;
        $scope.treedata =
            [
                {
                    id: '1',
                    label: 'Stark, Tony',
                    children: [
                        {
                            id: '11',
                            label: 'All Glass Towers',
                            children : [
                                {
                                    id : '111',
                                    label: 'prereqs',
                                    children : [
                                        {
                                            id: '1111',
                                            label: 'CPA Financials',
                                            children: []
                                        },
                                        {
                                            id: '1112',
                                            label: 'Equipment Inventory',
                                            children: []
                                        },
                                        {
                                            id: '1113',
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
                                    id : '112',
                                    label: 'loan docs',
                                    children : [
                                        {
                                            id: '1121',
                                            label: 'Security Agreement',
                                            children: []
                                        },
                                        {
                                            id: '1122',
                                            label: 'AOI Assignment',
                                            children: []
                                        },
                                        {
                                            id: '1123',
                                            label: 'FSA Assignment',
                                            children: []
                                        },
                                        {
                                            id: '1124',
                                            label: 'Guarantors',
                                            children: [
                                                {
                                                    id: '11241',
                                                    label: 'Sharon Guin',
                                                    children: []
                                                },
                                                {
                                                    id: '11242',
                                                    label: 'Bo Guin',
                                                    children: []
                                                }
                                            ]
                                        },
                                        {
                                            id: '1125',
                                            label: 'Cross Collateral',
                                            children: [
                                                {
                                                    id: '11251',
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
                            id: '12',
                            label: 'Birth Certificate',
                            children: []
                        },
                        {
                            id: '13',
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