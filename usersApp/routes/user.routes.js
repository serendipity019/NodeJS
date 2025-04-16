const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const verifyToken = require('../middlewares/auth.middleware').verifyToken;
const verifyRoles = require('../middlewares/auth.middleware').verifyRoles;

router.get('/',  userController.findAll);
router.get('/:username', userController.findOne); // :username is for the path parameter
//router.post('/', userController.create); //this is if we haven't verify token 
router.post('/', verifyToken, verifyRoles("ADMIN"), userController.create); 
router.patch('/:username',verifyToken, verifyRoles("ADMIN"), userController.update);
router.delete('/:username', verifyToken, verifyRoles("ADMIN"), userController.deleteByUsername);
router.delete('/:username/email/:email', verifyToken, verifyRoles("ADMIN"), userController.deleteByEmail);

module.exports = router; 