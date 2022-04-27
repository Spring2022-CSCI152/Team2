const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const {ObjectId} = mongoose.Schema.Types;


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
        default: "Empty bio"
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
        default: "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg"
    },
    alerts: [{
        alertedEmail: {
            type: String,
            required: false,
            default: null
        },

        alertedURL: {
            type: String,
            required: false,
            default: null
        },

        thiefEmail: {
            type: String,
            required: false,
            default: null
        },

        thiefURL: {
            type: String,
            required: false,
            default: null
        }
    }],

    socials: {
        instagram: {
            type: String,
            required: false,
            default: null
        },
        twitter: {
            type: String,
            required: false,
            default: null
        }
    },
    collectionArray: [{
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

    }],

    
    date: {
        type: Date,
        default: Date.now
    }
    
    
});


module.exports = User = mongoose.model("users", UserSchema);