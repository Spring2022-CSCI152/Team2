const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

//imgName, tags, description, cName, date(auto) 
// Create Schema
const collections = new Schema({
    imgName: {
        type: String,
        required: false
    },

    image:{
        data: Buffer,
        contentType: String
    },

    tags: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: true,
        default: " "
    },

    flaggedImage:{
        type: Boolean,
        required: false,
        default: false
    },
    
    cName: {
        type: String,
        required: false,
        default: null
    },

    postedBy: {
        type: ObjectId,
        ref: "users",
        required: false
    },

    date: {
        type: Date,
        default: Date.now
    },

    imgURL: {
        type: String,
        default: "URL not found",
        required: false
    }
});

module.exports = User = mongoose.model("imgCollections", collections);