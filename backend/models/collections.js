const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

//imgName, tags, description, cName, date(auto) 
// Create Schema
const collections = new Schema({
    imgName: {
        type: String,
        required: true
    },

    tags: {
        type: String,
        required: true
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
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("imgCollections", collections);