// import the PostSchema in controller
const Post = require('../models/post_schema');
const Comment = require('../models/comments_schema'); // this is for the delete the post as well as comment

module.exports.create = async function (req, res) {
    // field Set
    try {
        await Post.create({

            content: req.body.content,
            user: req.user._id

        })
        req.flash('success', 'Post Published')
        return res.redirect('back');

    } catch (err) {

        req.flash('error', err);

        return res.redirect('back');
    }


}

//  deleting the a post (authorirzed);

module.exports.destroy = async function (req, res) {
    // yaha sabse pahle requrested id se us post ko khojenge
    try {

        let post = await Post.findById(req.params.id);

        // .id means converting the object id into string
        if (post.user == req.user.id) {
            // authorized check kya user sign in hain wo req.user.id se match hota hain

            post.remove();
            await Comment.deleteMany({ post: req.params.id })
            req.flash('success', 'Post And Associated Comments Deleted !!')
            return res.redirect('back')

        }
        else {
            req.flash('error', 'You Can Not Delete The Post')
            return res.redirect('back')
        }
    } catch (err) {

        req.flash('error', err)
        return res.redirect('back')

    }
}