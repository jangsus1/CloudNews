var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');
const flash = require("connect-flash");
const methodOverride = require('method-override');


var router = require('./src/routes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'jade');

app.use(sassMiddleware({
    src: path.join(__dirname, '..', 'public/stylesheets/scss'),
    dest: path.join(__dirname, '..', 'public/stylesheets'),
    debug : false,
    indentedSyntax : false,
    outputStyle: 'extended',
    prefix : '/public/stylesheets'
  }))


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data', express.static(path.join('/workspace/GB/pipeline', 'data')));

app.use('/', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
