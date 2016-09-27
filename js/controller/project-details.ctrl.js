app.controller('projectDetailsCtrl', function($scope, $timeout, $stateParams){
	// console.log('project details');
	var rates = [1,2,3,4,5];
	$scope.projectName = $stateParams.name;
	$scope.projectId = $stateParams.id;
	$scope.reviews = {};
	$scope.features = [];
	$scope.bhkAvailable = '';
	$scope.dataLoaded = false;
	db.ref('projects/-KPmH9oIem1N1_s4qpCv/residential/'+$scope.projectId).once('value', function(snapshot){
		$timeout(function(){
			$scope.project = snapshot.val();
			console.log($scope.project);
			angular.forEach($scope.project.standoutFeatures, function(value, key){
				$scope.features.push(key);
			})
			console.log($scope.project.bhk);
			angular.forEach($scope.project.bhk, function(value, key){
				if(value){

					$scope.bhkAvailable = $scope.bhkAvailable+ key+', ';
				}
			})
			$scope.bhkAvailable = $scope.bhkAvailable.substring(0,$scope.bhkAvailable.length - 2)+' BHK available';
			console.log($scope.bhkAvailable);
		},100);
	}).then(function(){
		db.ref('reviews/-KPmH9oIem1N1_s4qpCv/residential/'+$scope.projectId).once('value', function(snapshot){
			// console.log(snapshot.val());
			$timeout(function(){
				$scope.reviews = snapshot.val();
				angular.forEach($scope.reviews, function(value, key){
					value.moreOrLess = 'Show More';
				})
			}, 100);
		}).then(function(){
			db.ref('ratingReview/-KPmH9oIem1N1_s4qpCv/residential/'+$scope.projectId).once('value', function(snapshot){
				$timeout(function(){
					// console.log(snapshot.val());
					$scope.allRatings = snapshot.val();
					$("#excellentStar").css("width", ($scope.allRatings.fiveStar/$scope.allRatings.overallRatingNum)*100+'%');
					$("#veryGoodStar").css("width", ($scope.allRatings.fourStar/$scope.allRatings.overallRatingNum)*100+'%');
					$("#goodStar").css("width", ($scope.allRatings.threeStar/$scope.allRatings.overallRatingNum)*100+'%');
					$("#averageStar").css("width", ($scope.allRatings.twoStar/$scope.allRatings.overallRatingNum)*100+'%');
					$("#badStar").css("width", ($scope.allRatings.oneStar/$scope.allRatings.overallRatingNum)*100+'%');
					$scope.dataLoaded = true;
				}, 50);
			})
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