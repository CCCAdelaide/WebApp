var $getViewBtn = document.getElementById('getView');
//var $map = document.getElementById('map');

function displayMap(){
  //document.getElementById('map-canvas').style.display = "block";
  //initialize();
  console.log("showing maP!!")
}

// The following example creates complex markers to indicate beaches near
// Sydney, NSW, Australia. Note that the anchor is set to
// (0,32) to correspond to the base of the flagpole.

function initialize() {
  console.log("init_map")
  var mapOptions = {
    zoom: 5,
    center: new google.maps.LatLng(-34.92, 138.60)
  }
  var map = new google.maps.Map(document.getElementById('map-canvas'),
                                mapOptions);
  console.log("get map")
  google.maps.event.trigger(map, 'resize');
  setMarkers(map, beaches);
}

/**
 * Data for the markers consisting of a name, a LatLng and a zIndex for
 * the order in which these markers should display on top of each
 * other.
 */
var beaches = [
  [ -34.9290, 138.6010],
  [-34.9453, 138.5038],
];

function setMarkers(map, locations) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  var image = {
    url: 'images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels tall.
    size: new google.maps.Size(20, 32),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  // Shapes define the clickable region of the icon.
  // The type defines an HTML &lt;area&gt; element 'poly' which
  // traces out a polygon as a series of X,Y points. The final
  // coordinate closes the poly by connecting to the first
  // coordinate.
  var shape = {
      coords: [1, 1, 1, 20, 18, 20, 18 , 1],
      type: 'poly'
  };
  var markerBounds = new google.maps.LatLngBounds();
  for (var i = 0; i < locations.length; i++) {
    var tweet = locations[i];
    var myLatLng = new google.maps.LatLng(tweet[0], tweet[1]);
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: image,
        shape: shape,
    });

    markerBounds.extend(myLatLng);
  }
  //var markerBounds = new google.maps.LatLngBounds();
  map.fitBounds(markerBounds);
}
google.maps.event.addDomListener($getViewBtn, 'click', initialize);
//google.maps.event.addDomListener(window, 'load', initialize);
