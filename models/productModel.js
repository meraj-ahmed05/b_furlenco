import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    width: {
        type: Number
    },
    height: {
        type: Number
    },
    length: {
        type: Number
    },
    diameter: {
        type: Number
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    tag:{
        type: String,
        default: "regular"
    },
    stock:{
        type: String,
        default: "in-stock"
    }


},{timestamps: true})


const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);

export default productModel