const jwt = require('jsonwebtoken');

// Function to generate JWT token
const generateJWT = (mainUser) => {
    // Define payload for JWT token 
    const payload = {
        userId: mainUser._id,
        email: mainUser.email
    };

    // Sign the JWT token with a secret key
    const token = jwt.sign(payload, process.env.SECERET_TOKEN, { expiresIn: '1h' }); 

    return token;
}

module.exports = generateJWT;