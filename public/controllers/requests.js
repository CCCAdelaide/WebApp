var baseURL = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/";
var origin = "trueorigin?group_level=1?callback=?"
var feelings ="feelings"
var test = "http://146.118.97.29:5984/tweets_adelaide/_design/adelaideview/_view/feelings"// ?callback=?"
//feelings
//MAX
var $selector2=document.getElementById('selector2');
var $loading=document.getElementById('loading');
var sent ="";
locations = [];
var adelaide = [138.452454,-35.158091,138.757324,-34.682911]
//138.452454,-35.158091,138.757324,-34.682911
JSONTest = function(done) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",test,true);
  xmlhttp.send();
  $loading.style.display='block';
  xmlhttp.onreadystatechange=function()
  {
    $loading.style.display='none';
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
      var obj = JSON.parse(xmlhttp.responseText);
      //i
      for (i=0;i<obj['rows'].length;i++){
        var lat = obj['rows'][i]['key'][2][1];
        var long = obj['rows'][i]['key'][2][0];
        var user =  obj['rows'][i]['key'][0];
        var value = obj['rows'][i]['value']
        if(lat<=adelaide[3]&&lat>=adelaide[1] && long>=adelaide[0] &&long<=adelaide[2]){
          if((sent==="Positive" || sent ==="Both")&&value>0){
            locations.push([user,lat,long,value]);
          }else if((sent==="Negative" || sent ==="Both")&&value<0){

          }
        }
      }
      done();
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

      break;
    case '':
      $getViewBtn.disabled=true;
      selector2.style.display='none';
      break;
    default:
      $getViewBtn.disabled=false;
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
