(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('CommitteesController', CommitteesController);

        CommitteesController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function CommitteesController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.AppFactory = AppFactory;
            $scope.comments = AppFactory.parseComments($scope.loan.comments);
            console.log($scope.loan.committee);

            $scope.loan.committee = _.sortBy($scope.loan.committee, 'role_id')

            $scope.gridOptsCommittee = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'status',
                        enableCellEdit: true,
                        displayName: ' ',
                        cellTemplate: './_modules/Loans/committee/_status.tmpl.html',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'committee_role',
                        enableCellEdit: true,
                        displayName: 'Role',
                        cellTemplate: '<span class="cBlack" ng-class="grid.appScope.alertChosen(row.entity.user_id)">{{row.entity.committee_role}}</span>',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '120'
                    },
                    {
                        name: 'user.name',
                        enableCellEdit: true,
                        displayName: 'User',
                        cellClass: 'text-left cBlue',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '140'
                    },
                    {
                        name: 'vote_request_date',
                        enableCellEdit: false,
                        displayName: 'Added',
                        cellClass: 'text-center',
                        cellFilter: "date:'M/d/yy'",
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'vote_received_date',
                        enableCellEdit: false,
                        displayName: 'Voted',
                        cellClass: 'text-center',
                        cellFilter: "date:'M/d/yy'",
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '80'
                    },
                    {
                        name: 'vote',
                        enableCellEdit: true,
                        displayName: 'Vote',
                        cellClass: 'text-center',
                        cellTemplate: './_modules/Loans/committee/_vote.tmpl.html',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '160'
                    },
                    {
                        name: 'del',
                        enableCellEdit: false,
                        displayName: ' ',
                        cellClass: 'text-center',
                        enableColumnMenu: false,
                        width: '30',
                        maxWidth: '30',
                        cellTemplate: '<span style="font-size:16px; color:#990000; cursor:pointer;" ng-click="grid.appScope.deleteOne(row.entity.id)">&cross;</span>',
                        headerCellTemplate: '<div class="text-center padd bGreen" style="width:30px;">&nbsp;</div>'
                    }
                ],
                data: $scope.loan.committee
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.committee, function (rawdata) {
                var record = {};
                record.changedAttrs = {};

                Object.defineProperty(record, 'isDirty', {
                    get: function () {
                        return Object.getOwnPropertyNames(record.changedAttrs).length > 0;
                    }
                });

                angular.forEach(rawdata, function (value, key) {
                    Object.defineProperty(record, key, {
                        get: function () {
                            return rawdata[key];
                        },

                        set: function (value) {
                            var origValue = record.changedAttrs[key] ? record.changedAttrs[key][0] : rawdata[key];

                            if(value !== origValue) {
                                record.changedAttrs[key] = [origValue, value];
                            } else {
                                delete record.changedAttrs[key];
                            }
                            rawdata[key] = value;
                        }
                    })
                });
                records.push(record);
            });

            $scope.gridOptsCommittee.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = 32 + $scope.loan.committee.length * 30;
                $scope.wdt = 700;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };

            $scope.alertChosen = function(id) {
                if(id === 0 || id === '0') {
                    return 'cRed';
                } else {
                    return 'cBlack'
                }
            };
            $scope.alertRow = function(id) {
                if(id === 0 || id === '0') {
                    return 'danger';
                }
            };
            $scope.createCommittee = function() {
                alert('working');
            };
            $scope.voteApprove = function(obj) {
                alert('I approve');
            }
            $scope.voteReject = function(obj) {
                alert('I reject');
            }
            $scope.deleteOne = function(id) {
                alert('working');
            }
            $scope.createComment = function(obj) {
                alert("Where's my modal");
            }
            //////////
            function getNewCommittee() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    committee: '',
                    ssn: '',
                    email: '',
                    phone: ''
                };
            }
        } // end controller
})();
