const jwt = require('jsonwebtoken'); //ES module import
const User = require('../users/user.model');

const JWT_SECRET = process.env.JWT_SECRET_KEY;

const generateToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Generate token
        const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: '7d', });
        return token;
    } catch (error) {
        console.error("Error generating token:", error);
        throw error;
    }
};

module.exports = generateToken;
