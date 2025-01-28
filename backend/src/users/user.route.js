//routes
const express = require('express');
const router = express.Router();
const User = require('./user.model');
const generateToken = require('../middleware/GenerateToken');
// const verifyToken = require('../middleware/verifyToken');
 
// register endpoint
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

//  login user endpoint
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

    //  generating token imported from middleware folder
    const token = await generateToken(user._id);
    // console.log("Token", token);

    //  set cookie
    res.cookie('token', token, {
        httpOnly: true,
        secure:true,
        sameSite: 'None',
    });

    //  send user details
    res.status(200).send({message: "User logged in successfully", token, user:
        {
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,            
        }
    });
        
    } catch (error) {
        console.log("Error logged in user", error);
        res.status(500).send({message:"Error logged in user"});
    }
})

// // all users endpoint
// router.get("/users", verifyToken ,async(req, res) => {
//     res.send({message: "Protected users"})
// })

// logout user endpoint
router.post('/logout' , (req, res) => {
    res.clearCookie('token');
    res.status(200).send({message: "User logged out successfully"})
})

// delete a user 
router.delete('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).send({message: "User not found"});
        }
        res.status(200).send({message: "User deleted successfully"});
    } catch (error) {
        console.log("Error deleting user", error);
        res.status(500).send({message:"Error deleting user"});
    }
})

//get all users
router.get('/users', async(req, res) => {
    try {
        const users = await User.find({}, 'id email role').sort({createdAt: -1});
        res.status(200).send(users);
    } catch (error) {
        console.log("Error getting users", error);
        res.status(500).send({message:"Error getting users"});
    }
})

//update user role
router.put ('/users/:id', async(req, res) => {
    try {
        const {id} = req.params;
        const {role} = req.body;
        const user = await User.findByIdAndUpdate(id, {role}, {new:true});

        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        res.status(200).send({message: "User role updated successfully", user});

    } catch (error) {
        console.log("Error updating user role", error);
        res.status(500).send({message:"Error updating user role"});
    }
})

//edit or update profile
router.patch('/edit-profile', async(req, res) => {
    try {
        const {userId, username, profileImage, bio, profession} = req.body;
           
        if(!userId){
            return res.status(404).send({message: "User not found"});
        }

        const user = await User.findByIdAndUpdate(userId, {username, profileImage, bio, profession}, {new:true});

        if(!user){
            return res.status(404).send({message: "User not found"});
        }

        //update profile
        if(username !== undefined)user.username = username;
        if(profileImage !== undefined)user.profileImage = profileImage;
        if(bio !== undefined)user.bio = bio;
        if(profession !== undefined)user.profession = profession;

        await user.save();

        res.status(200).send({message: "Profile updated successfully", user:{
            _id: user._id,
            email: user.email,
            username: user.username,
            role: user.role,
            profileImage: user.profileImage,
            bio: user.bio,
            profession: user.profession,
        }});

    } catch (error) {
        console.log("Error updating profile", error);
        res.status(500).send({message:"Error updating profile"});
    }
})




module.exports = router;