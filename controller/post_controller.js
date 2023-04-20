// import the PostSchema in controller
 const Post = require('../models/post_schema');
 const Comment = require('../models/comments_schema'); // this is for the delete the post as well as comment

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

//  deleting the a post (authorirzed);

module.exports.destroy = function(req,res){
    // yaha sabse pahle requrested id se us post ko khojenge
    Post.findById(req.params.id, function(err,post){
         // .id means converting the object id into string
        if(post.user == req.user.id){ 
            // authorized check kya user sign in hain wo req.user.id se match hota hain
            post.remove();
            Comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back')
            });
        }
        else{
            return res.redirect('back')
        }

    });
}