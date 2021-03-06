var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require ('body-parser');

var indexRouter = require('./routes/index');
var cafeRouter = require('./routes/cafes');
var usersRouter = require('./routes/users');
var submitRouter = require('./routes/submit-specials');

const middleware = require('./helpers/middleware');

var app = express();

// =======================================
// view engine + dependencies setup
// =======================================
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));  //serve static assets in public dir
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));


// =======================================
// MOUNT ROUTES
// =======================================
app.use('/', indexRouter);
app.use('/cafe-login', cafeRouter);
app.use('/users', usersRouter);
app.use('/submit-specials', submitRouter);


// =======================================
// error handler + default route error
// =======================================

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error.ejs');
// });


const port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(`Server started on port ${port}`);
  console.log('NODE_ENV is set to: '+ "'"+ app.get('env')+ "'")
});

module.exports = app;

