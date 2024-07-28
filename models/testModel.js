import mongoose from "mongoose";


const testSchema = new mongoose.Schema({

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
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
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


const testModel = mongoose.models.Test || mongoose.model('Test', testSchema);

export default testModel