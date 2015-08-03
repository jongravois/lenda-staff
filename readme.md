## LENDA: STAFF

## Installation

* Clone repo to local environment.
* Run from the webroot: ```npm install```  
* Run from the webroot: ```bower install```
* Run from the webroot: ```bower-installer```
* Run from the /app: ```touch constants.js```
* Edit /app/constants.js as
```(function () {
    'use strict';
    angular
        .module('ARM')
        .constant('_', window._)
        .constant('APP_URL', 'http://path_to_backend_app')
        .constant('API_URL', 'http://path_to_backend_app/api/')
        .constant('FILE_URL', 'http://path_to_backend_app/files_loans/')
        .constant('LEGAL_NAME', 'Ag Resource Management');
})();```

## Developing Tasks

* Run ```gulp``` whenever a javascript file is added to Angular

Use Bower to install packages and then run ```bower install``` and ```bower-installer``` to extract only necessary files to the ./js folder from where they are served.
