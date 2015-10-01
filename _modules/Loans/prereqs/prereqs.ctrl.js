(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PrereqsController', PrereqsController);

    PrereqsController.$inject = ['$rootScope', '$scope', '$state', 'FILE_URL', 'AppFactory'];

    function PrereqsController($rootScope, $scope, $state, FILE_URL, AppFactory){
        $scope.newapplications = $state.current.data.newapplications;
        $scope.FILE_URL = FILE_URL;
        $scope.docs = $scope.loan.attachments;
        //console.log('DOCS', $scope.docs);
        $scope.savePrereq = function(data, id) {
            AppFactory.putIt('prerequisites', id, data);
        };
        $scope.updatePrereq = function() {
            AppFactory.putIt('distributors', $scope.loan.distributor.id, $scope.loan.distributor);
            _.each($scope.loan.references, function(i){
                AppFactory.putIt('references', i.id, i);
            });
        }
        $scope.createNew = function () {
            var newb = getNewRecord();
            AppFactory.postIt('attachments', newb)
                .then(function(rsp){
                    var id = rsp.data;
                    angular.extend(newb, {id: id});
                    $scope.loan.attachments.push(newb);
                    $scope.docs = $scope.loan.attachments;
                    //console.log($scope.attachments);
                });
        };
        $scope.deletePrereq = function(index, id) {
            SweetAlert.swal({
                    title: "Are you sure?",
                    text: "You will not be able to undo this operation.",
                    type: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#006837",
                    confirmButtonText: "Delete",
                    closeOnConfirm: true},
                function(){
                    AppFactory.deleteIt('attachments', id);
                    _.remove($scope.loan.attachments, {id: id});
                });
        }
        $scope.changeDoc = function($index, id) {
            alert('working');
        };
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