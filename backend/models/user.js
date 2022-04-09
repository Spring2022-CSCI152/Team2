const mongoose = require("mongoose");
const collectionImg = require('../models/collectionsModel');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },

    collections: {
        type: Schema.Types.ObjectId,
        ref: 'collectionsModel'
    }

    
    
});

module.exports = User = mongoose.model("users", UserSchema);