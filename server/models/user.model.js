import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const UserSchema = new mongoose.Schema({

    name:{
        type: String,
        trim: true,
        required: "Name is required"
    },

    email:{
        type: String,
        trim: true,
        unique: "User with this email already exists",
        match: [/.+\@.+\..+/, 'Please enter a valid email address'],
        requied: "Email is required"
    },

    hashed_password:{
        type: String,
        required: "Password is required"
    },
    
    holds:{
        type: Number
    },

    items:{
        type: Number
    },

    fines:{
        type: Number

    },

    checkouts:[{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }],
    
    created:{
        type: Date,
        default: Date.now
    },

    updated:{
        type: Date,
        default: Date.now
    },
    salt: String
 });

 UserSchema.virtual('password')
 .set(function(password){
    this._password = password;
   // this.salt = this.makeSalt();
   // this.hashed_password = this.encryptPassword(password);
   this.hashed_password = password;
 
})
 .get(function(){
    return this._password;
 });

 UserSchema.path('hashed_password').validate(function(v){
    if(this._password && this._password.length<6){
        this.invalidate('password', 'Password must be at least 6 characters');
    }
    if(this.isNew && !this._password){
        this.invalidate('password', "Password is required");
    }
},null);

export default mongoose.model('User', UserSchema)