const jwt = require('jsonwebtoken');
const {OAuth2Client} = require('google-auth-library');

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

async function googleAuth(code) {
    console.log('Google login');
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
    const REDIRECT_URI =  process.env.REDIRECT_URI; 

    const oauth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

    try {
        // Excange Code for tokens
        const {tokens} = await oauth2Client.getToken(code);
        oauth2Client.setCredentials(tokens);

        const ticket = await oauth2Client.verifyIdToken({
            idToken: tokens.id_token,
            audience: CLIENT_ID
        });

        const userInfo = await ticket.getPayload();
        console.log("Google user", userInfo);
        return {user: userInfo, tokens};
    } catch (error) {
        console.log('Error in google authedication', error);
        return {error: 'Failed to authedicate with google'};
    }
}

module.exports = {generateAccessToken, verifyAccessToken, googleAuth}; 