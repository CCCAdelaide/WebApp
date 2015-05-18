/*
Team 9 - Adelaide
Jun Jen Chan - 341759
Tou Lee - 656128
David Monroy - 610346
Daniel Teh - 558424
Jaime Martinez - 642231
*/
var express = require('express');
var app      = express();
var http    = require('http');
var morgan  = require('morgan');
var port    = process.env.PORT || 80;



app.use(morgan('dev')); // log every request to the console
//app.use(bodyParser()); // get information from html forms
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); // set up jade for templating

require('./router/router.js')(app); // load our routes and pass in our app and fully configured passport
//Static content
app.use(express.static(__dirname + '/public'));

//var GetView = {"id":522068176457052160,"key":["___Moonjunwon","am",[138.59207620000000816,-35.004808300000000543]],"value":-2};//,
//{"id":522065502999285761,"key":["___Moonjunwon","am",[138.59212980000000925,-35.004860399999998322]],"value":1};
//var te = JSON.parse(GetView);


//Run server
var server = require('http').createServer(app);
server.listen(port,function(){
	console.log('Server listening on port ' + port);
});
