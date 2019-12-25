const express = require('express');
const router = express.Router();

const Blog = require('../models/blog');
const mongoose = require('mongoose');

router.get("/all", (req, res, next) => {

    Blog.find().exec().then(doc=>{

        if(doc){
            res.status(200).json(doc)
        }else{
            res.status(404).json({
                message :"No valid entry found from the request."
            })
        }
        
    }).catch(err=>{
        res.status(500).json({
            error: err
        })
    });

  
});

router.post("/postBlog", (req, res, next) => {

    console.log("name "+ req.body.name);

    const blog = new Blog({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        userId: req.body.userId,
        content:req.body.content
    });

    blog.save().then(result => {
        console.log(result);
        res.status(200).json({
            message: "blog posted successfully.",
            blog : blog
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error:err
        });
    });

});

router.get("/:blogId", (req, res, next) => {

    res.status(200).json({
        message: "fetch particular blog based on the ID"
    });

});


module.exports = router;