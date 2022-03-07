require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// input validation
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

// Load User model
const User = require('../models/user');
const user = require('../models/user');

// Register Route
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
            const newUser = new user({
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
router.post('/login', (req, res) => {
    // Form Validation
    const { errors, isValid } = validateLoginInput(req.body);

    // Check if valid
    if (!isValid) {
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
                    name: user.name
                };

                // Sign the token
                jwt.sign(
                    paylod, 
                    process.env.secretKey, { expiresIn: 15780000 }, // 6 months in seconds
                    (err, token) => { 
                        res.json({
                            success: true,
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Incorrect password" });
            }
        });
    });
});

module.exports = router;
