const mongoose = require("mongoose");
const userSchema=mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    dateOfBirth:{
        type:Date,
        required:true,
        trim:true
    }
})

const User = mongoose.model('User', userSchema);
module.exports = User;