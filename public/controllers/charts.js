google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);



function drawChart(obj,type) {
  
  console.log("drawing chart");
  var test =[
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ];
  var table =[]
  if(type=="Sentiment"){
    table = fTable;
  }else if(table === []){
    table = test;
  }else{
    table = processJsonObj(obj,type);
  }
  var data = google.visualization.arrayToDataTable(table);

  var options = {
    title: table[0][0],
    width: "100%",
    height: 480,
    is3D: true,
    animation:{
       duration: 2000,
       easing: 'inAndOut',
       startup: true
     }
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

/*
function sortDays(days) {
  var daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  var today = new Date().getDay();
  for (var i=0;i<today;i++) daysOfWeek.push(daysOfWeek.shift());
  return daysOfWeek.filter(function(d) { return days.indexOf(d) >= 0; });
}*/
