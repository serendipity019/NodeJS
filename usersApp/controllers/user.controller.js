const User = require('../models/user.model');
const userService = require('../services/user.services');

exports.findAll = async(req, res) => {
    console.log('Find all users from collection users');

    try {
        //const result = await User.find();
        const result = await userService.findAll();

        res.status(200).json({status: true, data: result});
    } catch (err) {
        console.log('Problem in reading users', err);
        res.json({status: false, data: err});
    }
}

exports.findOne = async(req, res) => {
    console.log('Find user with specific username');
    let username = req.params.username;

    try {
        //const result = await User.findOne({username: username});
        const result = await userService.findOne(username);
        if (result) {
            res.status(200).json({status:true, data: result});
        } else {
            res.status(404).json({status: false, data: 'User not exists'});
        }
    } catch (err) {
        console.log('Problem in finding user', err);
        res.staus(400).json({status: false, data: err});
    }
}

exports.create = async(req, res) => {
    console.log('Create User');

    let data = req.body;

    const newUser = new User({
        username: data.username,
        password: data.password,
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: {
            area: data.address.area,
            road: data.address.road
        }
    });

    try {
        const result = await newUser.save();
        res.status(200).json({status: true, data: result});
    } catch(err) {
        console.log('Problem in creating user', err);
        res.status(400).json({status: false, data: err}); 
    }
}

exports.update = async(req, res) => {
    const username = req.body.username; 

    console.log('Update user with username', username);
    const updateUser = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        address: {
            area: req.body.address.area,
            road: req.body.address.road
        }
    };
    
    try {
        const result = await User.findOneAndUpdate({username:username}, updateUser, {new: true}); // We write new: true because in diferent case this will return to us the old data.
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log('Problem in updating user', err);
        res.status(400).json({status: false, data: err});
    }
}