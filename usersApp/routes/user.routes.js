const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);
router.get('/:username', userController.findOne); // :username is for the path parameter
router.post('/', userController.create); 
router.patch('/:username', userController.update);
router.delete('/:username', userController.deleteByUsername);
router.delete('/:username/email/:email', userController.deleteByEmail);

module.exports = router; 