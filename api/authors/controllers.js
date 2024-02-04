const Author = require('../models/Author');
const Post = require('../models/Post');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

exports.createAuthor = async (req, res) => {
    try{
        const { name } = req.body;
        const author = new Author({ name });
        await author.save();
        res.status(201).json(author);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};

exports.getAuthors = async ( req, res) => {
    try {
        const authors = await Author.find().populate('posts');
        res.status(200).json(authors);
    } catch (error){
        res.status(500).json({ error: error.message });
    }
};
exports.createPost = async (req, res) => {
    try {
        const { title, content, authorId } = req.body;
        const post = new Post({
            title,
            content,
            author: authorId,
        });
        const savedPost = await post.save();
        await Author.findByIdAndUpdate(authorId, { $push: { posts: savedPost._id } });
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

router.post('/:authorId/posts', async (req, res) => {
    try {
      const author = await Author.findById(req.params.authorId);
      if (!author) return res.status(404).json({ message: 'Author not found' });
  
      const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
        author
        : req.params.authorId
    });

    const savedPost = await newPost.save();
    author.posts.push(savedPost._id);
    await author.save();
    res.status(201).json(savedPost);
} catch (error) {
  res.status(500).json({ message: error.message });
}
});
router.get('/', async (req, res) => {
    try {
      const authors = await Author.find().populate('posts');
      res.json(authors);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  exports.signup = async (req, res) => {
    try {
      const { name, username, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const author = new Author({ name, username, password: hashedPassword });
    await author.save();
    const token = generateToken(author);
    res.status(201).json({ author, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.signin = async (req, res) => {
    try {

        const token = generateToken(req.author);
        res.json({ author: req.author, token });
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    const generateToken = (author) => {
        const payload = { username: author.username, _id: author._id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_TOKEN_EXP,
        });
        return token;
      };

  
  module.exports = router;
        