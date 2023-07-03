/*
  Filename: app.js
  Student's Name: Justin Amaral
  StudentID: 301230988
  Date: 28-05-2023
*/
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const dashboardRouter = require('./routes/dashboard');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// Session handler middleware
app.use(
  session({
    secret: 'your-secret'
    // resave: false,
    // saveUninitialized: true
  })
);

// Body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// eslint-disable-next-line consistent-return
function isLoggedIn(req, res, next) {
  if (req.session.isLoggedIn) {
    req.isLoggedIn = true;
    return next();
  }
  res.redirect('/login');
}

app.use((req, res, next) => {
  res.locals.user = req.session.user;
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/dashboard', isLoggedIn, dashboardRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});
app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err.stack);
  res.status(500).send({ status: 500, message: 'internal error', type: 'internal' });
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('pages/error');
});

module.exports = app;
