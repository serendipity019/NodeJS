const User = require('../models/user.model');

exports.findAll = async(req, res) => {
    console.log("find from all user's the products");
    
    try {
        const result = await User.find({}, {username:1, products:1, _id:0});
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log('Problem in finding all users product', err);
        res.status(400).json({status:false,data:err});
    }
}

exports.findOne = async(req, res) => {
    console.log("find products of specific user");
    const username = req.params.username;
    
    try {
        const result = await User.findOne({username: username}, {username:1, products:1, _id:0});
        res.status(200).json({status:true, data: result});
    } catch (err) {
        console.log('Problem in finding all users product', Err);
        res.status(400).json({status:false,data:err});
    }
}

exports.create = async(req, res) => {
    console.log('Insert products to user');
    const username = req.body.username;
    const products = req.body.products;

    try {
        const result = await User.updateOne(
            {username: username},
            {
                $push: {
                    products: products
                }
            }
        );
        res.status(200).json({status: true, data: result});
    } catch (err) {
        console.log('Problem in inserting product', err);
        res.status(400).json({status:400, data: err});
    }
}