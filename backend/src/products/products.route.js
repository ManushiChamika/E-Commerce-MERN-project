const express = require('express');
const Products = require('./products.model');
const router = express.Router();

//post a product
router.post('/create-product', async(req, res)=>{
    try {
       const newProduct = new Products({
        ...req.body
       })
       const savedProduct = await newProduct.save();
       res.status(201).send(savedProduct);
    } catch (error) {
        
    }
});








module.exports = router;