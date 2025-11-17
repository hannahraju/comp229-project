import mongoose from 'mongoose'
const BookSchema = new mongoose.Schema({

    title:{
        type: String,
        trim: true,
        required: "Book title is required"
    },

    author:{
        type: String,
        trim: true,
        requied: "Author is required"
    },

    year:{
        type: Number
    },
    
    genre:{
        type: String
    },

    format:{
        type: String
    },

    isbn:{
        type: Number
    },

    totalcopies:{
        type: Number,
        default: 0
    },

    available:{
        type: Number,
        default: 0
    },
    
    created:{
        type: Date,
        default: Date.now
    },

    updated:{
        type: Date,
        default: Date.now
    }
    
 });

export default mongoose.model('Book', BookSchema)