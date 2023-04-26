// Import Ther UserSchema Model
const User = require('../models/user_schema');

module.exports.profile = function(req,res){
   
    User.findById(req.params.id,function(err,user){
        return res.render('profile', {
            title: "User Profile",
            profile_user:user
        });
    })
   
    
};

// update the user profile name and others
module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id, req.body,function(err,post){
            req.flash('success', 'SuccessFully Updated the Profile')
            return res.redirect('back');
        })
    }
    else{
        res.status(401).send('Unauthorized')
    }
}

// render the sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }
    return res.render('signup',{
        title:"Sign Up"
    });
}

// render the sing In page
module.exports.signIn = function(req,res){
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('signin',{
        title:"Sign In"
    })
}

// Get The Sign Up Data

module.exports.create = function(req,res){
    // first Check Both Passowrd Are Same Or Not
    if(req.body.password != req.body.confirm_password){
        req.flash('error', 'Password Does Not Matches');
        return res.redirect('back');
    }
    // Now Check Kya User Pahle se Exist Karta hain
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in Findind User',err);
            return;
        }
        // Agar User exist nahi karta hain to create karte hain
        if(!user){
            User.create(req.body,function(err,user){
                if (err) {
                    console.log('Error in Creating User', err);
                    return;
                }
                    req.flash('success', 'Thanks For Signning Up !! ')
                    return res.redirect('/users/sign-in');
                
            });
        }
       else{
            return res.redirect('back');
       }
    });
}

// When USer Sign In & Create Session
module.exports.createSession = function(req,res){
    console.log('Create Session');
    req.flash('success', 'Logged In Successfully !!! ')
    
    return res.redirect('/');
   
}

// user sign out  and destroy the session

module.exports.destroySession = function(req,res){
        // passport handel log out
        req.logout( function(err){
            if (err) { return next(err); }
            req.flash('success','You Have Logged Out!!')
            return res.redirect('/')
        });
       
}