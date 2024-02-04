const express = require ('express');
const router = express.Router();
const authorController = require('./controllers');

router.post('/create', authorController.createAuthor);
router.get('/', authorController.getAuthors);

module.exports = router;