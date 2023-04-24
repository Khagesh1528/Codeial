const express = require('express');
const passport = require('passport')

const router = express.Router();
// Access the controller
const usersController = require('../controller/user_controller')


// Controller 

router.get('/profile/:id', passport.checkAuthentication,usersController.profile);
router.post('/update/:id', passport.checkAuthentication, usersController.update);
router.get('/sign-up',usersController.signUp);
router.get('/sign-in',usersController.signIn);
router.post('/create',usersController.create);

// use passport as a middileware to authenticate
router.post('/create-session',passport.authenticate('local',{failureRedirect:'/users/sign-in'})
    ,usersController.createSession);

// log Out 
router.get('/sign-out',usersController.destroySession);


module.exports = router;