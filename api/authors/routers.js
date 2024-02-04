const express = require ('express');
const router = express.Router();
const authorController = require('./controllers');
const passport = require('passport');
const { createAuthor, getAuthors, createPost } = require('../controllers/authors.controllers');

require('../config/passport');


router.post('/create', authorController.createAuthor);
router.get('/', authorController.getAuthors);

const authenticate = passport.authenticate('jwt', { session: false });
router.post('/signup', signup);
router.post('/signin', signin);

router.post('/authors', authenticate, createAuthor);
router.get('/authors', getAuthors);
router.post('/authors/:authorId/posts', authenticate, createPost);

module.exports = router;