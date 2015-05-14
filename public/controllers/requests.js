//var baseURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/";
var baseURL = "http://146.118.96.142:5984/tweets_adelaide/_design/adelaideview/_view/";
//http://146.118.96.142/
var origin = "trueorigin?group_level=1";
var feelings ="feelings";
var source = "sourcetweet?group_level=1";
var days = "days_most_tweet?group_level=1";

var test = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/feelings";// ?callback=?"
//feelings
//MAX
var $selector2=document.getElementById('selector2');
var $loading=document.getElementById('loading');
var $resultContainer = document.getElementById('resultContainer');
var sent ="";
theURL = "";
locations = [];
showMap = false;
var adelaide = [138.452454,-35.158091,138.757324,-34.682911]
//138.452454,-35.158091,138.757324,-34.682911
GetView = function(done) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",theURL,true);
  xmlhttp.send();
  $loading.style.display='block';
  xmlhttp.onreadystatechange=function()
  {
    $loading.style.display='none';
    $resultContainer.style.display='block';
    console.log(xmlhttp.status);
    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      var obj = JSON.parse(xmlhttp.responseText);
      if (showMap==true){
        displayMap();
        feelingsMap(obj);
      }
      console.log(obj);
      done();
    }else{
      $resultContainer.innerHTML = "Server: "+xmlhttp.status;
    }
  }


};

//Selectors
function configureDropDownLists(ddl1,ddl2) {
  var feelings = new Array('','Positive', 'Negative', 'Both');
  switch (ddl1.value) {
    case 'Sentiment':
      selector2.style.display='block';
      ddl2.options.length = 0;
      for (i = 0; i < feelings.length; i++) {
        createOption(ddl2, feelings[i], feelings[i]);
      }
      showMap = true;
      theURL = baseURL+feelings;
      break;
    case 'Days':
      $getViewBtn.disabled=false;
      selector2.style.display='none';
      theURL = baseURL +days;
      break;
    case 'Source':
      $getViewBtn.disabled=false;
      selector2.style.display='none';
      theURL = baseURL +source;
      break;
    case 'Origin':
      $getViewBtn.disabled=false;
      selector2.style.display='none';
      theURL = baseURL +origin;
      break;
    //case '':
    //  break;
    default:
      $getViewBtn.disabled=true;
      selector2.style.display='none';
      ddl2.options.length = 0;
      break;
  }

}

function createOption(ddl, text, value) {
  var opt = document.createElement('option');
  opt.value = value;
  opt.text = text;
  ddl.options.add(opt);
}
function enableGetView(ddl){
  sent = ddl.value;
  $getViewBtn.disabled=false;
}

function feelingsMap(obj){
  for (i=0;i<obj['rows'].length;i++){
    var lat = obj['rows'][i]['key'][2][1];
    var long = obj['rows'][i]['key'][2][0];
    var user =  obj['rows'][i]['key'][0];
    var value = obj['rows'][i]['value']
    //If within Adelaide
    if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
      //console.log("sentiment: "+sent+ value);
      if(sent==="Positive" && value>=0){
        locations.push([user,lat,long,value]);
      }else if(sent==="Negative" && value<0){
        locations.push([user,lat,long,value]);
      }else if(sent==="Both"){
        locations.push([user,lat,long,value]);
      }
    }
  }
}
