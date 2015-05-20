/*
Team 9 - Adelaide
Jun Jen Chan - 341759
Tou Lee - 656128
David Monroy - 610346
Daniel Teh - 558424
Jaime Martinez - 642231
*/

google.load("visualization", "1", {packages:["corechart","bar"]});


function drawChart(obj,type) {

  console.log("drawing chart");
  console.log(obj)
  var table =[]
  if(type=="Sentiment" || type == "All Tweets"){
    table = fTable;
  }else if(type == "Sentiment Per Day"){
    console.log("here?");
    perDayGraph(obj);
    return;
  }else if(type == "Religion"){
    religionGraph(obj);
    return;
  }else{
    table = processJsonObj(obj,type);
  }
  table.sort(function(a, b){return b[1]-a[1]});
  var top = $topNum.value>=1 ? $topNum.value : table.length;
  top = parseInt(top)+1;
  table = table.slice(0,top);
  console.log(table);
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

function religionGraph(obj){
  res2 = new Array(
    ["Religion","Positive","Negative"],
    ["Christian",0,0],
    ["Islam",0,0],
    ["Buddhism",0,0],
    ["Hinduism",0,0]
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
           title: 'Religion',
           subtitle: 'Positive vs Negative by religion'
         }
       };
  var chart = new google.charts.Bar(document.getElementById('chart'));
  chart.draw(data, options);


  var chris = [[res2[1][0],"Total"]];
  //console.log(res2[1][1],res2[1][2]);
  chris.push(["Positive",res2[1][1]]);
  chris.push(["Negative",res2[1][2]]);
  console.log(chris);
  var data2 = new google.visualization.arrayToDataTable(chris);
  var options2 = {
    title: chris[0][0],
    width: "100%",
    height: 480,
    is3D: true,
    chartArea: {  width: "100%", height: "70%" }
  };
  var chart2 = new google.visualization.PieChart(document.getElementById('chart2'));
  chart2.draw(data2, options2);


  var isl = [[res2[2][0],"Total"]];
  isl.push(["Positive",res2[2][1]]);
  isl.push(["Negative",res2[2][2]]);
  var data3 = new google.visualization.arrayToDataTable(isl);
  var options3 = {
    title: isl[0][0],
    width: "100%",
    height: 480,
    is3D: true,
    chartArea: {  width: "100%", height: "70%" }
  };
  var chart3 = new google.visualization.PieChart(document.getElementById('chart3'));
  chart3.draw(data3, options3);

  var bud = [[res2[3][0],"Total"]];
  bud.push(["Positive",res2[3][1]]);
  bud.push(["Negative",res2[3][2]]);
  var data4 = new google.visualization.arrayToDataTable(bud);
  var options4 = {
    title: bud[0][0],
    width: "100%",
    height: 480,
    is3D: true,
    chartArea: {  width: "100%", height: "70%" }
  };
  var chart4 = new google.visualization.PieChart(document.getElementById('chart4'));
  chart4.draw(data4, options4);

  var hind = [[res2[4][0],"Total"]];
  hind.push(["Positive",res2[4][1]]);
  hind.push(["Negative",res2[4][2]]);
  var data5 = new google.visualization.arrayToDataTable(hind);
  var options5 = {
    title: hind[0][0],
    width: "100%",
    height: 480,
    is3D: true,
    chartArea: {  width: "100%", height: "70%" }
  };
  var chart5 = new google.visualization.PieChart(document.getElementById('chart5'));
  chart5.draw(data5, options5);

  //return res;
}
