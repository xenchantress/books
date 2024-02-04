// Import the Mongoose library
const mongoose = require('mongoose');
const dotenv = require('dotenv');
('dotenv').config();


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL); //Do i remove(process.env?) mine=> "mongodb+srv://TheLujain:yZkIng9xaS0yKxn4@cluster0.zr4brib.mongodb.net/"
    console.log('Connected to the Database');
  } catch (error) {
    console.error('Error trying to connect to the database:', error);
  }
};

module.exports = connectDB;

