//routes
const express = require('express');
const router = express.Router();
const User = require('./user.model');
const { default: generateToken } = require('../middleware/GenerateToken');


//register endpoint
router.post('/register', async(req, res) => {
    try{
        const {username, email, password} = req.body;
        const user = new User({username,email, password});
        //save it to the database
        await user.save();
        res.status(201).send({message: "User registered successfully!"})
    }catch(err){
        console.log("Error registering user", err);
        res.status(500).send({message:"Error registering user"});
    }
})

//login user endpoint
router.post('/login', async(req, res) => {
    const {email, password} = req.body;
    try {
        const user = await User.findOne({email});
    if(!user){
        return res.status(404).send({message: "User not found"});
    }
    const isMatch = await user.comparePassword(password);
    if(!isMatch){
        return res.status(401).send({message: "Invalid credentials"});
    }

    //generating token imported from middleware folder
    const token = await generateToken(user._id);

    // res.cookie('token', token, {httpOnly: true});

    res.status(200).send({message: "User logged in successfully", user});
        
    } catch (error) {
        console.log("Error logged in user", error);
        res.status(500).send({message:"Error logged in user"});
    }
})

module.exports = router;