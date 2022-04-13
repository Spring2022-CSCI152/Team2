const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;

// flagged image, collection, stolen art link, user, alert message, date
// Create Alert Schema
const userAlerts = new Schema({
    imgName: {
        type: String,
        required: true,
        default: null
    },

    foundLink: {
        type: String,
        required: true,
        default: null
    },

    alertMessage: {
        type: String,
        required: true,
        default: null
    },

    alertUser: {
        type: ObjectId,
        ref: "users",
        required: true
    },

    flaggedCollection: {
        type: ObjectId,
        ref: "imgCollections",
        required: true
    },

    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model("alerts", userAlerts);