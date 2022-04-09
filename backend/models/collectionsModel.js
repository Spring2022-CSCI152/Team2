const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//imgName, tags, description, cName, date(auto) 
// Create Schema
const collection = new Schema({
    imgName: {
        type: String,
        required: false
    },
    tags: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },

    flaggedImage:{
        type: Boolean,
        required: false
    }, 

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("imgCollections", collection);