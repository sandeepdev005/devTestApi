const express = require('express');
const path = require('path');
const crypto = require('crypto');
const multer = require('multer');
const router = express.Router();
const mongoose = require('mongoose');
var fs = require('fs');

//Model classes
const Media = require('../models/media');



const storage = multer.diskStorage({
  destination: './upload/',
  filename: function (req, file, cb) {
    return crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) {
        return cb(err);
      }
      return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
    });
  }
});

// Post files
router.post(
  "/uploadFile",
  multer({
    storage: storage
  }).single('upload'), function (req, res) {
    console.log(req.file);
    console.log(req.body);
    // res.redirect("/uploadFile/" + req.file.filename);
    console.log(req.file.filename);
    // return res.status(200).end();
    //==
    console.log(req.file);
    console.log(req.body.userId);

    const media = new Media({
      _id: mongoose.Types.ObjectId(),
      mediaType: req.file.mimetype,
      mediaName: req.file.originalname,
      path: req.file.path,
      userId: "Dummy",
    });

    media.save().then(doc => {

      if (doc) {
        console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "File not uploaded."
        });
      }


    }).catch(err => {
      res.status(500).json({
        error: err
      });
    });

  });

router.get('/uploadFile/:upload', function (req, res) {
  file = req.params.upload;
  console.log(req.params.upload);
  var img = fs.readFileSync(__dirname + "/uploads/" + file);
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(img, 'binary');
});


router.post('/deleteMediaFile', (req, res, next) => {
  console.log(req.body.fileName);
  if (!req.body.fileName) {
    console.log("Error in deleting file.");
    return res.status(500).json({
      error: "success",
      message: "File not deleted please try again."
    });
  } else {
    try {
      fs.unlinkSync('upload/' + req.body.fileName);
      console.log('successfully deleted file' + req.body.fileName);
      return res.status(200).send('Successfully! file has been Deleted');
    } catch (err) {
      return res.status(400).send(err);
    }
  }
});



module.exports = router;