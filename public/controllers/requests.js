var baseURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/";
var origin = "trueorigin?group_level=1?callback=?"
var feelings ="feelings"
var test = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/feelings"// ?callback=?"
//feelings
//MAX Locs
locations = [];
var adelaide = [138.452454,-35.158091,138.757324,-34.682911]
//138.452454,-35.158091,138.757324,-34.682911
JSONTest = function(done) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",test,true);
    xmlhttp.send();

    xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var obj = JSON.parse(xmlhttp.responseText);
      //i
      for (i=0;i<obj['rows'].length;i++){
        var lat = obj['rows'][i]['key'][2][1];
        var long = obj['rows'][i]['key'][2][0];
        var user =  obj['rows'][i]['key'][0];
        if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
          locations.push([user,lat,long]);
        }
      }
      done();
    //  console.log(obj['rows'].length);
    //  console.log(locations);
    }
  }


};
