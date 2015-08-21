(function () {
    'use strict';
    angular
        .module('ARM')
        .constant('_', window._)
        .constant('APP_URL', 'http://www.jotbot.local/')
        .constant('API_URL', 'http://www.jotbot.local/api/')
        .constant('FILE_URL', 'https://s3-us-west-2.amazonaws.com/lenda-loan-docs/')
        .constant('LEGAL_NAME', 'Ag Resource Management');
})();
