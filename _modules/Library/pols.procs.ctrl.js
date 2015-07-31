(function(){
    'use strict';
    angular
        .module('ARM')
        .controller('PolsProcsController', PolsProcsController);

    PolsProcsController.$inject = ['$scope', '$http', '$state', '$stateParams'];

    function PolsProcsController(
        $scope, $http, $state, $stateParams
    ){
        $http.get("json/docs.json")
            .then(function (res) {
                $scope.documents = _.sortBy(res.data, 'document');
                //console.log($scope.documents);
                $scope.filteredDocs = _.filter($scope.documents, {topic:'policy'});
                $scope.filteredDocs = $scope.documents;
                //console.log($scope.filteredDocs);
            });
    } // end function
})();