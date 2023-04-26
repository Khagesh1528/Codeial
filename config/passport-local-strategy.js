//  import the passport - local - strategy
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

// Import the UserSchema to Find The User
const User = require('../models/user_schema');


// Authentication Using Passport
passport.use(new LocalStrategy({
    usernameField:"email",
    passReqToCallback:true  // For Flash Message
},
    function(req,email,password,done){
// find the user and establish the identity
        User.findOne({email:email},function(err,user){
            if(err){
                req.flash('error', err);
                return done(err);
            }
            // If User Not Found and Password dose not match
            if(!user || user.password != password){
                req.flash('error', 'Invalid !! Username/Password')
                return done(null,false);
            }
            // If User Found
            return done(null,user);

        });

    }
));

// serializing the user to decide which key is to be kept in cookie
passport.serializeUser(function(user,done){
    return done(null,user.id);

});

// deserializing the user from key in the cookies
passport.deserializeUser(function(id,done){
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding User --> Passport Deserializing');
            return done(err);
        }
        
        return done(null,user);
    });
})

// Check User is Authenticated

passport.checkAuthentication = function(req,res,next){
    // if user is signed in ,then pass the request to the next function(controller action)
    if(req.isAuthenticated()){
        return next();
    }
    // if user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticationUser = function (req,res,next) {
    if(req.isAuthenticated()){
        // req.user contains the current signed in user
        // from the session cookie and we are just sending to the locals for the views
        res.locals.user = req.user;
    }
    next();
}




// Now Export The Passport

module.exports = passport;