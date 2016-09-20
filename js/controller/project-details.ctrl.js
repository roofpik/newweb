app.controller('projectDetailsCtrl', function($scope, $timeout, $stateParams){
	console.log('project details');
	var rates = [1,2,3,4,5];
	$scope.projectName = $stateParams.name;
	$scope.projectId = $stateParams.id;
	$scope.reviews = {};
	db.ref('reviews/-KPmH9oIem1N1_s4qpCv/residential/'+$scope.projectId).once('value', function(snapshot){
		console.log(snapshot.val());
		$timeout(function(){
			$scope.reviews = snapshot.val();
			angular.forEach($scope.reviews, function(value, key){
				value.moreOrLess = 'Show More';
			})
		}, 100);
	}).then(function(){
		db.ref('ratingReview/-KPmH9oIem1N1_s4qpCv/residential/'+$scope.projectId).once('value', function(snapshot){
			$timeout(function(){
				console.log(snapshot.val());
				$scope.allRatings = snapshot.val();
			}, 50);
		})
	})

    $scope.starrating=function(rating) {
      rating = Math.round(rating);
      return new Array(rating);   //ng-repeat will run as many times as size of array
  	}

  	$scope.showMore = function(review){
  		review.showRest = !review.showRest;
  		if(review.moreOrLess == 'Show More'){
  			review.moreOrLess = 'Show Less';
  		} else {
  			review.moreOrLess = "Show More";
  		}
  	}
})