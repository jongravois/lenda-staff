(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('AppFactory', AppFactory);

    AppFactory.$inject = ['$http', '$q', '$state', '$stateParams', 'toastr', 'API_URL'];

    /* @ngInject */
    function AppFactory($http, $q, $state, $stateParamas, toastr, API_URL) {
        var publicAPI = {
            averageArray: averageArray,
            calcAcresCrop: calcAcresCrop,
            calcAdjExposure: calcAdjExposure,
            calcCashFlow: calcCashFlow,
            calcExposure: calcExposure,
            deleteIt: deleteIt,
            filterLoans: filterLoans,
            fixDollars: fixDollars,
            getAll: getAll,
            getAcresForCropInLoan: getAcresForCropInLoan,
            getAllCrops: getAllCrops,
            getIndicatorWidth: getIndicatorWidth,
            getOne: getOne,
            getSortedData: getSortedData,
            getRaw: getRaw,
            gtZero: gtZero,
            inArray: inArray,
            nullOrNot: nullOrNot,
            parseComments: parseComments,
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
        function getRaw(fullendpoint) {
            return $http.get(API_URL+fullendpoint);
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
        function averageArray(arr) {
            var removed_empty = _.compact(arr);
            return _.sum(removed_empty) / removed_empty.length;
        }
        function calcAcresCrop(cropID, loan) {
            var crop_id = Number(cropID);
            var farmpractices = loan.farmpractices;

            var crop = _.filter(farmpractices, function(i) {
                if (i.crop_id == crop_id) {
                    return i;
                }
            });

            return _.sumCollection(crop, 'acres');
        }
        function calcAdjExposure(loan) {
            return loan.fins.adjExposure;
        }
        function calcExposure(loan) {
            return loan.fins.exposure;
        }
        function calcCashFlow(loan) {
            return loan.fins.cash_flow;
        }
        function filterLoans(loans, val) {
            //console.log(loans, val);
            switch (val) {
                case 'all':
                    return loans;
                    break;
                case 'settings':
                    return _.filter(loans, function (i) {
                        return Number(i.status.id) === 1;
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
        function fixDollars(num, digits) {
            num += 0.5;
            var numS = num.toString(),
                decPos = numS.indexOf('.'),
                substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
                trimmedResult = numS.substr(0, substrLength),
                finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;
            return parseFloat(finalResult);

        }
        function getAcresForCropInLoan(loanID, cropID) {

        }
        function getAllCrops() {
            //TODO: Hard Coded
            return ['corn', 'soybeans', 'beansFAC', 'sorghum', 'wheat', 'cotton', 'rice', 'peanuts', 'sugarcane'];
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
        function getSortedData(state, collection) {
            var ds = [];
            if(state) {
                ds = _.sortByAll(collection, ['vote_pending', 'has_comment', 'is_stale', 'is_watched', 'disbursement_issue']).reverse();
                //console.log('true', ds);
                return ds;
            } else {
                ds = _.sortByAll(collection, ['farmer']);
                //console.log('false', ds);
                return ds;
            }
        }
        function gtZero(value) {
            if (value === 0) {
                return 'text-center';
            }
            else {
                return 'text-right';
            }
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
        function parseComments(comms) {
            if(comms.length < 2) { return []; }
            var Account = _.filter(comms, function(i){
                return i.type == 'Account';
            })
            var Addendum = _.filter(comms, function(i){
                return i.type == 'Addendum';
            });
            var Analyst = _.filter(comms, function(i){
                return i.type == 'Analyst';
            });
            var Committee = _.filter(comms, function(i){
                return i.type == 'Committee';
            })
            var Loan = _.filter(comms, function(i){
                return i.type == 'Loan';
            });
            var Watch = _.filter(comms, function(i){
                return i.type == 'Watch';
            });

            return {
                Account: Account,
                Addendum: Addendum,
                Analyst: Analyst,
                Committee: Committee,
                Loan: Loan,
                Watch: Watch
            };
        }
        function returnColor(val) {
            //console.log('returnColor', val);
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