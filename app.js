var express = require("express");
// var cors = require("cors");
var path = require("path");
// var logger = require("morgan");
// var bodyParser = require("body-parser");
var phone_number = require("./routes/phone_number");
var provider = require("./routes/provider");

// require("./socket/index");

var app = express();

// app.use(logger("dev"));
app.use(express.json());
// app.use(express.static(path.join(__dirname, "public")));
app.use("/", express.static(path.join(__dirname, "dist")));
app.use(express.urlencoded({ extended: "false" }));

// app.use(cors());

app.use("/api/phone_number", phone_number);
app.use("/api/provider", provider);
// catch 404 and forward to error handler
app.use("/api", function(req, res, next) {
  var err = new Error("API Not Found");
  err.status = 404;
  res.status(404).send({
    success: false,
    msg: {
      type: "Not Found",
      status: 404,
      message: "Not Found"
    }
  });
  next(err);
});

// catch 404 and redirect to error 404 page
app.use(function(req, res, next) {
  var err = new Error("Page Not Found");
  err.status = 404;
  res.redirect("/");
  next(err);
});

// error handler
app.use(function(err, req, res) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.status(err.status || 500);
  res.json({ error: err });
});

// CORS middleware

module.exports = app;
