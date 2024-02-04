const mongoose = require ('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthorModel = require('../models/Author');

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

const signup = async (req, res) => {
    try {
      const { name, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAuthor = await Author.create({ name, password: hashedPassword });
      const token = generateToken(newAuthor);
      res.status(201).json({ message: 'Author created successfully', token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const signin = async (req, res) => {
    try {
      const { name, password } = req.body;
      const author = await Author.findOne({ name });
  
      if (!author) {
        return res.status(401).json({ message: 'Authentication failed' });
      }
  
      const passwordsMatch = await bcrypt.compare(password, author.password);
  
      if (passwordsMatch) {
        const token = generateToken(author);
        res.json({ message: 'Authentication successful', token });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  // la charge utile doit porter le nom, L'identifiant, en particulier celui de L'auteur and more depending on the caracteristiques
  const generateToken = (author) => {
    const payload = { name: author.name, _id: author._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_TOKEN_EXP,
    });
    return token;
  };
  
  module.exports = { Author, authorSchema, AuthorModel, signup, signin };

// module.exports = {"Author, authorSchema, AuthorModel, signup, signin" };
//  I think I misunderstood the quotations here