var app = angular.module('roofWebsite', ['ngMaterial', 'ui.router']);
var db = firebase.database();

app.config(['$mdThemingProvider', '$mdIconProvider', function($mdThemingProvider, $mdIconProvider) {

    var customBlueMap = $mdThemingProvider.extendPalette('teal', {
        'contrastDefaultColor': 'light',
        'contrastDarkColors': ['50'],
        '50': 'ffffff'
    });
    $mdThemingProvider.definePalette('customBlue', customBlueMap);
    $mdThemingProvider.theme('default')
        .primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        })
        .accentPalette('pink');
    $mdThemingProvider.theme('input', 'default')
        .primaryPalette('grey')
}]);
