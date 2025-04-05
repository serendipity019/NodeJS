const jwt = require('jsonwebtoken');

function generateAccessToken(users) {

    console.log('Auth Service', user);

    const payload = {
        username: user.username,
        email: user.email,
        roles: user.roles
    }

    const secret = process.env.TOKEN_SECRET;
    const options = {expiresIn: '1h'}; 

    return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
    const secret = process.env.TOKEN_SECRET;
    try {
        const payload = jwt.verify(token, secret);
        console.log("Verify Token", payload);
        return {verified:true, data: payload}; 
    } catch (err) {
        console.log("You aren't verified", err);
        return {verified: false, data: err.message};
    }
} 

module.exports = {generateAccessToken, verifyAccessToken}; 