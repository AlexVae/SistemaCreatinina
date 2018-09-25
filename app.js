var createError = require('http-errors');
var express = require('express');
var underscore= require('underscore');
var MysqlJson = require('mysql-json');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session         = require('express-session'); //Manejo con sesiones
var indexRouter = require('./routes/index');
var medicoRouter = require('./routes/medico');
var usersRouter = require('./routes/users');
var MysqlJson = require('mysql-json');
global.conexion = new MysqlJson({
    host:'localhost',
    user:'root',
    password:'',
    database:'SistemaCreatinina'
  });
  global.conexion.connect(function(err) {
  if (err) throw err;
});
var app = express();
//=========Base de datos 
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/Healty',medicoRouter);
app.use(session({'resave':true, 'saveUninitialized' : true, 'secret' : 'Dacomp' })); //Manejo con sesiones
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
 // req.conexion = conexion;
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
   
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;