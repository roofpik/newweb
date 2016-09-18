app.controller('searchCtrl', function($scope, $http, $timeout) {
    $scope.search = {};
    $scope.search.process = false;

    var temquery;
    var t;

    $scope.searchfn = function() {


        if (!$scope.search.process) {

            temquery = $scope.search.query;
            $scope.search.process = true;
            $timeout.cancel(t);
            $http({
                    url: 'http://139.162.3.205/api/searchProject',
                    method: "POST",
                    params: {
                        query: $scope.search.query
                    }
                })
                .success(function(response) {

                    $scope.projects = response;
                    $scope.search.process = false;
                    if (temquery != $scope.search.query) {
                        $scope.searchfn();
                    }
                });

            t = $timeout(function() {

                if ($scope.search.process) {
                    $scope.search.process = false;

                    $scope.searchfn();


                }

            }, 5000)
        }

    };

});
