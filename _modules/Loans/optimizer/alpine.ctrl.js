(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('AlpineController', AlpineController);

        AlpineController.$inject = ['$rootScope', '$scope', '$timeout', 'AppFactory'];

        function AlpineController($rootScope, $scope, $timeout, AppFactory){
            $scope.alpineCorn = true;
            $scope.alpineSoybeans = true;
            $scope.alpineBeansfac = false;
            $scope.alpineSorghum = false;
            $scope.alpineWheat = false;
            $scope.alpineCotton = true;
            $scope.alpineRice = false;
            $scope.alpinePeanuts = false;
            $scope.alpineSugarcane = false;
            $scope.alpineSunflowers = false;

            $scope.sliders = {
                cf: 1,
                ex: 1,
                crpbdgt: 2,
                labor: 57,
                living: 81,
                seed: 34,
                other: 40,
                permits: 75,
                rent: 20,
                hvst: 38,
                equip: 50,
                restate: 35,
                othercol: 0,
                map: 15,
                cropdisc: 30,
                insdisc: 30,
                fsadisc: 30,
                corn: {
                    type: 3,
                    hpe: 0,
                    level: 75,
                    units:3,
                    sco: 50,
                    hail: 0,
                    book: 0,
                    hvst: 0
                },
                soybeans: {
                    type: 3,
                    hpe: 0,
                    level: 75,
                    units:3,
                    sco: 50,
                    hail: 0,
                    book: 0,
                    hvst: 0
                },
                cotton: {
                    type: 3,
                    hpe: 0,
                    level: 75,
                    units:3,
                    sco: 50,
                    hail: 0,
                    book: 0,
                    hvst: 0
                }
            };
        } // end controller
})();