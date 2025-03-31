const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username', userController.findOne); // :username is for the path parameter
router.post('/', userController.create); 

module.exports = router; 