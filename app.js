var express = require('express');
var app      = express();
var http    = require('http');
var morgan  = require('morgan');
var port    = process.env.PORT || 8080;



app.use(morgan('dev')); // log every request to the console
//app.use(bodyParser()); // get information from html forms
app.set('views', __dirname + '/views');
app.set('view engine', 'jade'); // set up jade for templating

require('./router/router.js')(app); // load our routes and pass in our app and fully configured passport
//Static content
app.use(express.static(__dirname + '/public'));


//Run server
var server = require('http').createServer(app);
server.listen(port,function(){
	console.log('Server listening on port ' + port);
});
