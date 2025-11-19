import mongoose from 'mongoose'

const Schema = mongoose.Schema


const CheckoutSchema = new mongoose.Schema({

    item:{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    },

    owner:{
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    
    outdate:{
        type: Date,
        default: Date.now
    },

    duedate:{
        type: Date,
        default: (Date.now)+14
    }
    
 });

export default mongoose.model('Checkout', CheckoutSchema)