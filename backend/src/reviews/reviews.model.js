const mongoose = require('mongoose');

//Product schema and model used in the products route
const reviewSchema = new mongoose.Schema({
    comment : {type: String, required: true},
    rating : {type: Number, required: true},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    productId : {type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true}

}, {
    //timestamps will add createdAt and updatedAt fields
    timestamps: true
    }
);

const Reviews = mongoose.model("Review", reviewSchema);
module.exports = Reviews;
