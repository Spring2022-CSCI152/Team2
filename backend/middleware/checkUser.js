require('dotenv').config();
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/user');
const mongoose = require('mongoose');

// middleware functionality to check logged in user
module.exports =  async (req, res, next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.secretKey, async (err, decodedToken) => {
            if (err){
                console.log(err.message);
                res.locals.user = null;
                next();
            } else {
                //console.log(decodedToken)
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    } else {
        res.locals.user = null;
        next();
    }
}