app.controller('headerCtrl', function($scope, $timeout, $rootScope){
	$scope.login = {};
	console.log($rootScope.loginStatus);


	 $scope.$watch('loginStatus', function() {

	 	console.log($rootScope.loginStatus);
		$scope.login.status = $rootScope.loginStatus;
	

    });
});