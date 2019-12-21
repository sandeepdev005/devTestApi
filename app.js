//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
// const _ = require("lodash");


var app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

//connect with the database(Localhost)
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true
// });

//connected to real time server
mongoose.connect("mongodb+srv://admin-sandeep:Sand2@18@cluster0-mgb16.mongodb.net/todolistDB", {
  useNewUrlParser: true
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port, function(req, res) {
  console.log("server running successfully at port no "+ port);
});