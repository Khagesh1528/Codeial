// Import Ther UserSchema Model
const User = require('../models/user_schema');

module.exports.profile = function(req,res){
    // 1st check user id present in cookies or not
    if(req.cookies.user_id){
        // 2nd Find The User
        User.findById(req.cookies.user_id,function(err,user){
            // 3rd hander user found
            if(user){
                return res.render('profile',{
                    title:"User Profile",
                    user:user
                });
            }
            else{
                return res.redirect('/users/sign-in')
            }
        });
    }
    else{
        return res.redirect('/users/sign-in');
    }
    
};

// render the sign up page
module.exports.signUp = function(req,res){
    return res.render('signup',{
        title:"Sign Up"
    });
}

// render the sing In page
module.exports.signIn = function(req,res){
    return res.render('signin',{
        title:"Sign In"
    })
}

// Get The Sign Up Data

module.exports.create = function(req,res){
    // first Check Both Passowrd Are Same Or Not
    if(req.body.password != req.body.confirm_password){
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
    // Step TO Authenticate
    // 1 Find The User
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in Signing In ', err);
            return; 
        }
        //2nd Handle User Found
        if(user){
            // 3rd Check the password is correct?
            if(user.password != req.body.password){
                return res.redirect('back'); 
            }
            // 4th Create The Session
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }
        else{
            // Handle User Not Found
            return res.redirect('back');
        }
    });

}
