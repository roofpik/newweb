app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // access control routes
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'templates/home.html',
            controller: 'homeCtrl'
        });

    $stateProvider
        .state('project-list', {
            url: '/project-list/:from',
            templateUrl: 'templates/project-list.html',
            controller: 'listCtrl'
        });

    $stateProvider
        .state('write-reviews', {
            url: '/write-reviews',
            templateUrl: 'templates/write-reviews.html',
            controller: 'writeReviewsCtrl'
        });

    $urlRouterProvider.otherwise('/project-list');

}]);
