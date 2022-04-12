const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("users", UserSchema);