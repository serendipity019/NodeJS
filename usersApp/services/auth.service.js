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

module.exports = {generateAccessToken}; 