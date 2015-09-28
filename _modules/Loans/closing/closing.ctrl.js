(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('ClosingsController', ClosingsController);

        ClosingsController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'AppFactory', 'LoansFactory'];

        function ClosingsController($rootScope, $scope, $state, $stateParams, AppFactory, LoansFactory){
            $scope.newapplications = $state.current.data.newapplications;
            $scope.tggl = {
                showConditions: false,
                showPrereqs: false,
                showDocs: false
            };

            LoansFactory.getPrerequisites($stateParams.loanID)
                .then(function success(rsp) {
                    //console.log(rsp);
                    if (rsp.data.length !== 0) {
                        $scope.docs = rsp.data.data;
                    } else {
                        $scope.docs = [];
                        LoansFactory.getRequiredDocuments($stateParams.loantypeID)
                            .then(function success(rsp) {
                                var docs = rsp.data.data;
                                for (var d = 0; d < docs.length; d++) {
                                    var rdoc = {
                                        'loan_id': $stateParams.loanID,
                                        'document': docs[d]['document']
                                    };
                                    AppFactory.postIt('/prerequisites', rdoc);
                                    $scope.docs.push(rdoc);
                                } // end for
                            });
                    } // end if

                    //console.log('closing', $scope.loan);
                    $scope.missingConditions = [];
                    $scope.missingDocs = [];
                    _.each($scope.loan.loanconditions, function(i){
                        if(i.status === 'pending'){
                            $scope.missingConditions.push(i);
                        }
                    });
                    _.each($scope.docs, function(i){
                        if(!i.date_received) {
                            $scope.missingDocs.push(i);
                        }
                    });
                });

            if( !$scope.missingConditions) {
                $scope.missingConditions = [];
            }

            if( !$scope.missingDocs) {
                $scope.missingDocs = [];
            }

            /*if($scope.missingConditions.length === 0 && $scope.missingDocs.length === 0) {
                $scope.canClose = true;
            } else {
                $scope.canClose = false;
            }*/
            $scope.canClose = false;

        } // end controller
})();