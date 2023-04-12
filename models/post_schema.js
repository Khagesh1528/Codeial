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
        ref:'User',
        required:true
    }
},
{
    timestamps:true
});

const Post = mongoose.model('Post',postSchema);

// export the postSchema
module.exports = Post;