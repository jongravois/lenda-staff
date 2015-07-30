(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AppFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$stateParams', 'toastr', 'API_URL'];

    /* @ngInject */
    function AppFactory($http, $q, $state, $stateParamas, toastr, API_URL) {
        var publicAPI = {
            deleteIt: deleteIt,
            filterLoans: filterLoans,
            getAll: getAll,
            getIndicatorWidth: getIndicatorWidth,
            getOne: getOne,
            inArray: inArray,
            nullOrNot: nullOrNot,
            patchIt: patchIt,
            postIt: postIt,
            putIt: putIt,
            returnColor: returnColor,
            sortLoans: sortLoans,
            sumThese: sumThese
        };
        return publicAPI;

        /* MODEL LAYER */
        function deleteIt(npoint, id) {
            return $http.delete(API_URL+npoint+'/'+id);
        }
        function getAll(npoint) {
            return $http.get(API_URL+npoint);
        }
        function getOne(npoint, id) {
            return $http.get(API_URL+npoint+'/'+id);
        }
        function patchIt(npoint, id, data) {
            return $http.patch(API_URL+npoint+'/'+id, data);
        }
        function postIt(npoint, data) {
            return $http.post(API_URL+npoint, data);
        }
        function putIt(npoint, id, data) {
            return $http.put(API_URL+npoint+'/'+id, data);
        }

        /* METHODS */
        function filterLoans(loans, val) {
            //console.log(loans, val, year);
            switch (val) {
                case 'all':
                    return loans;
                    break;
                case 'settings':
                    return _.filter(loans, function (i) {
                        return i.status.id === '1';
                    });
                    break;
                case 'fall':
                    return _.filter(loans, function (i) {
                        return i.status.id === '1' && i.season === 'F';
                    });
                    break;
                case 'spring':
                    return _.filter(loans, function (i) {
                        return i.status.id === '1' && i.season === 'S';
                    });
                    break;
            } // end switch
        }
        function getIndicatorWidth(user) {
            var cnt = 0;

            if(user.viewopts.voIconAddendum) {
                cnt += 1;
            }
            if(user.viewopts.voIconCross) {
                cnt += 1;
            }
            if(user.viewopts.voIconBankruptcy) {
                cnt += 1;
            }
            if(user.viewopts.voIcon3pcredit) {
                cnt += 1;
            }
            if(user.viewopts.voIconAddedland) {
                cnt += 1;
            }
            if(user.viewopts.voIconDisbursement) {
                cnt += 1;
            }
            if(user.viewopts.voIconAttachments) {
                cnt += 1;
            }

            var retro = {
                hide: (cnt === 0 ? true : false),
                width: cnt * 19
            }; //140;
            //console.log(retro);
            return retro;
        }
        function inArray(needle, haystack) {
            if (haystack.indexOf(needle) === -1) {
                return false;
            }
            return true;
        }
        function nullOrNot(obj) {
            return !angular.isDefined(obj) || obj===null;
        }
        function returnColor(val) {
            /* 0-Gray, 1-Green, 2-Yellow, 3-Red, 4-Blue */
            /* 5-Orange, 6-Yellow+, 7-Orange+, 8-Red+ */
            var colors = ['gray', 'green', 'yellow', 'red', 'blue', 'orange', 'yellow_inner', 'orange_inner', 'red_inner'];
            return colors[val] || 'gray';
        }
        function sortLoans(loans, order) {
            if(order === 1 || order === '1') {
                var sorted = _(loans).chain().sortByAll('vote_pending', 'has_comment').reverse().value();
            } else {
                var sorted = _(loans).chain().sortByAll('farmer', 'applicant').value();
            }
            return sorted;
        }
        function sumThese(a, b) {
            return a + b;
        }
    } // end factory

})();