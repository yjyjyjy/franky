var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var prometheus = require("express-prometheus-middleware");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var summaryRouter = require("./routes/summary");

var app = express();

const { auth } = require('express-oauth2-jwt-bearer');

export const checkJwt = auth({
  audience: 'https://uhm05fjqtb.execute-api.us-east-2.amazonaws.com/',
  issuerBaseURL: `https://rinahq.com/`,
});


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  prometheus({
    metricsPath: "/metrics",
    collectDefaultMetrics: true,
    requestDurationBuckets: [0.1, 0.5, 1, 1.5],
    requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
    responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
  })
);

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/summary", summaryRouter);

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
