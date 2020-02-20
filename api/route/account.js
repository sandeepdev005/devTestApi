const express = require('express');
const router = express.Router();
const { User, validateUser } = require('../models/user');


router.get('/', (req, res, next) => {
    console.log("ghgffgfhghg");
    res.status(200).json({ message: 'request successfully from account' });
});

router.post('/getOtp', function (req, res, next) {
    var mobileNo = req.body.mobileNo;
});

router.post('/registerUser', async (req, res, next) => {
    try {
        const { error } = validateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        //check user avilaility 
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).send("That user is already exit.");
        } else {
            user = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            });
            await user.save();
            res.send(user);
        }
    } catch (err) {
        next(err);
    }
});

module.exports = router;


