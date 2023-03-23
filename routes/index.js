const express = require('express');

const router = express.Router();
// Import The Controller
const homeController = require('../controller/home_controller')

console.log('Router Is Loaded');

router.get('/',homeController.home);
// for Any Further Routers,access from the main index
router.use('/users',require('./users'))



// Export The routes

module.exports = router;
