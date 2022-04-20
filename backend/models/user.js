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
    useralert: {
        type: String,
        required: false,
        default: null
    },
    socials: {
        type: String,
        required: false,
        default: null
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
        }

    }],

    
    date: {
        type: Date,
        default: Date.now
    }
    
    
});


module.exports = User = mongoose.model("users", UserSchema);