const express = require('express');
const router = express.Router();
const Post = require('../models/post');
const Tag = require('../models/tag');

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
  
