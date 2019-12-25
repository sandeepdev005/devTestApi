const express = require('express');
const router = express.Router();


router.get('/',(req,res,next)=>{
    console.log("ghgffgfhghg");
   res.status(200).json({message :'request successfully from account'});
});


router.get('/:name',(req,res,next)=>{

     const name = req.params.name;
    

     if(name === 'sandeep'){
         res.status(200).json({
             message :"Yeah you are admin no need of auth.",
             id: "001"
         });
     }else{
         res.status(200).json({
             message :"You are not authoried Mr "+ name,

         });
     }


});

module.exports = router;


