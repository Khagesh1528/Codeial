const express = require('express');

const router = express.Router();
// Access the controller
const usersController = require('../controller/user_controller')


// Controller 
router.get('/profile',usersController.profile);


module.exports = router;