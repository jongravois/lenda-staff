## LENDA: STAFF

[![Join the chat at https://gitter.im/jongravois/jotclient](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/jongravois/jotclient?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## Installation

* Clone repo to local environment.
* Run from the webroot: ```npm install```  
* Run from the webroot: ```bower-installer```
* Run from the /app: ```touch constants.js```
* Edit /app/constants.js as
    
```
(function () {
'use strict';
    angular
        .module('ARM')
        .constant('_', window._)
        .constant('APP_URL', 'http://path_to_backend_app')
        .constant('API_URL', 'http://path_to_backend_app/api/')
        .constant('FILE_URL', 'https://s3.amazonaws.com/')
        .constant('LEGAL_NAME', 'Ag Resource Management');
})();
```

## Developing Tasks

* Run ```gulp``` whenever a javascript file is added to Angular

Use Bower to install packages and then run ```bower install``` and ```bower-installer``` to extract only necessary files to the ./js folder from where they are served.
