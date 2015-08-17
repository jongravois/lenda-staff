(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ReferencesController', ReferencesController);

        ReferencesController.$inject = ['$rootScope', '$scope', '$stateParams', 'SweetAlert', 'AppFactory'];

        function ReferencesController($rootScope, $scope, $stateParams, SweetAlert, AppFactory){
            $scope.showDistributor = false;
            $scope.showReference = false;


            $scope.togShowDistributor = function() {
                $scope.showDistributor = !$scope.showDistributor;
            };
            $scope.togShowReference = function() {
                $scope.showReference = !$scope.showReference;
            };

            $scope.saveReference = function(data, id) {
                AppFactory.putIt('references', id, data);
            };
            $scope.updateReferences = function() {
                AppFactory.putIt('distributors', $scope.loan.distributor.id, $scope.loan.distributor);
                _.each($scope.loan.references, function(i){
                 AppFactory.putIt('references', i.id, i);
                 });
            }
            $scope.createNew = function () {
                var newb = getNewRecord();
                AppFactory.postIt('references', newb)
                    .then(function(rsp){
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.references.push(newb);
                        //console.log($scope.distributors);
                    });
            };
            $scope.deleteReference = function(index, id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('references', id);
                        _.remove($scope.loan.references, {id: id});
                    });
            }
            $scope.doSort = function(propName) {
                $scope.sortBy = propName;
                $scope.reverse = !$scope.reverse;
            };
            //////////
            function getNewRecord() {
                return {
                    loan_id: $stateParams.loanID,
                    creditor: '',
                    contact: '',
                    city_state: '',
                    phone: '',
                    email: ''
                };
            }
        } // end controller
})();