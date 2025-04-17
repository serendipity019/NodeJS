const User = require('../models/user.model');

function findAll() {
    const result = User.find();
    return result; 
}

function findOne(username) {
    const result = User.findOne({username:username});
    return result;
}

// This function is to automation the process of testing.
// We want to take the last user from our database and with him to make the tests. 
async function findLastInsertedUser() {
    console.log('Find last inserted user');

    try {
        const result = await User.find().sort({_id:-1}).limit(1);
        console.log("Success in finding last inserted user", result);
        return result;
    } catch (err) {
        console.log("Problem in finding last inserted user", err);
        return false;
    }
}

module.exports = {findAll, findOne, findLastInsertedUser}