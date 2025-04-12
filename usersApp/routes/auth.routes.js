const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth.controller');

router.post('/login', authController.login);
router.get('/google/callback', authController.googleLogin);

module.exports = router; 

// https://accounts.google.com/o/oauth2/auth?client_id=278081930490-9juu7pngn44v8cm57ed6vpvsafrt6nq5.apps.googleusercontent.com&redirect_uri=http://localhost:3000/api/auth/google/callback&response_type=code&scope=email%20profile&access_type=offline 