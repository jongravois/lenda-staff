(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('LoansFactory', LoansFactory);

    LoansFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function LoansFactory($http, $q, API_URL) {
        var user = JSON.parse(localStorage.getItem('user'));
        var publicAPI = {
            getLoan: getLoan,
            getLoans: getLoans
        };
        return publicAPI;

        //////////
        function getLoan(id) {
            return getLoans().
                then(function(loans) {
                    return _.find(loans, function(i) {
                        return i.id == id;
                    });
                });
        }
        function getLoans() {
            return $http.get(API_URL + 'loans').then(getLoansData);
        }
        //////////
        function getLoansData(response) {
            var allLoans = response.data.data;
            return $q.all(allLoans.map(updateLoanData));
        }
        function updateLoanData(loan) {
            return $q.all({
                crops: getCrops(loan),
                full_farm_exps: getExpenses(loan),
                insurance: getInsurance(loan)
            })
                .then(function (updatedData) {
                    angular.extend(loan, updatedData);
                    if(testComments(loan, user) !== 0) {
                        loan.has_comment = true;
                    } else {
                        loan.has_comment = false;
                    }
                    if(testVote(loan, user) != 0) {
                        loan.vote_pending = true;
                    } else {
                        loan.vote_pending = false;
                    }
                    return loan;
                });
        }
        //////////
        function getCrops(loan) {
            var crops = [];
            _.each(loan.loancrops, function(item){
                var newbie = {
                    crop_id: item.crops.id,
                    crop: item.crops.crop
                };
                //crops.push(item.crops.crop);
                crops.push(newbie);
            });
            return crops;
        }
        function getExpenses(loan) {
            var ffExps = [];
            var crops_in_loan = getCrops(loan);
            return ffExps;
        }
        function getInsurance(loan) {
            var insurance = [];
            return insurance;
        }
        function testComments(loan, user) {
            if(loan.comments.length !== 0) {
                return _.each(loan.comments, function(it){
                    return _.each(it.status, function(i){
                        if(i.recipient_id === user.id && i.status === 'pending') {
                            return 1;
                        } else {
                            return 0;
                        }
                    });
                });
            } else {
                return 0;
            }
        }
        function testVote(loan, user) {
            if (loan.committee.length !== 0) {
                _.each(loan.committee, function(i){
                    if(i.vote_status === 'pending' && Number(i.user_id) === Number(user.id)) {
                        loan.vote_pending = true;
                    } else {
                        return 0;
                    }
                });
            } else {
                return 0;
            }
        }
    } // end factory
})();