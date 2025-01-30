const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Product schema and model used in the products route
const productSchema = new Schema({
    name: { type: String, required: true },
    category: String,
    description: String,
    price: { type: Number, required: true },
    oldPrice: Number,
    image: String,
    color: String,
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Products = model("Product", productSchema);

module.exports = Products;
