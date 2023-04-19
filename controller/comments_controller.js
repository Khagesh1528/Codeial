// Import the required 
const Comment = require('../models/comments_schema');
const Post = require('../models/post_schema');

module.exports.create = function(req,res){
    
    Post.findById(req.body.post ,function(err,post){
        if(post){
            Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            },function(err,comment){
                // Handle Error 
                console.log('Comment Push');
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}