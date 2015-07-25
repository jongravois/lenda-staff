(function () {
    'use strict';

    angular
        .module('ARM')
        .directive('loanStatusIcon', LoanStatusIconDirective);

    LoanStatusIconDirective.$inject = ['$compile'];

    function LoanStatusIconDirective($compile) {
        var templateMap = {
            '1': '<span class="staticon glyphicon glyphicon-wrench" tooltip="In_Progress" tooltip-append-to-body="true" tooltip-placement="bottom" style="color: #009;"></span>',
            '2': '<span class="staticon glyphicon glyphicon-ok" tooltip="Paid" tooltip-append-to-body="true" tooltip-placement="bottom" style="color: #090;"></span>',
            '3': '<span class="staticon glyphicon glyphicon-share-alt" tooltip="Recommended" tooltip-append-to-body="true" tooltip-placement="bottom"></span>',
            '4': '<span class="staticon glyphicon glyphicon-thumbs-up" tooltip="Approved" tooltip-append-to-body="true" tooltip-placement="bottom"></span>',
            '5': '<span class="staticon glyphicon glyphicon-thumbs-down" tooltip="Denied" tooltip-append-to-body="true" tooltip-placement="bottom" style="color: #900;"></span>',
            'default': '<span class="staticon glyphicon glyphicon-wrench" tooltip="In_Progress" tooltip-append-to-body="true" tooltip-placement="bottom" style="color: #009;"></span>'
        };

        function linker(scope, element, attrs) {
            var template = templateMap[scope.status] || templateMap.default;
            element.append($compile(template)(scope));
        }

        return {
            restrict: 'A',
            link: linker,
            scope: {
                status: '@'
            }
        };

    }

})();
