(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('LoansFactory', LoansFactory);

    LoansFactory.$inject = ['$http', '$q', 'API_URL'];

    /* @ngInject */
    function LoansFactory($http, $q, API_URL) {
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
            var user = JSON.parse(localStorage.getItem('user'));
            return $http.get(API_URL + 'loans')
                .then(function(rsp){
                    var loans = rsp.data.data;
                    //comments
                    _.each(loans, function(item){
                        item.has_comment = false;
                        if(item.comments.length !== 0) {
                            _.each(item.comments, function(it){
                                _.each(it.status, function(i){
                                    if(i.status === 'pending' && Number(i.recipient_id) === Number(user.id)) {
                                        item.has_comment = true;
                                    }
                                });
                            });
                        }
                    });

                    //vote
                    _.each(loans, function(item){
                        item.vote_pending = false;
                        if(item.committee.length !== 0) {
                            _.each(item.committee, function(i){
                                if(i.vote_status === 'pending' && Number(i.user_id) === Number(user.id)) {
                                    item.vote_pending = true;
                                }
                            });
                        }
                    });

                    return loans;
                });
        }
    } // end factory
})();