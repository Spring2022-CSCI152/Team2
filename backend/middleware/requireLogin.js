require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// middleware functionality to check logged in user
// module.exports = requireLogin = async (req, res, next) =>  {
//     try{
//         const token = req.cookies.jwt;
//         console.log(req.cookies);

//         if(!token) return res.status(401).json({errorMessage: "Unauthorized"});
//         console.log("hello");

//         const verified = jwt.verify(token, process.env.secretKey);

//         req.user = verified.id; 

//         next();
//     } catch (err){
//         //console.error(err);
//         res.status(401).json({errorMessage: "Unauthorized"});
//     }
// }

module.exports.requireLogin = async (req, res, next) =>  {
    try{
        const token = req.cookies.jwt;
        console.log(req.cookies);

        if(!token) return res.status(401).json({errorMessage: "Unauthorized"});
        console.log("hello");

        const verified = jwt.verify(token, process.env.secretKey);

        req.user = verified.id; 

        next();
    } catch (err){
        //console.error(err);
        res.status(401).json({errorMessage: "Unauthorized"});
    }
}