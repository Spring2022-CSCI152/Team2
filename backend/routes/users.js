require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const requireLogin = require('../middleware/requireLogin');

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

// This may be done front end wise?
router.post('/account', requireLogin, async (req, res) => {
    console.log("We're in");
});

router.get('/account', requireLogin, async (req, res) => {
    console.log("We're in");
});

router.get('/alertsPage', requireLogin, async (req, res) => {
    console.log("We're in");
});

// Searching and other user routers below here

module.exports = router;