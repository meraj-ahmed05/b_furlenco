import mongoose from "mongoose";



const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        unique: true,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    fname:{
        type: String
    },
    lname:{
        type: String
    },
    state:{
        type: String
    },
    city:{
        type: String
    },
    pincode:{
        type: Number
    },
    phone: {
        type: Number,
        length: 10
    },
    role: {
        type: Boolean,
        default: 0
    }

},{timestamps: true})

const userModel = mongoose.models.User || mongoose.model('User', userSchema);

export default userModel