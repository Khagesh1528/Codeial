// import the post from Post
const Post = require('../models/post_schema')
const User = require('../models/user_schema')


// Using Async + Await and Error Handling
module.exports.home = async function (req, res) {
    try {
        // populate the user of each post
        let posts = await Post.find({})
            .populate('user')
            // This Line Show The Comment & User name who Comment it
            .populate({
                path: 'comments',
                populate: {
                    path: 'user'
                }
            });

        let users = await User.find({});
        return res.render('home', {
            title: "Codeial | Home",
            posts: posts,
            all_users: users
        });
    }
    catch (err) {
        console.log('Error', err);
        return;
    }

}
