app.controller('headerCtrl', function($scope, $timeout, $rootScope) {
    $scope.login = {};
    //  console.log($rootScope.loginStatus);


    $scope.$watch('loginStatus', function() {
        console.log($rootScope.loginStatus);
        $scope.login.status = $rootScope.loginStatus;

    });

    $scope.$watch('loading', function() {
        if ($rootScope.loading) {
            $('#gl-circle-loader-wrapper').show();
            $('.loading-hide').hide();
        } else {
            $('.loading-hide').show();
            $('#gl-circle-loader-wrapper').fadeOut(1000);
        }

    });


    $scope.logout = function() {
        $rootScope.loginStatus = false;

        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            //    $scope.login.status = false;
            //   $rootScope.loginStatus = false;
        }, function(error) {
            //  $rootScope.loginStatus = false;
            // An error happened.
        });
    }
});
