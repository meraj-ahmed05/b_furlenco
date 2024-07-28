import mongoose from "mongoose"

const deliverySchema = new mongoose.Schema({
    uId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    pincode:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    }
}, {timestamps: true})


const deliveryModel = mongoose.models.Delivery || mongoose.model('Delivery', deliverySchema);

export default deliveryModel