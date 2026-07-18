const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name: {type:String, required:true , maxlength:20},
    description: {type:String, required:true , maxlength:100},
    image: {type:String, required:true},   // rasm base64 (data:image/...) ko'rinishida saqlanadi
    category: {type:String, required:true},
    price: {type:Number, required:true},
    discount: {type:Number, required:true , default:0},
    rating: {type:Number, required:true , default:0},
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema)

module.exports = Product
