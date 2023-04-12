// import the PostSchema in controller
 const Post = require('../models/post_schema');

 module.exports.create = function(req,res){
    // field Set
    Post.create({
        content:req.body.content,
        user:req.user._id
    },  function(err,post){
            if(err){
            console.log('Error in creating Post',err);
            return;
        }
        return res.redirect('back');

    });
 }