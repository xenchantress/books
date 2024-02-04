const mongoose = require(' mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Author',
    },
    tags:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Tag',
        },
    ],
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;