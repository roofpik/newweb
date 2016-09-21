app.controller('writeReviewsCtrl', function($scope, $rootScope, $q, $log, $http) {
    // var self = this;
    // var results;
    // self.simulateQuery = false;
    // self.isDisabled = false;
    $scope.ctrl = {};
    // var t = loadAll();
    // t.then(function(data) {
    //     console.log(data)
    //     $scope.ctrl.states = test(data);
    //     console.log($scope.ctrl.states);
    // });


    $scope.ctrl.querySearch = function(query) {
        //return $http.get("https://api.github.com/search/users", {params: {q: query}})
        // return $http.get("https://api.github.com/search/users", {params: {q: query}})
        //     .then(function(response){
        //         console.log(response.data.items)
        //       return response.data.items;
        //     })
        return $http({
                url: 'http://139.162.3.205/api/searchProject',
                method: "POST",
                params: {
                    query: query
                }
            })
            .success(function(response) {
                // return response;
                var obj = [];
                var i = 0;
                for (var key in response) {
                    // skip loop if the property is from prototype
                    obj[i] = response[key].name;
                    i++;
                }
                console.log(obj);
                $scope.ctrl.test = obj;
                return obj;
                // var t = test(response);
                // console.log(t);
                // return t;

            })
    }

    function test(data) {
        var obj = [];
        var i = 0;
        for (var key in data) {
            // skip loop if the property is from prototype
            obj[i] = data[key];
            i++;
        }

        return obj;
    }
    // $scope.ctrl.selectedItemChange = selectedItemChange;
    // $scope.ctrl.searchTextChange = searchTextChange;
    // $scope.ctrl.newState = newState;


    // function searchTextChange(text) {
    //     $log.info('Text changed to ' + text);
    // }

    // function selectedItemChange(item) {
    //     $log.info('Item changed to ' + JSON.stringify(item));
    // }

    // function newState(state) {
    //     alert("Sorry! You'll need to create a Constitution for " + state + " first!");
    // }


    // $scope.ctrl.querySearch = querySearch;


    // function querySearch(query) {

    //     var results = query ? $scope.ctrl.states.filter(createFilterFor(query)) : $scope.ctrl.states,
    //         deferred;

    //     if ($scope.ctrl.simulateQuery) {
    //         deferred = $q.defer();
    //         $timeout(function() { deferred.resolve(results); }, Math.random() * 1000, false);
    //         return deferred.promise;
    //     } else {

    //         return results;
    //     }
    // }


    // function loadAll() {
    //     q = $q.defer();
    //     $scope.ctrl.query = '';
    //     $http({
    //             url: 'http://139.162.3.205/api/searchProject',
    //             method: "POST",
    //             params: {
    //                 query: $scope.ctrl.query
    //             }
    //         })
    //         .success(function(response) {
    //             q.resolve(response);
    //         });

    //     return q.promise;

    // }


    // function createFilterFor(query) {
    //     var lowercaseQuery = angular.lowercase(query);

    //     return function filterFn(state) {
    //         return (state.name.indexOf(lowercaseQuery) === 0);
    //     };

    // }

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
        overall: 0,
        security: 0,
        amenities: 0,
        green: 0,
        electricity: 0,
        housemaids: 0,
        parking: 0
    }

    $scope.ratingsCallback = function(rating, index) {
        console.log('Selected rating is : ', rating, ' and index is ', index);

        if (index == 1) {
            $scope.review['overall'] = rating;
        } else if (index == 2) {
            $scope.review['security'] = rating;
        } else if (index == 3) {
            $scope.review['amenities'] = rating;
        } else if (index == 4) {
            $scope.review['green'] = rating;
        } else if (index == 5) {
            $scope.review['electricity'] = rating;
        } else if (index == 6) {
            $scope.review['housemaids'] = rating;
        } else if (index == 7) {
            $scope.review['parking'] = rating;
        }

        console.log($scope.review);
    };

    $scope.submitReview = function(review) {
        console.log(review);
    }

    $scope.openLogin = function() {
        $('#gl-side-menu-btn').click();
    }
});
