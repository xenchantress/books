const express = require('express');
const router = express.Router();
const Tag = require('../models/tag');

router.get('/', async (req, res) => {
    try {
      const tags = await Tag.find().populate('posts');
      res.json(tags);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;

  