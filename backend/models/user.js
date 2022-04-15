const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const collections = require('../models/collectionsModel')


// Create User Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: false,
        default: null
    },
    name: {
        type: String,
        required: true
    },
    userbio: {
        type: String,
        required: false,
        default: null
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profileimg: {
        type: String,
        required: false,
        default: null
    },
    useralert: {
        type: String,
        required: false,
        default: null
    },
    socials: {
        type: String,
        required: false,
        default: null
    },

    collectionArray: [{
        type: Schema.Types.ObjectId,
        ref: 'imgCollections' //export ref module.exports = User = mongoose.model("imgCollections", collections);


    }],

    
    date: {
        type: Date,
        default: Date.now
    }
    
    
});


module.exports = User = mongoose.model("users", UserSchema);