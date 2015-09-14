(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ApplicantsController', ApplicantsController);

        ApplicantsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'SweetAlert', 'toastr', 'AppFactory'];

        function ApplicantsController($rootScope, $scope, $state, $stateParams, $timeout, SweetAlert, toastr, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.farmerSaved = false;

            $scope.newApplicantForm = false;
            $scope.showFarmer = false;
            $scope.showApplicant = false;
            $scope.showPartner = false;
            $scope.showJoints = false;
            $scope.showCorps = false;

            if (!$rootScope.currentUser) {
                try {
                    var user = JSON.parse(localStorage.getItem('user'));
                } catch (exception) {
                    $state.go('auth');
                }
            } else {
                var user = $rootScope.currentUser;
            }
            $scope.user = user;
            //console.log('user', user);

            if($scope.newapplication) {
                AppFactory.getAll('farmers')
                    .then(function(rsp){
                        $scope.farmers = rsp.data.data;
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
                            showApplicants: false,
                            newbie: true
                        };
                    });

                if($stateParams.loanID === 0 || !$scope.loan) {
                    $scope.loan = AppFactory.makeNewLoan($stateParams.loantypeID, user, $scope.defaults);
                }
                console.log('NewloanCtrl', $scope.loan);
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
            $scope.createApplicantScreen = function() {
                // check for partners and joints with loan_id of 0 and update loan_id
                AppFactory.postIt('applicants', $scope.loan.applicant)
                    .then(function (res) {
                        $scope.loan.applicant_id = res.data;
                        AppFactory.postIt('loans', $scope.loan)
                            .then(function(newloaned){
                                $timeout(($scope.loan.loan_type_id, res.data), 3000);
                                $state.go('arm.edit.quests', {loantypeID:$scope.loan.loan_type_id, loanID: newloaned.data});
                        });
                    });
            };
            $scope.updateApplicantScreen = function() {
                alert('working');
                //update farmer, applicant and corp if applicable
            };
            $scope.createNewPartner = function() {
                var newb = getNewPartner();
                AppFactory.postIt('partners', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.applicant.partners.push(newb);
                    });
            };
            $scope.savePartner = function(data, id) {
                AppFactory.putIt('partners', id, data)
                    .then(function(rsp){
                        toastr.success('Updated partner information', 'Success!');
                    });
            };
            $scope.deletePartner = function(index, id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('partners', id);
                        _.remove($scope.loan.partners, {id: id});
                    });
            };
            $scope.createNewJoint = function() {
                var newb = getNewJoint();
                AppFactory.postIt('joints', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.applicant.joints.push(newb);
                    });
            };
            $scope.saveJoint = function(data, id) {
                AppFactory.putIt('joints', id, data)
                    .then(function(rsp){
                        toastr.success('Updated joint venture information', 'Success!');
                    });
            };
            $scope.deleteJoint = function(index,id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('joints', id);
                        _.remove($scope.loan.joints, {id: id});
                    });
            };
            $scope.createNewCorp = function() {
                var newb = getNewCorp();
                AppFactory.postIt('corps', newb)
                    .then(function (rsp) {
                        var id = rsp.data;
                        angular.extend(newb, {id: id});
                        $scope.loan.applicant.corps.push(newb);
                    });
            }
            $scope.saveCorp = function(data, id) {
                AppFactory.putIt('corps', id, data)
                    .then(function(rsp){
                        toastr.success('Updated corporate information', 'Success!');
                    });
            }
            $scope.deleteCorp = function(index, id) {
                SweetAlert.swal({
                        title: "Are you sure?",
                        text: "You will not be able to undo this operation.",
                        type: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#006837",
                        confirmButtonText: "Delete",
                        closeOnConfirm: true},
                    function(){
                        AppFactory.deleteIt('corps', id);
                        _.remove($scope.loan.corps, {id: id});
                    });
            }

            $scope.createNewFarmer = function() {
                AppFactory.postIt('farmers', $scope.loan.farmer)
                    .then(function(didit){
                        $scope.loan.farmer_id = didit.data;
                        $scope.loan.applicant.entity_id = 2;
                        $scope.farmerSaved = true;
                        $scope.newApplicantForm = true;
                    });
            }
            $scope.createNewApplicant = function() {
                $scope.loan.applicant.entity_id = 2;
                $scope.newApplicantForm = true;
            }
            $scope.useApplicant = function(id) {
                $scope.loan.applicant_id = id;
                AppFactory.postIt('loans', $scope.loan)
                    .then(function(response){
                        $timeout(($scope.loan.loan_type_id, response.data), 3000);
                        $state.go('arm.edit.quests', {loantypeID: $scope.loan.loan_type_id, loanID: response.data});
                    });
            };

            $scope.onFarmerSelect = function ($item, $model, $label) {
                if ($item) {
                    $scope.farmerID = $item.id;
                    $scope.loan.farmer_id = $item.id;
                    $scope.loan.farmer = $item;
                    $scope.loan.farmer.new_client = false;
                    $scope.loan.farmer.applicants = $item.applicants;
                    $scope.loan.farmer.showApplicants = true;
                    $scope.loan.farmer.newbie = false;

                    $scope.farmerSaved = true;
                }
            };
            //////////
            function getNewPartner() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    partner: '',
                    ssn: '',
                    email: '',
                    phone: ''
                };
            }
            function getNewJoint() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    partner: '',
                    ssn: '',
                    email: '',
                    phone: ''
                };
            }
            function getNewCorp() {
                return {
                    applicant_id: $scope.loan.applicant.id,
                    corporation: '',
                    ssn: '',
                    adress: '',
                    city: '',
                    state_id: '',
                    zip: '',
                    email: '',
                    phone: '',
                    president: '',
                    vicepresident: '',
                    secretary: '',
                    treasurer: '',
                    description: ''
                };
            }

            /*function moveOn(loantypeID, loanID) {
                $state.go('arm.edit.questions', {loantypeID: loantypeID, loanID: loanID});
            }*/
        } // end controller
})();