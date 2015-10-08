(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ApplicantsController', ApplicantsController);

        ApplicantsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', '$timeout', 'SweetAlert', 'toastr', 'AppFactory'];

        function ApplicantsController($rootScope, $scope, $state, $stateParams, $timeout, SweetAlert, toastr, AppFactory){
            $scope.newapplications = $state.current.data.newapplications;
            if($scope.loan.farmer && $scope.loan.farmer.dob) {
                $scope.loan.farmer.dob = moment($scope.loan.farmer.dob).format('MM/DD/YYYY');
            }

            $scope.farmerSaved = false;

            $scope.newApplicantForm = false;
            $scope.tggl = {
                showFarmer: false,
                showApplicant: false,
                showPartner: false,
                showJoints: false,
                showCorps: false
            };

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
                //console.log('NewloanCtrl', $scope.loan);
            }

            $scope.loan.farmer.dob = new Date($scope.loan.farmer.dob);
            $scope.loan.applicant.dob = new Date($scope.loan.applicant.dob);

            $scope.createApplicantScreen = function() {
                // check for partners and joints with loan_id of 0 and update loan_id
                if(!$scope.loan.applicant.applicant) {
                    toastr.warning('Applicant name is a required field.', 'Unable to Continue');
                    return false;
                }
                if(!$scope.loan.applicant.email) {
                    toastr.warning('Applicant email is a required field', 'Unable to Continue');
                    return false;
                }
                if(!$scope.loan.applicant.ssn) {
                    toastr.warning('Applicant SSN/TID is a required field', 'Unable to Continue');
                    return false;
                }
                if(!$scope.loan.applicant.dob) {
                    toastr.warning('Applicant DOB/Incorporation is a required field', 'Unable to Continue');
                    return false;
                }

                $scope.loan.applicant.loc_id = $scope.loan.loc_id;
                $scope.loan.applicant.farmer_id = $scope.loan.farmer_id;
                AppFactory.postIt('applicants', $scope.loan.applicant)
                    .then(function (res) {
                        $scope.loan.applicant_id = res.data;
                        toastr.info('Creating new loan ...', 'Please wait');

                        AppFactory.postIt('loans', $scope.loan)
                            .then(function(newloaned){
                                $timeout(($scope.loan.loan_type_id, res.data), 5000);
                                $state.go('arm.edit.quests', {loantypeID:$scope.loan.loan_type_id, loanID: newloaned.data});
                            });
                    });
            };
            $scope.updateApplicantScreen = function() {
                alert('working');
                //update farmer, applicant and corp if applicable
            };
            $scope.createNewApplicant = function() {
                $scope.loan.applicant.entity_id = 2;
                $scope.newApplicantForm = true;
            }
            $scope.createNewFarmer = function() {
                if (!$scope.loan.farmer.ssn) {
                    toastr.warning('A Social Security Number or Tax Identification Number is required.', 'Failure');
                    return false;
                } else if (!$scope.loan.farmer.email) {
                    toastr.warning('An Email Address is required.', 'Failure');
                    return false;
                } else if (!$scope.loan.farmer.dob) {
                    toastr.warning('A Date of Birth or Date of Incorporation is required.', 'Failure');
                    return false;
                } else {
                    AppFactory.postIt('farmers', $scope.loan.farmer)
                        .then(function(didit){
                            $scope.loan.farmer_id = didit.data;
                            $scope.loan.applicant.entity_id = 2;
                            $scope.farmerSaved = true;
                            $scope.newApplicantForm = true;
                        });
                }
            }
            $scope.useApplicant = function(id) {
                $scope.loan.applicant_id = id;
                toastr.info('Creating new loan ...', 'Please wait');
                AppFactory.postIt('loans', $scope.loan)
                    .then(function(response){
                        $timeout(($scope.loan.loan_type_id, response.data), 5000);
                        $state.go('arm.edit.quests', {loantypeID: $scope.loan.loan_type_id, loanID: response.data});
                    });
            };
            $scope.onFarmerSelect = function ($item, $model, $label) {
                if ($item) {
                    $scope.farmerID = $item.id;
                    $scope.loan.farmer_id = $item.id;
                    $scope.loan.farmer = $item;
                    $scope.loan.farmer.dob = moment($item.dob).toDate();
                    $scope.loan.farmer.new_client = false;
                    $scope.loan.farmer.applicants = $item.applicants;
                    $scope.loan.farmer.showApplicants = true;
                    $scope.loan.farmer.newbie = false;

                    $scope.farmerSaved = true;
                }
            };

            //CORPORATION
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
            //CORPORATION

            //////////
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
        } // end controller
})();