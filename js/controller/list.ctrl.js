app.controller('listCtrl', function($scope, $timeout) {
    var allProjects = [];


    function initializeMap() {
      console.log('called');
        var map = new google.maps.Map(document.getElementById('gl-search-map'), {
            zoom: 15,
            scrollwheel: false,
            styles: [{ "featureType": "administrative.neighborhood", "elementType": "geometry", "stylers": [{ "visibility": "on" }] }, { "featureType": "administrative.land_parcel", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }, { "hue": "#ffa900" }] }],
            center: new google.maps.LatLng(28.4595, 77.0266)
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
                '<img src="'+imgLink+'"/>' +
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

    function initializeProjects(projects) {
        console.log(Object.keys(projects).length);
        var count = 0;
        angular.forEach(projects, function(value, key) {
            count++;
            var data = [];
            data.push(value.projectDetails.address.lat);
            data.push(value.projectDetails.address.lng);
            // data.push('placeholder-standard.jpg');
            data.push(value.images.main.url);
            data.push(value.projectName);
            data.push(value.projectDetails.address.displayLocation);
            data.push('gl-real-estate-icon.svg');
            data.push('gl-real-estate-icon');
            allProjects.push(data);
            if (count == Object.keys(projects).length) {
                initializeMap();
            }
        })
    }

    db.ref('projects/-KPmH9oIem1N1_s4qpCv/residential').once('value', function(snapshot) {
        console.log(snapshot.val());
        $timeout(function() {
            $scope.projects = snapshot.val();
            $scope.numResults = Object.keys($scope.projects).length;
            initializeProjects(snapshot.val());
        }, 100);
    })




    //  var allProjects = [
    //     [
    //       40.678178,             // Latitude
    //       -73.944158,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Lake Heaven',     // Title
    //       'Brooklyn',            // Location
    //       'gl-travel-icon.svg',          // Map Icon
    //       'gl-travel-icon'          // Class
    //     ],
    //     [
    //       40.675431,             // Latitude
    //       -73.891296,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-booking-icon.svg',          // Map Icon
    //       'gl-booking-icon'          // Class
    //     ],
    //     [
    //       40.727486,             // Latitude
    //       -73.917389,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-real-estate-icon.svg',          // Map Icon
    //       'gl-real-estate-icon'         // Class
    //     ],
    //     [
    //       40.748948,             // Latitude
    //       -73.914814,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-fashion-icon.svg',          // Map Icon
    //       'gl-fashion-icon',          // Class
    //     ],
    //     [
    //       40.754799,             // Latitude
    //       -73.906746,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-travel-icon.svg',          // Map Icon
    //       'gl-travel-icon'          // Class
    //     ],
    //     [
    //       40.759871,             // Latitude
    //       -73.911209,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-travel-icon.svg',          // Map Icon
    //       'gl-travel-icon'          // Class
    //     ],
    //     [
    //       40.762211,             // Latitude
    //       -73.918076,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-restaurant-icon.svg',          // Map Icon
    //       'gl-restaurant-icon',          // Class
    //     ],
    //     [
    //       40.700162,             // Latitude
    //       -73.924599,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-booking-icon.svg',          // Map Icon
    //       'gl-booking-icon',          // Class
    //     ],
    //     [
    //       40.691052,             // Latitude
    //       -73.910351,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-travel-icon.svg',          // Map Icon
    //       'gl-travel-icon'          // Class
    //     ],
    //     [
    //       40.705758,             // Latitude
    //       -73.905544,             // Longititude
    //       'placeholder-standard.jpg',        // Main Image
    //       'Cafe Hapus',     // Title
    //       'Brooklyn',            // Location
    //       'gl-booking-icon.svg',          // Map Icon
    //       'gl-booking-icon',          // Class
    //     ]
    // ];

})
