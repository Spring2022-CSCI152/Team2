require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

// middleware functionality to check logged in user
module.exports = async (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const isCustomAuth = token.length < 500;
        console.log(token);

        let decodedData;

        if(token && isCustomAuth){
            decodedData = jwt.verify(token, process.env.secretKey);

            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token, process.env.secretKey);

            req.userId = decodedData?.id;
        }
        next();

    } catch (error){
        console.log(error);
    }

}