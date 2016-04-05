var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var flash   = require('req-flash');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tema5');
// mongoose.connect('mongodb://QMongoLab:3uMKLYR7Oe.vcNuV75gfthlLx4KBpGOTr7DSsU437zY-@ds054128.mlab.com:54128/QMongoLab');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log("we're connected to db: " + db.db.databaseName ); });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Configuracion Passport
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var expressSession = require('express-session');
app.use(expressSession({
    secret: 'claveSecreta',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
var user = require('./model/userModel');
passport.use(new LocalStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'nodejs.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash({ locals: 'flash' }));

var routes = require('./routes/index');
var users = require('./routes/users');

app.use('/', routes);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(err)
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
// to change enviroment type o the console -> set node_env={your env name here}
console.log('Enviroment: ' + app.get('env'))
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  console.log(err)
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
