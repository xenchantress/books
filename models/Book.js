// Import Mongoose
const mongoose = require("mongoose");

// Define the Book Schema
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      default: 5, // Default price is 5 if not provided
    },
    image: {
      type: String,
      default: "default-image.jpg", // Default image if not provided
    },
  },
  {
    timestamps: true, // this will set time whenever a new feature is added to the schema
  }
);

module.exports = mongoose.model("Book", BookSchema);
