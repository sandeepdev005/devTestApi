//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
// const date = require(__dirname + "/date.js");
const mongoose = require("mongoose");
const multer = require('multer');

const storage = multer.diskStorage(
  {
    destination: function (req, file, callback) {
      callback(null, './upload');
    },
    filename: function (req, file, callback) {
      callback(null, new Date().toISOString() + file.originalname)
    }
  }
);

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


const upload = multer({
  storage: storage, limits: {
    fieldSize: 1024 * 1024 * 5
  }, fileFilter: fileFilter
});


var app = express();
app.set("view engine", "ejs");
app.use('/upload', express.static('upload'));

app.use(bodyParser.urlencoded({
  extended: true
}));

//connect with the database(Localhost)
// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true
// });

//connected to real time server
mongoose.connect("mongodb+srv://admin-sandeep:Sand2@18@cluster0-mgb16.mongodb.net/todolistDB", {
  useNewUrlParser: true, useUnifiedTopology: true
});


let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get("/", function (req, res, next) {

  res.send("Successfully");

});

app.post("/image", upload.single('image'), (req, res, next) => {
  console.log("Yup reached to post service.");
  console.log(req.file);
  res.send("successfully uploaded the image" + req.file.path);
});

app.listen(port, function (req, res) {
  console.log("server running successfully at port no " + port);
});