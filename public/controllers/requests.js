/*
Team 9 - Adelaide
Jun Jen Chan - 341759
Tou Lee - 656128
David Monroy - 610346
Daniel Teh - 558424
Jaime Martinez - 642231
*/
var host = "146.118.96.142";
//changeHostHere


var originURL = "trueorigin?group_level=1";
var sourceURL = "sourcetweet?group_level=1";
var daysURL = "days_most_tweet?group_level=1";

//var baseURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/";
//var religion = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaide_sentiment/_view/religion?group_level=2";
//var perDayURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaide_sentiment/_view/sentiment_period?group_level=2"

var baseURL = "http://"+host+":5984/tweets_adelaide/_design/adelaideview/_view/";
var religion = "http://"+host+":5984/tweets_adelaide/_design/adelaide_sentiment/_view/religion?group_level=2";
var perDayURL = "http://"+host+":5984/tweets_adelaide/_design/adelaide_sentiment/_view/sentiment_period?group_level=2"
var allTweetsURL = "http://"+host+":5984/tweets_adelaide/_design/ade_view01/_view/tweets_coord"

// Divs
var $selector2=document.getElementById('selector2');
var $loading=document.getElementById('loading');
var $typeNum = document.getElementById('typeNum');
var $topNum = document.getElementById('topnum');
var $getViewBtn = document.getElementById('getView');
var sent ="";

theURL = "";
locations = [];
heatMapData =[];
showMap = false;

drawHeatMap = false;
all_tweets_map = false;
var typeOfGraph="";
var adelaide = [138.213501,-35.395767,139.070435,-34.492975]
//138.452454,-35.158091,138.757324,-34.682911
function GetViewButton(){
  $.get("http://"+host+":5984/tweets_adelaide", function(data){
    var text = JSON.parse(data);
    var count = text['doc_count'];
    console.log(text,count);
    document.getElementById('totalTweets').innerHTML = "# of Tweets: "+ count
  });
  $getViewBtn.disabled=true;
  console.log("here",showMap,all_tweets_map);
  if(showMap==true){
    $('.collapse').collapse("show");
    //console.log("run()?");
    run();
  }else if (all_tweets_map){
    $('.collapse').collapse("show");
    run2();
  }else{
    $('.collapse').collapse("hide");
  //  console.log("get view button working");
    GetView(function(){
      console.log("chart loaded...");
    });
  }
}
GetView = function(done) {
  console.log(showMap);
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",theURL,true);
  xmlhttp.send();
  $loading.style.display='block';
  console.log("GetView()");
  xmlhttp.onreadystatechange=function()
  {

    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      var obj = JSON.parse(xmlhttp.responseText);
      console.log(obj);
      if (showMap==true){
        console.log("here");
        drawHeatMap= document.getElementById('htmap').checked;
      //  document.getElementById('ftlayer').style.display='block';
        feelingsMap(obj);
        console.log(obj);
      }else if (all_tweets_map){
        drawHeatMap= document.getElementById('htmap').checked;
        allTweetsMap(obj);
      }
      drawChart(obj['rows'],typeOfGraph);
      done();
      $loading.style.display='none';
    }
    $getViewBtn.disabled=true;
    document.getElementById('selector1').disabled=true;
    $selector2.disabled=true;
  }
  if(xmlhttp.status==404){
      document.getElementById('error').innerHTML = "Error! "+xmlhttp.status;
  }
};

