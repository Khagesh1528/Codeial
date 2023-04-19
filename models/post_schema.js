//  database relations to Post Import Mongoose
const mongoose = require('mongoose');

// Create PostSchema To
const postSchema = new mongoose.Schema({
    // This is field
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    // including the array of ids all the comments in the post schmema itself
    comments :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
},
{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

// export the postSchema
module.exports = Post;