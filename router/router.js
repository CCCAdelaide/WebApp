/*
Team 9 - Adelaide
Jun Jen Chan - 341759
Tou Lee - 656128
David Monroy - 610346
Daniel Teh - 558424
Jaime Martinez - 642231
*/

module.exports = function(app) {
    //index
    app.get('/', function(req, res) {
        res.render('index.jade'); // load the index.jade file
    });

    //home
    app.get('/home', function(req, res) {
        res.render('home.jade'); // load the index.jade file
    });
  };
