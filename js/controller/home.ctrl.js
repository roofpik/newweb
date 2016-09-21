


app.controller('homeCtrl', function($scope, $state, $timeout, $rootScope){

	$scope.takeToProjectList = function(param){
		console.log(param);
		$state.go('project-list', {from: param});
	}
	$scope.topRated = {};

	db.ref('topRated').limitToFirst(3).once('value', function(snapshot){
		console.log(snapshot.val());
		$timeout(function(){
			$scope.topRated = snapshot.val();
		}, 1000);
	})


	$scope.gotoWriteReviews = function(){
		$state.go('write-reviews');
	}

	$scope.takeToProjectDetails = function(project){
		$state.go('project-details', {id:project.projectId, name: project.projectName});
	}

})