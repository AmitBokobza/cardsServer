const jwt = require("jsonwebtoken");

const SECRET_KEY = "secret";

// Generate auth token
const generateToken = (user) => {
    
    //create payload (Id, isAdmin, isBusiness)
    const payload = {
        _id: user._id,
        isAdmin: user.isAdmin,
        isBusiness: user.isBusiness
    };

    const token = jwt.sign(payload, SECRET_KEY);
    return token;
};


// Verify token
const verifyToken = (tokenFromClient) => {
    try {
        const payload = jwt.verify(tokenFromClient, SECRET_KEY);
        return payload;
    } catch (error) {
        return null;
    }
};

module.exports = {generateToken, verifyToken};