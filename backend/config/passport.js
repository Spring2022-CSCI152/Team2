require('dotenv').config();
const jwtStrat = require('passport-jwt').Strategy;
const extractJWT = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');

const opts = {};
opts.jwtFromRequest = extractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrPrivateKey = process.env.secretKey;

module.exports = passport => {
    passport.use(
        new jwtStrat(opts, (jwt_payload, done) =>{
            User.findById(jwt_payload.id)
                .then(user => {
                    if (user){
                        return done(null,user);
                    }
                    return done(null,false);
                })
                .catch(err => console.log(err));
        })
    );
};