//jshint esversion:6
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const multer = require('multer');
const morgan = require('morgan');
const Media = require('./api/models/media');


//-----------------------------------------Routes------------------------------------------
const accountRoute = require('./api/route/account')
const blogRoute = require('./api/route/blog');






//----------------------------------------------USES---------------------------------------------
var app = express();
app.set("view engine", "ejs");
app.use('/upload', express.static('upload'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use('/account', accountRoute);
app.use('/blog', blogRoute)

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept, Authorization");

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST,PATCH, DELETE, HEAD');
    return res.status(200).json({});
  }

  next();
});


//---------------------------------------DB Connection------------------------------
//System ip address http://192.168.0.28:8000/
//connect with the database(Localhost)

// mongoose.connect("mongodb://localhost:27017/todolistDB", {
//   useNewUrlParser: true, useUnifiedTopology: true,
// });

// connected to real time server
mongoose.connect("mongodb+srv://admin-sandeep:" + process.env.MONGO_ATALS_PASSWORD + "@cluster0-mgb16.mongodb.net/todolistDB", {
  useNewUrlParser: true, useUnifiedTopology: true
});






//---------------------------------------Few methods to working with the Imges ---------

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
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype==='image/gif'||
   file.mimetype === 'video/mp4'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
}


const upload = multer({
  storage: storage, limits: {
    fieldSize: 1024 * 1024 * 5
  }
  , fileFilter: fileFilter
});


app.post("/media", upload.single('media'), (req, res, next) => {


  const media = new Media({
    _id: mongoose.Types.ObjectId(),
    mediaType: "req.file.mimetype",
    mediaName: req.file.originalname,
    path: req.file.path,
    userId: req.body.userId,
  });

  media.save().then(doc => {

    if(doc){
      res.status(200).json(doc);
    }else{
      res.status(404).json({
        message: "Image not uploaded."
      });
    }

   
  }).catch(err => {
    res.status(500).json({
      error: err
    });
  });

 
});









//---------------------------------------Bottom-----------------------------------------

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.get("/", function (req, res, next) {
  res.send("Successfully");
});


app.listen(port, function (req, res) {
  console.log("server running successfully at port no " + port);
});

module.exports = app;