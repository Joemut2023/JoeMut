
var createError = require("http-errors");
var creationRouter = require("./routes/creation");
var contactRouter = require("./routes/contact");
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const ejsLayout = require('express-ejs-layouts');
var indexRouter = require('./routes/index');
var catalogueRouter = require('./routes/catalogue')
var promotionRouter = require('./routes/promotion')
var usersRouter = require('./routes/users');

var app = express();
require("./config/db").sync();
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(ejsLayout);
app.set("layout", path.join(__dirname, "views/layout/layout"));
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/creation", creationRouter);
app.use("/contact", contactRouter);
app.use('/catalogue',catalogueRouter)
app.use('/promotion',promotionRouter)



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
