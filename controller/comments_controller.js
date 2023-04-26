// Import the required 
const Comment = require('../models/comments_schema');
const Post = require('../models/post_schema');

module.exports.create = async function (req, res) {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {

            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            res.redirect('/');
        };
    }
    catch (err) {
        console.log('Error', err);
        return;
    }


}

// Remove The Comments 
module.exports.destroy = async function (req, res) {
    // Find The Comment Using params
    try {
        let comment = await Comment.findById(req.params.id)

        // Check Point Kya Jisne Comment Kiya Hain 
        // Or Jo Request Kar Raha Hai Ek Hi Hain
        if (comment.user == req.user.id) {
            // Yaha Comments Me Se Post ko store kar lete hain
            let postId = comment.user;
            comment.remove();
            // Yaha Se us post ko khojte hai or update karte hain
            let post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.user.id } })
            return res.redirect('back');
        }
        else {
            return res.redirect('back');
        }
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}