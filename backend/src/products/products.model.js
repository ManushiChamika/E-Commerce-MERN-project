const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// Product schema and model used in the products route
const productSchema = new Schema({
    name: { type: String, required: true },
    category: { type: String, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, min: 0 },
    image: { type: String, trim: true },
    color: { type: String, trim: true },
    rating: { type: Number, default: 0 },
    author: { type: mongoose.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

const Products = model("Product", productSchema);

module.exports = Products;
