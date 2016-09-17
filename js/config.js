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
            url: '/project-list',
            templateUrl: 'templates/project-list.html',
            controller: 'listCtrl'
        });

    $urlRouterProvider.otherwise('/project-list');

}]);
