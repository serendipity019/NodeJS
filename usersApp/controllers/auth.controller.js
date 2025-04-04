const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const authService = require('../services/auth.service');

exports.login() = async(req, res) => {
    console.log('Login user', req.body);
    
    const username = req.body.username;
    const password = req.body.password;
    try {
        const result = await User.findOne({username: username});
        const isMatch = await bcrypt.compare(password, result.password);

        //if (result && result.username === username && result.password === password)
        if (result && result.username === username && isMatch) {
            const token = authService.generateAccessToken(result);
            res.status(200).json({status: true, data: token});
        } else {
            res.status(404).json({status: false, data: "wrong password or username"});
        }
    } catch (err) {
        console.log('Error in loggin proccess', err);
        res.status(400).json({status:false, data: err});
    }
}