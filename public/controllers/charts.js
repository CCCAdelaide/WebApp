google.load("visualization", "1", {packages:["corechart","bar"]});
//google.load("visualization", "1.1", {packages:["bar"]});

function drawChart(obj,type) {

  console.log("drawing chart");
  var table =[]
  if(type=="Sentiment"){
    table = fTable;
  }else if(type == "Sentiment Per Day"){
    console.log("here?");
    perDayGraph(obj);
    return;
  }else{
    table = processJsonObj(obj,type);
  }
  table.sort(function(a, b){return b[1]-a[1]});
  var top = $topNum.value>=1 ? $topNum.value : table.length;
  table = table.slice(0,top);
  //chart
  var data = google.visualization.arrayToDataTable(table);

  var options = {
    title: table[0][0],
    width: "100%",
    height: 480,
    is3D: true
  };

  var chart = new google.visualization.PieChart(document.getElementById('chart'));
  chart.draw(data, options);

  console.log("pie chart done!")
}

function processJsonObj(obj,type){

  result = [];
  result.push([type,"Total"]);
  if(type==='Days'){
    for (i=0;i<obj.length;i++){
      var opt = obj[i]['key'][0];
      var count = obj[i]['value'];
      result.push([opt,count]);
    }
  }else{
    for (i=0;i<obj.length;i++){
      var opt = obj[i]['key'];
      var count = obj[i]['value'];
      result.push([opt,count]);
    }
  }
  return result;
}
function perDayGraph(obj){
  res2 = new Array(
    ["Day","Positive","Negative"],
    ["Sunday",0,0],
    ["Monday",0,0],
    ["Tuesday",0,0],
    ["Wednesday",0,0],
    ["Thursday",0,0],
    ["Friday",0,0],
    ["Saturday",0,0]
  );

  for (i=0;i<obj.length;i++){
    var sent = obj[i]['key'][0];
    var day = obj[i]['key'][1];
    var count = obj[i]['value'];
    for(j=1;j<res2.length;j++){
      //console.log(sent,count,day);
      if(res2[j][0]==day&&sent==='positive'){
        res2[j][1]= count;
        break;
      }else if(res2[j][0]==day&&sent==='negative'){
        res2[j][2]= count;
        break;
      }
    }

  }
  console.log("res2: "+res2);
  var data = new google.visualization.arrayToDataTable(res2);
  var options = {
         width: 900,
         height: 400,
         chart: {
           title: 'Sentiment per day',
           subtitle: 'Positive vs Negative by day of the week'
         }
       };
       var chart = new google.charts.Bar(document.getElementById('chart2'));
       chart.draw(data, options);
  //return res;
}
/*
function sortDays(days) {
  var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var today = new Date().getDay();
  for (var i=0;i<today;i++) daysOfWeek.push(daysOfWeek.shift());
  return daysOfWeek.filter(function(d) { return days.indexOf(d) >= 0; });
}*/
