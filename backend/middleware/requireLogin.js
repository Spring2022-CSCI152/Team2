require('dotenv').config();
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose');
const router = require('../routes/routes');
// add in user model here on this line

// middleware functionality to check logged in user
module.exports = (req, red, next) => {
    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error:"You must be logged in to resolve this action."});
    }


}