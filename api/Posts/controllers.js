const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Tag = require('../models/tag');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
router.post('/:postId/tags/:tagId', async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(
        req.params.postId,
        { $push: { tags: req.params.tagId } },
        { new: true }
      );

      const tag = await Tag.findByIdAndUpdate(
        req.params.tagId,
        { $push: { posts: req.params.postId } },
        { new: true }
      );
  
      res.json({ post, tag });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const posts = await Post.find().populate('tags');
      res.json(posts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  
