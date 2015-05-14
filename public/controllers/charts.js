google.load("visualization", "1", {packages:["corechart"]});
//google.setOnLoadCallback(drawChart);

var charts = document.getElementById('resultContainer')

function drawChart() {
  charts.style.display='block';
  console.log("drawing chart");
  var data = google.visualization.arrayToDataTable([
    ['Task', 'Hours per Day'],
    ['Work',     11],
    ['Eat',      2],
    ['Commute',  2],
    ['Watch TV', 2],
    ['Sleep',    7]
  ]);

  var options = {
    title: 'My Daily Activities',
    is3D: true,
  };

  var chart = new google.visualization.PieChart(document.getElementById('resultContainer'));
  chart.draw(data, options);
}
