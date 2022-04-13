const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

//imgName, tags, description, cName, date(auto) 
// Create Schema
const collection = new Schema({
    imgName: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: false,
        default: null
    },
    description: {
        type: String,
        required: false,
        default: null
    },
    flaggedImage:{
        type: Boolean,
        required: true,
        default: null
    }, 
    collectionname:{
        type: String,
        required: true,
        default: null
    },
    // enter the user schema here or something
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("imgCollections", collection);