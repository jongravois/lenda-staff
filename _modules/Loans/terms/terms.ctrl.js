(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('TermsController', TermsController);

        TermsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'ModalService'];

        function TermsController($rootScope, $scope, $state, AppFactory, ModalService){
            $scope.newapplications = $state.current.data.newapplications;

            _.each($scope.loan.terms, function(i){
                i.mod_date = new Date(i.mod_date);
                i.due_date = new Date(i.due_date);
            });

            console.log('TERMS', $scope.loan.terms);

            $scope.showAGI = false;
            $scope.showALL = true;
            $scope.showVST = false;
            $scope.editingTerms = false;

            $scope.spanner = $scope.loan.terms.length;

            $scope.term_orig = _.filter($scope.loan.terms, function(t){
                if(t.mod_type === 'orig'){
                    return t;
                }
            });
            console.log('ORIG', $scope.term_orig);

            $scope.useAll = function() {
                $scope.showAGI = false;
                $scope.showALL = true;
                $scope.showVST = false;
            }
            $scope.useAgi = function() {
                $scope.showAGI = true;
                $scope.showALL = false;
                $scope.showVST = false;
            }
            $scope.useVst = function() {
                $scope.showAGI = false;
                $scope.showALL = false;
                $scope.showVST = true;
            }

            $scope.editTerms = function() {
                //TODO: Determine loan type and options (properties.loan_type)
                //TODO: Only Add Modification column if loan is submitted
                var loan = $scope.loan;
                var terms = loan.terms;
                var tCnt = loan.terms.length;
                var due_date = new Date(terms[tCnt-1].due_date);

                var loan_terms = {
                    due_date: due_date,
                    est_days: terms[tCnt-1].est_days,
                    fee_onTotal: terms[tCnt-1].fee_onTotal,
                    dist_buyDown: terms[tCnt-1].dist_buyDown,
                    int_percent_arm: terms[tCnt-1].int_percent_arm,
                    int_percent_dist: terms[tCnt-1].int_percent_dist,
                    int_percent_borrower: terms[tCnt-1].int_percent_borrower,
                    fee_processing_arm: terms[tCnt-1].fee_processing_arm,
                    fee_service_arm: terms[tCnt-1].fee_service_arm,
                    fee_processing_dist: terms[tCnt-1].fee_processing_dist,
                    fee_service_dist: terms[tCnt-1].fee_service_dist,
                    fee_processing_borrower: terms[tCnt-1].fee_processing_borrower,
                    fee_service_borrower: terms[tCnt-1].fee_service_borrower
                };

                var data = {
                    loan_terms: loan_terms,
                    loan_type: $scope.loan.loan_type_id,
                    title: 'Modify Loan Terms',
                    buttons: ['ok', 'cancel']
                };
                ModalService.terms(data)
                    .then(function() {
                        // OK Button Clicked
                        console.log(data);
                        var estDays = terms[tCnt-1].est_days;
                        var new_due = moment(new Date(data.loan_terms.due_date));
                        if(new_due !== due_date) {
                            var difference = new_due.diff(due_date, 'days');
                            estDays += difference;
                        }
                        var inser = {
                            loan_id: $scope.loan.id,
                            modification_date: moment().format('MM/DD/YYYY'),
                            due_date: new_due.format('MM/DD/YYYY'),
                            est_days: estDays,
                            fee_onTotal: data.loan_terms.fee_onTotal,
                            dist_buyDown: data.loan_terms.dist_buyDown,
                            int_percent_arm: data.loan_terms.int_percent_arm,
                            int_percent_dist: data.loan_terms.int_percent_dist,
                            fee_processing_arm: data.loan_terms.fee_processing_arm,
                            fee_service_arm: data.loan_terms.fee_service_arm,
                            fee_processing_dist: data.loan_terms.fee_processing_dist,
                            fee_service_dist: data.loan_terms.fee_service_dist,
                            fee_processing_borrower: data.loan_terms.fee_processing_borrower,
                            fee_service_borrower: data.loan_terms.fee_service_borrower
                        };
                        AppFactory.postIt('termsmods', inser)
                            .then(function(rsp){
                                $scope.loan.fins.fee_onTotal = data.loan_terms.fee_onTotal;
                                $scope.loan.fins.dist_buyDown = data.loan_terms.dist_buyDown;
                                $scope.loan.terms.push(inser);
                            });
                    }, function() {
                        // Cancel Button Clicked
                    });
            }

            $scope.saveTerms = function() {
                alert('working');
            };

            //TERMS
            $scope.gridOpts = {
                enableCellEditOnFocus: true,
                rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
                columnDefs: [
                    {
                        name: 'mod_date',
                        enableCellEdit: true,
                        displayName: 'Mod Date',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'due_date',
                        enableCellEdit: true,
                        displayName: 'Due Date',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'fee_processing_arm',
                        enableCellEdit: true,
                        displayName: 'Orig Fee %',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'fee_service_arm',
                        enableCellEdit: true,
                        displayName: 'Srvc Fee %',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'int_percent_dist',
                        enableCellEdit: true,
                        displayName: 'Dist Int %',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'int_percent_arm',
                        enableCellEdit: true,
                        displayName: 'ARM Int %',
                        cellClass: 'text-right cBlue',
                        cellFilter: 'flexPercent:1',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'fee_onTotal',
                        enableCellEdit: true,
                        displayName: 'Fee On Total',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'dist_buyDown',
                        enableCellEdit: true,
                        displayName: 'Dist Buy Down',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'dist_buyDown',
                        enableCellEdit: true,
                        displayName: 'Fee Buy Down %',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'dist_buyDown',
                        enableCellEdit: true,
                        displayName: 'Fee Buy Down',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'dist_buyDown',
                        enableCellEdit: true,
                        displayName: 'Int Rate Buy Down %',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
                    },
                    {
                        name: 'dist_buyDown',
                        enableCellEdit: true,
                        displayName: 'Int Rate Buy Down',
                        cellClass: 'text-center',
                        headerCellClass: 'text-center bGreen',
                        enableColumnMenu: false,
                        width: '200'
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
                data: $scope.loan.terms
            };

            $scope.msg = {};
            var records = [];
            angular.forEach($scope.loan.terms, function (rawdata) {
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

            $scope.gridOpts.onRegisterApi = function(gridApi) {
                //set gridApi on scope
                $scope.$scope = $scope;
                $scope.gridApi = gridApi;
                $scope.hgt = 32 + $scope.loan.terms.length * 30;
                $scope.wdt = 870;
                $scope.gridApi.gridHeight = $scope.hgt;
                $scope.gridApi.gridWidth = $scope.wdt;
                gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                    $scope.$apply(function(scope) {
                        scope.dirty = true;
                    });
                });
            };
            //TERMS
        } // end controller
})();