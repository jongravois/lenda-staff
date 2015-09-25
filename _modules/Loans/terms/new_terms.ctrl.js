(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('TermsController', TermsController);

    TermsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory', 'ModalService'];

    function TermsController($rootScope, $scope, $state, AppFactory, ModalService){
        $scope.newapplications = $state.current.data.newapplications;

        _.each($scope.loan.terms, function(i){
            i.due_date = new Date(i.due_date);
        });

        $scope.showAGI = false;
        $scope.showALL = true;
        $scope.showVST = false;
        $scope.editingTerms = false;

        $scope.spanner = $scope.loan.terms.length;

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

        /*************************************************/
        $scope.dirty = false;

        $scope.createNew = function () {
            var newb = getNewRecord();
            AppFactory.postIt('termsmods', newb)
                .then(function(rsp){
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    $scope.loan.terms.push(newb);
                    $scope.hgt = $scope.hgt + 40;
                    $scope.gridApi.gridHeight = $scope.hgt;
                    //console.log($scope.distributors);
                });
        };
        $scope.saveRecord = function(data, id){
            AppFactory.putIt('termsmods', id, data)
                .then(function(rsp){
                    var record = rsp.data;
                });
        };
        $scope.saveAll = function () {
            _.each($scope.loan.terms, function(i){
                AppFactory.putIt('termsmods', i.id, i);
            });
            $scope.dirty = false;
        };
        $scope.deleteOne = function(id) {
            //alert(id);
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('termsmods', id);
                    _.remove($scope.loan.terms, {id: id});
                });
        }

        $scope.gridOpts = {
            enableCellEditOnFocus: true,
            rowTemplate: './_modules/Admin/_views/_row.tmpl.html',
            columnDefs: [
                {
                    name: 'mod_type',
                    enableCellEdit: true,
                    displayName: ' ',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '40'
                },
                {
                    name: 'mod_date',
                    enableCellEdit: true,
                    displayName: ' ',
                    cellClass: 'text-left',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '50'
                },
                {
                    name: 'due_date',
                    enableCellEdit: true,
                    displayName: ' ',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '200'
                },
                {
                    name: 'fee_processing_arm',
                    enableCellEdit: true,
                    displayName: 'Origination',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '120'
                },
                {
                    name: 'fee_service_arm',
                    enableCellEdit: true,
                    displayName: 'Srvc',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    editableCellTemplate: 'ui-grid/dropdownEditor',
                    editDropdownValueLabel: 'abr',
                    editDropdownOptionsArray: $scope.states,
                    cellFilter: 'stateabr',
                    width: '40'
                },
                {
                    name: 'int_percent_arm',
                    enableCellEdit: true,
                    displayName: '%',
                    cellClass: 'text-left cBlue',
                    headerCellClass: 'text-center bGreen',
                    enableColumnMenu: false,
                    width: '80'
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
            $scope.hgt = $scope.loan.terms.length * 40;
            $scope.wdt = 940; //TODO: calculate
            $scope.gridApi.gridHeight = $scope.hgt;
            $scope.gridApi.gridWidth = $scope.wdt;
            gridApi.edit.on.afterCellEdit($scope, function(rowEntity, colDef, newValue, oldValue) {
                $scope.$apply(function(scope) {
                    scope.dirty = true;
                });
            });
        };
        //////////
        function init() {}
        function getNewRecord() {
            return {
                loan_id: $scope.loan.id,
                mod_date: new Date(),
                mod_type: 'prog',
                due_date: $scope.loan.terms[$scope.loan.terms.length-1].due_date,
                est_days: $scope.loan.terms[$scope.loan.terms.length-1].est_days,
                dist_buyDown: $scope.loan.terms[$scope.loan.terms.length-1].dist_buyDown,
                int_percent_arm: $scope.loan.terms[$scope.loan.terms.length-1].int_percent_arm,
                int_percent_dist: $scope.loan.terms[$scope.loan.terms.length-1].int_percent_dist,
                int_percent_borrower: $scope.loan.terms[$scope.loan.terms.length-1].int_percent_borrower,
                fee_processing_arm: $scope.loan.terms[$scope.loan.terms.length-1].fee_processing_arm,
                fee_processing_dist: $scope.loan.terms[$scope.loan.terms.length-1].fee_processing_dist,
                fee_processing_borrower: $scope.loan.terms[$scope.loan.terms.length-1].fee_processing_borrower,
                fee_service_arm: $scope.loan.terms[$scope.loan.terms.length-1].fee_service_arm,
                fee_service_dist: $scope.loan.terms[$scope.loan.terms.length-1].fee_service_dist,
                fee_service_borrower: $scope.loan.terms[$scope.loan.terms.length-1].fee_service_borrower
            };
        }
        /*************************************************/
    } // end controller
})();