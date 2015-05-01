
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
