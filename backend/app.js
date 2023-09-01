var createError = require('http-errors');
var express = require('express');
var app = express();
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fileUpload = require('express-fileupload')
var cors = require('cors');
const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex');
require('dotenv').config();
var indexRouter = require('./routes/index');

app.use(session({
  secret :secretKey,
  saveUninitialized : true,
  resave: false
}));


app.use(fileUpload({useTempFiles:true,tempFileDir:'/tmp/'}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: process.env.FRONT_URL, 
  credentials: true,
}));
app.use('/', indexRouter); // Usa tus rutas aquí


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
