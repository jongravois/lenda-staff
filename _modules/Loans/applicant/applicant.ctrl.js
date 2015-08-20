(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ApplicantsController', ApplicantsController);

        ApplicantsController.$inject = ['$rootScope', '$scope'];

        function ApplicantsController($rootScope, $scope){
            $scope.showFarmer = false;
            $scope.showApplicant = false;
            $scope.showPartner = false;
            $scope.showJoints = false;
            $scope.showCorps = false;

            $scope.togShowFarmer = function() {
                $scope.showFarmer = !$scope.showFarmer;
            };
            $scope.togShowApplicant = function() {
                $scope.showApplicant = !$scope.showApplicant;
            };
            $scope.togShowPartner = function() {
                $scope.showPartner = !$scope.showPartner;
            };
            $scope.togShowJoints = function() {
                $scope.showJoints = !$scope.showJoints;
            };
            $scope.togShowCorps = function() {
                $scope.showCorps = !$scope.showCorps;
            };
            $scope.updateApplicantsScreen = function() {
                alert('working');
            };
            $scope.createNewPartner = function() {
                alert('working');
            }
            $scope.savePartner = function(data, id) {
                alert('working');
            }
            $scope.deletePartner = function(index, id) {
                alert('working');
            }
            $scope.createNewJoint = function() {
                alert('working');
            }
            $scope.saveJoint = function(data, id) {
                alert('working');
            }
            $scope.deleteJoint = function(index,id) {
                alert('working');
            }
            /*
             vm.createNew = function () {
             var newb = getNewRecord();
             AppFactory.postIt('distributors', newb)
             .then(function(rsp){
             var id = rsp.data;
             angular.extend(newb, {id: id});
             vm.distributors.push(newb);
             //console.log(vm.distributors);
             });
             };
             vm.saveRecord = function(data, id){
             AppFactory.putIt('distributors', id, data)
             .then(function(rsp){
             var record = rsp.data;
             AppFactory.getOne('states', record.state_id)
             .then(function(rsp){
             var state_abr = rsp.data.data.abr;
             _.each(vm.distributors, function(i){
             if(i.id === id) {
             i.state_abr = state_abr;
             }
             });
             });
             });
             };
             vm.saveAll = function () {
             _.each(vm.distributors, function(i){
             AppFactory.putIt('distributors', i.id, i);
             });
             };
             vm.deleteOne = function(index, id) {
             SweetAlert.swal({
             title: "Are you sure?",
             text: "You will not be able to undo this operation.",
             type: "warning",
             showCancelButton: true,
             confirmButtonColor: "#006837",
             confirmButtonText: "Delete",
             closeOnConfirm: true},
             function(){
             AppFactory.deleteIt('distributors', id);
             _.remove(vm.distributors, {id: id});
             });
             }
             */
        } // end controller
})();