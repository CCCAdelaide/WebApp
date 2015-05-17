var baseURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/";
//var baseURL = "http://146.118.96.142:5984/tweets_adelaide/_design/adelaideview/_view/";
//http://146.118.96.142/
var originURL = "trueorigin?group_level=1";
var feelingsURL ="feelings";
var sourceURL = "sourcetweet?group_level=1";
var daysURL = "days_most_tweet?group_level=1";
var perDayURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaide_sentiment/_view/sentiment_period?group_level=2"
var test = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/feelings";// ?callback=?"
//feelings
//MAXgroup
var $selector2=document.getElementById('selector2');
var $loading=document.getElementById('loading');
var $typeNum = document.getElementById('typeNum');
var $topNum = document.getElementById('topnum');
var sent ="";

theURL = "";
locations = [];
showMap = false;
showChart = false;
var typeOfGraph="";
var adelaide = [138.452454,-35.158091,138.757324,-34.682911]
//138.452454,-35.158091,138.757324,-34.682911
function GetViewButton(){
  $getViewBtn.disabled=true;
  if(showMap==true){
    $('.collapse').collapse("show");
    //console.log("run()?");
    run();
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

  xmlhttp.onreadystatechange=function()
  {

    if (xmlhttp.readyState==4 && xmlhttp.status==200){
      var obj = JSON.parse(xmlhttp.responseText);
      console.log(obj);
      if (showMap==true){
        feelingsMap(obj);
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
  var feelings = new Array('','Positive', 'Negative', 'Both');
  $selector2.style.display='none';
  $typeNum.style.display='none';
  showMap = false;
  showChart = true;
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
      showChart = false;
      typeOfGraph="Sentiment";
      theURL = baseURL+feelingsURL;
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
        $typeNum.style.display='block';
        theURL = perDayURL;
        typeOfGraph = "Sentiment Per Day";
        break;
    //case '':
    //  break;
    default:
      showMap = false;
      showChart= false;
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
    //If within Adelaide
    if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
      if(sent==="Positive" && value>=0){
        totalPos+=1;
        locations.push([user,lat,long,value]);
      }else if(sent==="Negative" && value<0){
        totalNeg+=1;
        locations.push([user,lat,long,value]);
      }else if(sent==="Both"){
        if(value>=0){
          totalPos+=1;
        }else{
          totalNeg+=1;
        }
        locations.push([user,lat,long,value]);
      }
    }
  }
  fTable.push(["Positive",totalPos]);
  fTable.push(["Negative",totalNeg]);
}
