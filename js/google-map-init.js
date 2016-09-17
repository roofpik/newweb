jQuery(document).ready(function() {
    "use strict";


function b() {
    var a = {
            zoom: 13,
            scrollwheel: false,
            center: new google.maps.LatLng(40.67, -73.94),
            styles: [{"featureType":"administrative.neighborhood","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"administrative.land_parcel","elementType":"geometry.fill","stylers":[{"visibility":"simplified"},{"hue":"#ffa900"}]}]
        },
        b = document.getElementById("gl-map-small"),
        c = new google.maps.Map(b, a);
        new google.maps.Marker({
            position: new google.maps.LatLng(40.67, -73.94),
            map: c,
            icon: 'http://glimpsehtml.s3.amazonaws.com/business/images/booking-map-marker.png',
            title: "Snazzy!"
        })
}
google.maps.event.addDomListener(window, "load", b);

});
