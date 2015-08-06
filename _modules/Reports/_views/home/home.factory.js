(function(){
    'use strict';
    angular
        .module('ARM')
        .factory('HomeFactory', HomeFactory);

    HomeFactory.$inject = [];

    function HomeFactory() {
        var publicAPI = {
            getData: getData
        };
        return publicAPI;

        function getData(loans) {
            console.log("loans", loans);
            var retro = _.map(loans, function(item){
                var data = {};
                data.region = item.location.regions.region;
                return data;
            });
            console.log("retro", retro);
            return retro;
        }
    } // end factory
})();