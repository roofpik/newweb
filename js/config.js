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
            url: '/project-list/:from/:type/:id',
            templateUrl: 'templates/project-list.html',
            controller: 'listCtrl'
        });
    $stateProvider
        .state('project-details', {
            url: '/project-details/:id/:name',
            templateUrl: 'templates/project-details.html',
            controller: 'projectDetailsCtrl'
        });
    $stateProvider
        .state('contact-us', {
            url: '/contact-us',
            templateUrl: 'templates/contact-us.html',
            controller: 'contactUsCtrl'
        });
    $stateProvider
        .state('about-us', {
            url: '/about-us',
            templateUrl: 'templates/about-us.html',
            controller: 'aboutUsCtrl'
        });
    $stateProvider
        .state('faq', {
            url: '/faq',
            templateUrl: 'templates/faq.html',
            controller: 'faqCtrl'
        });
    $stateProvider
        .state('career-n-goals', {
            url: '/career-n-goals',
            templateUrl: 'templates/career-n-goals.html',
            controller: 'careerAndGoalsCtrl'
        });

    $stateProvider
        .state('write-reviews', {
            url: '/write-reviews',
            templateUrl: 'templates/write-reviews.html',
            controller: 'writeReviewsCtrl'
        });

        $stateProvider
        .state('email-verify', {
            url: '/email-verify',
            templateUrl: 'templates/email-verify.html',
            controller: 'emailVerifyCtrl'
        });

        $stateProvider
        .state('registration', {
            url: '/registration',
            templateUrl: 'templates/registration.html',
            controller: 'registrationCtrl'
        });

    $urlRouterProvider.otherwise('/home');

}]);
