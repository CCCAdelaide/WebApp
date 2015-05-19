/*
Team 9 - Adelaide
Jun Jen Chan - 341759
Tou Lee - 656128
David Monroy - 610346
Daniel Teh - 558424
Jaime Martinez - 642231
*/


var $map = document.getElementById('map');

function run(){
  GetView(initialize);
}
function initialize() {
  var mapOptions = {
    zoom: 8,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    center: new google.maps.LatLng(-34.92, 138.60)
  }
  map = new google.maps.Map(document.getElementById('map-canvas'),mapOptions);
  console.log(drawHeatMap);
  if(!drawHeatMap){
    setMarkers(map, locations);
    heatmap = new google.maps.visualization.HeatmapLayer({
      data: heatMapData
    });
    heatmap.setMap(map);
  }else{
  /*  var heatmap = new google.maps.visualization.HeatmapLayer({
    data: heatMapData
    });
    heatmap.setMap(map);*/

    var layer = new google.maps.FusionTablesLayer({
      query: {
        select: 'col0',
        //from: '1xWyeuAhIFK_aED1ikkQEGmR8mINSCJO9Vq-BPQ'
        from: '1LXmoPasly1z3jqQHYdzrc4IKYkPIlSDmyZIW3OR'
      }/*,
      heatmap: {
        data: heatMapData,
        enabled: true
      }*/
    });
    layer.setMap(map);
  }
}

$('#map-canvas').on('shown', function () {
  google.maps.event.trigger(map, 'resize');
});
//google.maps.event.addListener(map, 'shown','resize');
function setMarkers(map, locs) {
  // Add markers to the map

  // Marker sizes are expressed as a Size of X,Y
  // where the origin of the image (0,0) is located
  // in the top left of the image.

  // Origins, anchor positions and coordinates of the marker
  // increase in the X direction to the right and in
  // the Y direction down.
  console.log("setting markers")
  var positiveImg = {
    url: 'images/user-online.png',
    // This marker is 16 pixels wide by 16 pixels tall.
    size: new google.maps.Size(16, 16),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 16)
  };
  var negativeImg = {
    url: 'images/user-offline.png',
    // This marker is 16 pixels wide by 16 pixels tall.
    size: new google.maps.Size(16, 16),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 16)
  };
  var neutralImg = {
    url: 'images/white_dot.png',
    // This marker is 16 pixels wide by 16 pixels tall.
    size: new google.maps.Size(15, 15),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 15)
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
  for (var i = 0; i < locs.length; i++) {
    var tweet = locs[i];

    var myLatLng = new google.maps.LatLng(tweet[1], tweet[2]);
    var img;

    if(tweet[3]>0){
      img = positiveImg;
    }else if(tweet[3]<0){
      img = negativeImg;
    }else{
      img = neutralImg;
    }
    var marker = new google.maps.Marker({
        position: myLatLng,
        map: map,
        icon: img,
        title: "@"+tweet[0],
        shape: shape,
    });
    markerBounds.extend(myLatLng);
  }

  //var markerBounds = new google.maps.LatLngBounds();
  map.fitBounds(markerBounds);
}
//listeners
google.maps.event.addListener(map, 'zoom_changed', function () {
         heatmap.setOptions({radius:getNewRadius()});
     });
