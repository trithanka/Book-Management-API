// const { required, string } = require("joi");
const mongoose = require("mongoose");
const booksSchema=mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    userId:{
        type : mongoose.Types.ObjectId ,  
        ref:'User'  //referencing to the User model in models folder
    },
    ISBN: {
        type: String,
        required: true,
        unique: true
    },
    author: {
        type: String,
        required: true,
    },
    category:{
        type:String,
        required:true,
        trim:true
    },
    rating:{
        type:Number,
        default:0,
        trim:true
    },
    publicationYear:{
        type:Date,
        required:true,
    }
},{timestamps:true});

const Book = mongoose.model('Book', booksSchema);
module.exports = Book;