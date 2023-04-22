// Import the required 
const Comment = require('../models/comments_schema');
const Post = require('../models/post_schema');

module.exports.create = function (req, res) {

    Post.findById(req.body.post, function (err, post) {
        if (post) {
            Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            }, function (err, comment) {
                // Handle Error 
                console.log('Comment Push');
                post.comments.push(comment);
                post.save();
                res.redirect('/');
            });
        }
    });
}

// Remove The Comments 
module.exports.destroy = function (req, res) {
    // Find The Comment Using params
    Comment.findById(req.params.id, function (err, comment) {
        // Check Point Kya Jisne Comment Kiya Hain 
        // Or Jo Request Kar Raha Hai Ek Hi Hain
        if (comment.user == req.user.id) {
            console.log('Comment User', comment.user);
            console.log('Request User Id', req.user.id);
            // Yaha Comments Me Se Post ko store kar lete hain
            let postId = comment.user;
            comment.remove();
            // Yaha Se us post ko khojte hai or update karte hain
            Post.findByIdAndUpdate(postId, { $pull: { comments: req.user.id } }, function (err, post) {
                return res.redirect('back');
            });
        }
        else {
            return res.redirect('back');
        }
    });
}