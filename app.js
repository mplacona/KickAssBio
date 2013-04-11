
// DB setup
require('./modules/db.js');

/*
 * module dependencies
*/

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path');

var app = express();

function compile(str, path){
	return stylus(str)
		.set('filename', path)
		.use(nib())
		.set('compress', true)
}

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(stylus.middleware(
	{
		src: __dirname + '/public'
		,compile: compile
	}

))
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

// Homepage
app.get('/', routes.index);

// User
app.get('/signup', user.signup);
app.post('/signup', user.create);
app.post('/login', user.login);

module.exports = app;
if (!module.parent) {
	http.createServer(app).listen(app.get('port'), function(){
	  console.log('Express server listening on port ' + app.get('port'));
	});
}
