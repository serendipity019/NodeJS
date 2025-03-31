const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log('Find all users from collection users');

    try {
        const result = await User.find();

        res.json({status: true, data: result});
    } catch (err) {
        console.log('Problem in reading users', err);
        res.json({status: false, data: err});
    }
}