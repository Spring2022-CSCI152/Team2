const mongoose = require("mongoose");
const collectionImg = require('../models/collectionsModel');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    username: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    userbio: {
        type: String,
        required: false
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
        required: false
    },
    useralert: {
        type: String,
        required: false
    },

    collections: {
        type: Schema.Types.ObjectId,
        ref: 'collectionsModel'
    },
    date: {
        type: Date,
        default: Date.now
    }

    
    
});

module.exports = User = mongoose.model("users", UserSchema);