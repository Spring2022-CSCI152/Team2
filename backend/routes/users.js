require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');
const multer = require('multer');
const path = require('path');

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

// Accounts will probably where the image upload will be done
router.post('/account', requireLogin, async (req, res) => {
    res.render('account');
});

router.get('/account', requireLogin, async (req, res) => {
    res.render('account');
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
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
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
    console.log(file)

    //AWS image upload here commented out to prevent duplicate sends
    const result = await uploadFile(file)
    await unlinkFile(file.path)
    console.log(result)
    const description = req.body.description
    res.send({imagePath: `/images/${result.Key}`})
    
        
      User.findOne(
          {_id: req.user},
      ).then(User => {
        User.collectionArray.push({
            imgName: req.file.originalName,
            postedBy: req.user,
            tags: file.path

          });
          User.save().then(User => res.json(User));
      })
     
    

  });



// Searching and other user routers below here

module.exports = router;
