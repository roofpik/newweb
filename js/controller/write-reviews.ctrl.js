app.controller('writeReviewsCtrl', function($scope) {
    console.log("Write Reviews Works");
    $scope.ratingsObject = {
        iconOn: 'ion-ios-star', //Optional
        iconOff: 'ion-ios-star-outline', //Optional
        iconOnColor: 'rgb(255,87,34)', //Optional
        iconOffColor: 'rgb(221,221,221)', //Optional
        rating: 0, //Optional
        minRating: 0, //Optional
        readOnly: false, //Optional
        callback: function(rating, index) { //Mandatory    
            $scope.ratingsCallback(rating, index);
        }
    };

    $scope.review = {
    	projectName: "",
    	title: "",
    	who: "",
    	location: "",
    	transport: "",
    	useful: "",
    	overall : 0,
    	security : 0,
    	amenities : 0,
    	green : 0,
    	electricity : 0,
    	housemaids : 0,
    	parking : 0
    }

    $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and index is ', index);

        if(index == 1) {
        	$scope.review['overall'] = rating;
        }else if(index == 2) {
        	$scope.review['security'] = rating;
        }else if(index == 3) {
        	$scope.review['amenities'] = rating;
        }else if(index == 4) {
        	$scope.review['green'] = rating;
        }else if(index == 5) {
        	$scope.review['electricity'] = rating;
        }else if(index == 6) {
        	$scope.review['housemaids'] = rating;
        }else if(index == 7) {
        	$scope.review['parking'] = rating;
        }

        console.log($scope.review);
    };

    $scope.submitReview = function(review) {
    	console.log(review);
    }
});