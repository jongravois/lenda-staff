(function(){
    'use strict';
    angular
        .module('ARM')
        .directive('addNew', AddNewDirective);

    AddNewDirective.$inject = [];

    function AddNewDirective() {
        return {
            restrict: 'A',
            template: '<span class="btn btn-xs btn-default"><span class="glyphicons glyphicons-circle-plus" style="color:#006837;"></span> Add New</span>'
        };
    }
})();