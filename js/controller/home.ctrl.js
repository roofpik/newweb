app.controller('homeCtrl', function($scope, $state, $timeout, $rootScope) {

    $scope.takeToProjectList = function(param) {
        console.log(param);
        $state.go('project-list', { from: param });
    }
    $timeout(function() {
        $rootScope.loading = false;
        var $portfolioContainer = $('.gl-listing-categories-wrapper');

        $portfolioContainer.imagesLoaded(function() {
            $portfolioContainer.isotope({
                itemSelector: '.gl-listing-cat-item',
                percentPosition: true,
                masonry: {
                    // use outer width of grid-sizer for columnWidth
                    columnWidth: 1
                }
            });
        });
    }, 1000);

    $scope.topRated = {};

    db.ref('topRated').limitToFirst(3).once('value', function(snapshot) {
        //	$rootScope.loading = false;
        //	console.log(snapshot.val());
        $timeout(function() {
            $scope.topRated = snapshot.val();
        }, 1000);
    })


    $scope.gotoWriteReviews = function() {
        $state.go('write-reviews');
    }

    $scope.takeToProjectDetails = function(project) {
        $state.go('project-details', { id: project.projectId, name: project.projectName });
    }

})
