(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('DistributorsController', DistributorsController);

        DistributorsController.$inject = ['$filter', '$location', 'SweetAlert', 'AppFactory', 'List', 'States'];

        /* @ngInject */
        function DistributorsController($filter, $location, SweetAlert, AppFactory, List, States ) {
            /* jshint validthis: true */
            var vm = this;
            init();

            vm.distributors = List.data.data;
            vm.hgt = vm.distributors.length * 38;
            vm.states = States.data.data;
            //console.log(vm.distributors);
            //console.log(vm.states);

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

            //////////
            function init() {
                var elems = document.querySelectorAll('.btnCancel');

                for (var i = 0; i < elems.length; i++) {
                    elems[i].click();
                };
            }
            function getNewRecord() {
                return {
                    distributor: '',
                    name: '',
                    address: '',
                    city: '',
                    state_id: 1,
                    zip: '',
                    phone: '',
                    email: ''
                };
            }
        } // end function
})();