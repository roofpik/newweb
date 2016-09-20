app.controller('listCtrl', function($scope, $timeout, $stateParams, $state) {
    console.log($stateParams.from);
    var center = {};

    var types= ['family', 'justMarried', 'oldAgeFriendly', 'kids', 'bachelors'];

    if($stateParams.from == 'topRated'){
        db.ref('topRated').once('value', function(dataSnapshot){
            $timeout(function(){
                console.log(dataSnapshot.val());
                console.log(Object.keys(dataSnapshot.val()).length);
                $scope.numResults = Object.keys(dataSnapshot.val()).length;
                $scope.projects = dataSnapshot.val();
                initializeProjects(dataSnapshot.val());
            }, 100);
        });
    } else {
        for(var i = 0; i < 5; i++){
            if($stateParams.from == types[i]){
                console.log($stateParams.from+'List');
                db.ref($stateParams.from+'List').once('value', function(dataSnapshot){
                    $timeout(function(){
                        console.log(dataSnapshot.val());
                        console.log(Object.keys(dataSnapshot.val()).length);
                        $scope.numResults = Object.keys(dataSnapshot.val()).length;
                        $scope.projects = dataSnapshot.val();
                        initializeProjects(dataSnapshot.val());
                        // $timeout(function() {
                        //     var h = document.getElementById('flux').clientHeight;
                        //     console.log(h);
                        //     $('#gl-result-section').css('height', h);
                        //     $('#gl-result-section').on('scroll', function() {
                        //         console.log($(this)[0].scrollHeight, $(this).scrollTop(), $(this).innerHeight());
                        //         if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
                        //             alert('end reached');
                        //         }
                        //     })

                        // }, 2000);
                    }, 100);
                })
            }
        }
    }

    function initializeProjects(projects) {
        console.log(Object.keys(projects).length);
        var count = 0;
        var latitude = 0;
        var longitude = 0;
        angular.forEach(projects, function(value, key) {
            count++;
            var data = [];
            latitude += value.lat;
            longitude += value.lng;
            data.push(value.lat);
            data.push(value.lng);
            // data.push('placeholder-standard.jpg');
            data.push(value.imgUrl);
            data.push(value.projectName);
            data.push(value.displayLocation);
            data.push('gl-real-estate-icon.svg');
            data.push('gl-real-estate-icon');
            allProjects.push(data);
            if (count == Object.keys(projects).length) {
                center.lat = latitude/count;
                center.lng= longitude/count;
                initializeMap();
            }
        })
    }

    var allProjects = [];

    function initializeMap() {
        console.log('called');
        var map = new google.maps.Map(document.getElementById('gl-search-map'), {
            zoom: 15,
            scrollwheel: false,
            styles: [{ "featureType": "administrative.neighborhood", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }, { "hue": "#ffa900" }] }],
            center: new google.maps.LatLng(center.lat, center.lng)
        });


        var marker, i;
        var markers = new Array();
        var infowindow = new google.maps.InfoWindow();
        console.log(allProjects);
        for (i = 0; i < allProjects.length; i++) {

            var lat = allProjects[i][0],
                lng = allProjects[i][1],
                imgLink = allProjects[i][2],
                jobTitle = allProjects[i][3],
                jobLoc = allProjects[i][4],
                markerIcon =
                '<div class="gl-marker-icon ' + allProjects[i][6] + '">' +
                '<div class="gl-map-marker-img">' +
                '<img src="images/' + allProjects[i][5] + '"/>' +
                '</div>' +
                '</div>';

            marker = new RichMarker({
                position: new google.maps.LatLng(lat, lng),
                map: map,
                icon: allProjects[i][5],
                flat: true,
                anchor: RichMarkerPosition.MIDDLE,
                content: markerIcon
            });
            markers.push(marker);

            infoBubble = new InfoBubble({
                maxWidth: 350,
                shadowStyle: 0,
                padding: 0,
                backgroundColor: '#ffffff',
                borderRadius: 0,
                arrowSize: 8,
                borderWidth: 0,
                disableAutoPan: true,
                hideCloseButton: true,
                arrowPosition: 15,
                backgroundClassName: 'phoney',
                arrowStyle: 0
            });

            marker.html =
                '<div class="gl-map-marker-wrapper gl-business-listing-map">' +
                '<div class="gl-map-marker-img">' +
                '<img src="' + imgLink + '"/>' +
                '</div>' +
                '<div class="gl-map-marker-info-details">' +
                '<h3 class="gl-heading">' + jobTitle + '</h3>' +
                '<p class="gl-location">' + jobLoc + '</p>' +
                '</div>' +
                '</div>';

            infoBubble.close(map, marker);

            google.maps.event.addListener(marker, 'click', function() {
                if (!infoBubble.isOpen()) {
                    infoBubble.setContent(this.html);
                    infoBubble.open(map, this);
                } else {
                    infoBubble.close(map, marker);
                    infoBubble.setContent(this.html);
                    infoBubble.open(map, this);
                }
                google.maps.event.addListener(map, 'click', function() {
                    infoBubble.close(map, marker);
                });
            });
        }

        function AutoCenter() {
            var bounds = new google.maps.LatLngBounds();
            $.each(markers, function(index, marker) {
                bounds.extend(marker.position);
            });
            map.fitBounds(bounds);
        }
        AutoCenter();

        $(".gm-style-iw").next("div").hide();
    }

    $scope.selectProject = function(pro){
        console.log(pro);
        $state.go('project-details', {id: pro.projectId, name: pro.projectName});
    }

    // db.ref('projects/-KPmH9oIem1N1_s4qpCv/residential').once('value', function(snapshot) {
    //     console.log(snapshot.val());
    //     $timeout(function() {
    //         $scope.projects = snapshot.val();
    //         $scope.numResults = Object.keys($scope.projects).length;
    //         initializeProjects(snapshot.val());
    //         $timeout(function() {

    //             //  var h = $('#gl-result-section').outerHeight();
    //             var h = document.getElementById('flux').clientHeight;
    //             console.log(h);
    //             $('#gl-result-section').css('height', h);
    //             $('#gl-result-section').on('scroll', function() {
    //                 console.log($(this)[0].scrollHeight, $(this).scrollTop(), $(this).innerHeight());
    //                 if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
    //                     alert('end reached');
    //                 }
    //             })

    //         }, 2000)
    //     }, 100);
    // })

})
