/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , fbtest = require('./routes/fbtest')
  , http = require('http')
  , path = require('path')
  , nib = require('nib')
  , stylus = require('stylus');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true) // minimize filesize
    .use(nib());
}


/*
app.options('/fb', function(req, res) { 
    // Note * allows ALL domains consider listing out trusted domains 
    res.header('Access-Control-Allow-Origin', '*');
    // Request methods to allow for cross domain
    res.header('Access-Control-Allow-Methods', 'GET POST OPTIONS'); 
    // A way to  restrict access using custom headers 
    res.header('Access-Control-Allow-Headers', 'X-Custom-Header'); 
    // The term of allowance
    res.header('Access-Control-Max-Age', 1728000); 
    res.end(); 
});*/

process.env.ENV_VARIABLE


app.configure(function(){
  app.set('port', process.env.PORT || 3004); // process.env.PORT för att funka med services!
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride()); // fejka posts
  app.use(stylus.middleware({
      src: __dirname + '/public',
      compile: compile
    }));
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));

  console.log("process: "+JSON.stringify(process.env));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});


app.get('/', routes.index);
app.get('/users', user.list);
app.get('/fb', fbtest.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
