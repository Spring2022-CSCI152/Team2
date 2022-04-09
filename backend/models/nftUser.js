const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create image collection schema
const collectionSchema = new Schema({
    imgName: {
        type: String,
    },
    tags: {
        type: String,
    },
    description: {
        type: String,
    },
    flaggedImage:{
        type: Boolean,
    }, 
    collectionname:{
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create User Schema
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
        type: collectionSchema,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("collections", collectionSchema);
module.exports = User = mongoose.model("users", UserSchema);