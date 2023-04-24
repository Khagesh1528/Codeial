// import the post from Post
const Post = require('../models/post_schema')
const User = require('../models/user_schema')

// module.exports.home = function(req,res){

//     // populate the user of each post
//     Post.find({}).populate('user').exec( function(err,posts){
//         return res.render('home', {
//             title: "Codeial | Home",
//             posts:posts
//         })
//     })
    
// };

module.exports.home = function (req, res) {
    // console.log(req.cookies);
    // res.cookie('user_id', 25);

    // Post.find({}, function(err, posts){
    //     return res.render('home', {
    //         title: "Codeial | Home",
    //         posts:  posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    // This Line Show The Comment & User name <who Comment it
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec(function (err, posts) {
        User.find({},function(err,users){
            return res.render('home', {
                title: "Codeial | Home",
                posts: posts,
                all_users: users
            });
        })
       
    })

}
