import mongoose from 'mongoose'
const CheckoutSchema = new mongoose.Schema({

    item:{
        type: Schema.Types.ObjectId,
        ref: 'Book'
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