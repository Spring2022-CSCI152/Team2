require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');
const multer = require('multer');
const path = require('path');
const s3 = require('../middleware/s3')
const fs = require('fs')
const S3 = require('aws-sdk/clients/s3')

// input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/user');


// Max age for token
const maxAge = 3 * 24 * 60 * 60;

// Register Route
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', (req, res) => {
    // Form Validation
    const { errors, isValid } = validateRegisterInput(req.body);

    // Check if valid
    if(!isValid){
        return res.status(400).json(errors);
    }

    // Check if Register already exists
    User.findOne({ email: req.body.email }).then( user => {
        if (user){
            return res.status(400).json({ email: "Email already exists" });
        } else {
            const newUser = new User({
                name: req.body.name,
                username: req.body.name,
                email: req.body.email,
                password: req.body.password
            });

            // Hash and salt password before saving
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save().then(user => res.json(user)).catch(err => console.log(err));
                });
            });

        }
    });
});

// Login Route
router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', (req, res) => {
    // Form Validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check if valid
    if (!isValid) {
        console.log("you are not valid");
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user by email
    User.findOne({ email }).then(user => {
        // Check if the user exist
        if(!user){
            return res.status(404).json({ emailnotfound: "Email not found" });
        }
        // Check passord (bcrypt.compare can compare a hashed password with a non hashed here)
        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch){
                // Create JWT Payload for matched user
                const payload = {
                    id: user.id,
                    email: user.email,
                    name: user.name
                };

                // Sign the token
                const token = jwt.sign(payload, process.env.secretKey, { expiresIn: maxAge });
                res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
                const result = res.status(200).json({ user: user._id });

                
            } else {
                return res.status(400).json({ passwordincorrect: "Incorrect password" });
            }
        });
    });
});

// Logout endpoint
router.get("/logout", requireLogin, (req, res) =>{
    res.cookie('jwt', "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
    })
    .send();
});

// Logged in route to avoid javascript injection. Might use this who knows
router.get('/loggedIn', (req,res) =>{
    try{
        const token = req.cookies.jwt;

        if(!token) return res.json(false);

        jwt.verify(token, process.env.secretKey);

        res.send(true);
    } catch (err){
        res.res.json(false);
    }
});

// set user
router.get('/setuser', requireLogin, (req, res) => {
    res.send(req.user);
});

// Accounts will probably where the image upload will be done
router.post('/account', requireLogin, async (req, res) => {
    res.render('account');
});

// Return user profile for browsing other profiles
router.get('/account/:id', async (req, res) => {
    // Find the user based on the params attached to the link
    User.findOne({_id:req.params.id})
    // Do not include password for the user
    .select("-password")
    // send back a response with the found user data
    .then(user => {
        //console.log(user);
        res.json({user});
    })
    // Otherwise catch an error that the user has not been found in the database
    .catch(err => {
        return res.status(404).json({err: "User not found."});
    })
});

// Alerts route for the python script
router.get('/alertsPage', requireLogin, async (req, res) => {
    console.log("We're in");
});

router.post('/alertsPage', requireLogin, async (req, res) => {
    console.log("We're in");
});


/*
***********************************************************************************************************************************
***********************************************************************************************************************************


************************************************Upload code************************************************************************


***********************************************************************************************************************************
***********************************************************************************************************************************

*/


const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //   cb(null, "uploads");
    // },
    filename: function (req, file, cb) {
      cb(
        null,
        file.fieldname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }) ;


const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
} });


router.post("/collections", requireLogin, upload.single("myImage"), async (req, res) => {
    const file = req.file

    //AWS image upload here commented out to prevent duplicate sends
    const result = await s3.uploadFile(file)

    User.findOne(
        {_id: req.user},
            ).then(User => {
                User.collectionArray.push({
                imgName: req.file.originalname,
                postedBy: req.user,
                tags: "tag",
                imgURL: result.Location
            });
        User.save().then(User => res.json(User));
    })

    await fs.unlinkSync(file.path)
});
  


/*
***********************************************************************************************************************************
***********************************************************************************************************************************


************************************************Image Retrieval Code************************************************************************


***********************************************************************************************************************************
***********************************************************************************************************************************

*/

router.post("/retrievImageJSON", requireLogin, async (req, res) => { 
    User.findOne({_id: req.user}).select("collectionArray").then( result =>{
        res.send(result)
        
    }
    ).catch((err) =>{
        console.log(err);
    })

    
});

router.post("/AWSRetrieval",requireLogin, async(req, res) =>{
        const key = req.params.key
        const readStream = s3.getFileStream(key)
        readStream.pipe(res)

})


// Searching and other user routers below here

module.exports = router;

// Gallery image url retrieval
router.get("/gallery", requireLogin, async (req, res) => {
    User.findOne({_id: req.user}).select("collectionArray").then( result =>{
        // send list of the image urls
        res.send(result.collectionArray.map(x => x.imgURL));
    }
    ).catch((err) =>{
        console.log(err);
    })
});

// user data
router.get("/profileData", requireLogin, async (req, res) => {
    User.findOne({_id: req.user}).select("-password").then( result =>{
        //console.log(result);
        res.send(result);
    }
    ).catch((err) =>{
        console.log(err);
    })
});