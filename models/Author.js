const mongoose = require ('mongoose');

const authorSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    posts: [
        { type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
    },
    ],
});

const Author = mongoose.model('Author', authorSchema);

module.exports = Author;