(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ApplicantsController', ApplicantsController);

        ApplicantsController.$inject = ['$rootScope', '$scope', '$state', 'AppFactory'];

        function ApplicantsController($rootScope, $scope, $state, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;

            $scope.newApplicantForm = false;
            $scope.showFarmer = false;
            $scope.showApplicant = false;
            $scope.showPartner = false;
            $scope.showJoints = false;
            $scope.showCorps = false;

            if($scope.newapplication) {
                AppFactory.getAll('farmers')
                    .then(function(rsp){
                        $scope.farmers = rsp.data.data;
                        console.log('FARMERS', $scope.farmers);
                        $scope.loan.farmer = {
                            farmer: '',
                            ssn: '',
                            farm_exp: 0,
                            address: '',
                            city: '',
                            state_id: null,
                            zip: '',
                            phone: '',
                            email: '',
                            dob: null,
                            first_year_farmer: null,
                            showApplicants: false
                        };
                    });
            }

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
            $scope.createApplicantsScreen = function() {
                alert('working');
            };
            $scope.updateApplicantsScreen = function() {
                alert('working');
            };
            $scope.createNewPartner = function() {
                alert('working');
            };
            $scope.savePartner = function(data, id) {
                alert('working');
            };
            $scope.deletePartner = function(index, id) {
                alert('working');
            };
            $scope.createNewJoint = function() {
                alert('working');
            };
            $scope.saveJoint = function(data, id) {
                alert('working');
            };
            $scope.deleteJoint = function(index,id) {
                alert('working');
            };

            $scope.createNewApplicant = function() {
                $scope.loan.applicant.entity_id = 2;
                $scope.newApplicantForm = true;
            }
            $scope.useApplicant = function(id) {
                alert('Farmer: ' + $scope.loan.farmerID + ' | Applicant: ' + id);
            };

            $scope.onFarmerSelect = function ($item, $model, $label) {
                if ($item) {
                    $scope.farmerID = $item.id;
                    $scope.loan.farmerID = $item.id;
                    $scope.loan.farmer = $item;
                    $scope.loan.farmer.new_client = false;
                    $scope.loan.farmer.applicants = $item.applicants;
                    $scope.loan.farmer.showApplicants = true;
                }
            };

        } // end controller
})();