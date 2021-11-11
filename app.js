var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");

var app = express();

mongoose.connect(
  "mongodb://admin:Indonesia92@belajar-mongo-shard-00-00.8vwyw.mongodb.net:27017,belajar-mongo-shard-00-01.8vwyw.mongodb.net:27017,belajar-mongo-shard-00-02.8vwyw.mongodb.net:27017/db_afifmakarim_betest?ssl=true&replicaSet=belajar-mongo-shard-0&authSource=admin&retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  function (err) {
    // If no error, successfully connected
    console.log("DB Connection is UP!");
  }
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/api/v1", usersRouter);
app.use("/api/v1/admin", adminRouter);

module.exports = app;
