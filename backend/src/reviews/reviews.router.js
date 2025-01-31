const express = require('express');
const Reviews = require('./reviews.model');
const Products = require('../products/products.model');
const router = express.Router();


//post a new review
router.post("/post-review", async (req, res) => {
  try {
    const {comment, rating, userId, productId} = req.body;

    if (!comment || !rating || !userId || !productId) {
      return res.status(400).send({ message: "Missing required information" });
    }

    const existingReview = await Reviews.findOne({ userId, productId });

    //check if user has already reviewed the product
    if (existingReview) {
       //update reviews
        existingReview.comment = comment;
        existingReview.rating = rating;
        await existingReview.save();
    }else{
        //create new review
        const newReview = new Reviews({
            comment,
            rating,
            userId,
            productId
        });
        await newReview.save();
    }

    //calculate the average rating
    const reviews = await Reviews.find({ productId });
    if (reviews.length > 0) {
      const totalRating = reviews.reduce((acc, review) => acc + review.rating, 0);
      const averageRating = totalRating / reviews.length;
      const product = await Products.findById(productId);
      if (product) {
        product.rating = averageRating;
        await product.save({validateBeforeSave: false});
      } else {
        return res.status(404).send({ message: "Product not found" });
      }
    }

    res.status(200).send({ 
        message: "Review posted successfully" ,
        reviews: reviews,
    });


  } catch (error) {
    console.error("Error posting review", error);
    res.status(500).send({ message: "Error posting review" });
  }
})

//get all reviews with count



module.exports = router;