//Selectors
function configureDropDownLists(ddl1,ddl2) {

  console.log(host);
  var feelings = new Array('','Positive', 'Negative', 'Both');
  $selector2.style.display='none';
  $typeNum.style.display='none';
  showMap = false;

  $getViewBtn.disabled=true;
  document.getElementById('reset').disabled=false;
  switch (ddl1.value) {
    case 'Sentiment':
      $selector2.style.display='block';
      ddl2.options.length = 0;
      for (i = 0; i < feelings.length; i++) {
        createOption(ddl2, feelings[i], feelings[i]);
      }
      showMap = true;

      typeOfGraph="Sentiment";
      theURL = allTweetsURL;
      break;
    case 'Days':
      $getViewBtn.disabled=false;
    //  $typeNum.style.display='block';
      theURL = baseURL +daysURL
      typeOfGraph ="Days";
      break;
    case 'Source':
      $getViewBtn.disabled=false;
      $typeNum.style.display='block';
      theURL = baseURL +sourceURL;
      typeOfGraph = "Source";
      break;
    case 'Origin':
      $getViewBtn.disabled=false;
      $typeNum.style.display='block';
      theURL = baseURL +originURL;
      typeOfGraph = "Origin";
      break;
    case 'PerDay':
        $getViewBtn.disabled=false;
//        $typeNum.style.display='block';
        theURL = perDayURL;
        typeOfGraph = "Sentiment Per Day";
        break;
    case 'Religion':
        $getViewBtn.disabled=false;
  //       $typeNum.style.display='block';
        theURL = religion;
        typeOfGraph = "Religion";
        break;
    //case '':
    //  break;
    case 'AllTweets':
        $getViewBtn.disabled=false;
  //       $typeNum.style.display='block';
        theURL = allTweetsURL;
        all_tweets_map = true;
        typeOfGraph = "All Tweets";
        break;
    default:
      showMap = false;

      $getViewBtn.disabled=true;
      $typeNum.style.display='none';
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

    $map.style.display='block';
    $map.innerHTML= sent + " map!";
    console.log("showing maP!!");

  var totalPos = 0;
  var totalNeg = 0;
  fTable = [["Sentiment","Total"]];
  for (i=0;i<obj['rows'].length;i++){
    var lat = obj['rows'][i]['key'][2][1];
    var long = obj['rows'][i]['key'][2][0];
    var user =  obj['rows'][i]['key'][0];
    var value = obj['rows'][i]['value']
    var text = obj['rows'][i]['key'][1];
    //If within Adelaide
    if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
      var latLngObj =  new google.maps.LatLng(lat, long);
      if(sent==="Positive" && value>0){
        totalPos+=1;
        locations.push([user,lat,long,value,text]);
        heatMapData.push(latLngObj);
      }else if(sent==="Negative" && value<0){
        totalNeg+=1;
        locations.push([user,lat,long,value,text]);
        heatMapData.push(latLngObj);
      }else if(sent==="Both"){
        if(value>0){
          totalPos+=1;
        }else{
          totalNeg+=1;
        }
        locations.push([user,lat,long,value,text]);
        heatMapData.push(latLngObj);
      }

    }
  }
  fTable.push(["Positive",totalPos]);
  fTable.push(["Negative",totalNeg]);
}

function allTweetsMap(obj){

    $map.style.display='block';
    $map.innerHTML= sent + " map!";
    console.log("showing maP!!");

  var totalPos = 0;
  var totalNeg = 0;
  var totalNeutral = 0;
  fTable = [["Sentiment","Total"]];
  for (i=0;i<obj['rows'].length;i++){
    var lat = obj['rows'][i]['key'][2][1];
    var long = obj['rows'][i]['key'][2][0];
    var user =  obj['rows'][i]['key'][0];
    var value = obj['rows'][i]['value'];
    var text = obj['rows'][i]['key'][1];
    //console.log(user,lat,long,value);
    //If within Adelaide
    if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
      var latLngObj =  new google.maps.LatLng(lat, long);
      locations.push([user,lat,long,value,text]);
      heatMapData.push(latLngObj);
     if(value>0){
        totalPos+=1;
      //  locations.push([user,lat,long,value]);
      //  heatMapData.push(latLngObj);
    }else if(value<0){
        totalNeg+=1;
    }else{
      totalNeutral+=1;
    }

    }
  }
  fTable.push(["Positive",totalPos]);
  fTable.push(["Negative",totalNeg]);
  fTable.push(["Neutral",totalNeutral]);
}
