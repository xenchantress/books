const express = require("express");
const Book = require('./models/Book');
const router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require("./controllers");
const upload = require("../../middlewares/multer");


router.param("_id", async (req, res, next, _id) => {
    try {
        const book = await Book.findById(_id);
//   const book = await Book.findBy(_id);
  if (!book)
    return res.status(404).json({ message: "Book with this ID is not found" });
  //console.log("Guess what?", _id);
  next();
} catch (error) {
    next(error);
}
});
router.post("/books", upload.single("bookImage"), async (req, res, next) => {
    try {
      const { title, author } = req.body;
      const imagePath = req.file ? req.file.path : '';
  
      const newBook = new Book({
        title,
        author,
        imagePath,
      });
  
      await newBook.save();
      res.status(201).json({ message: 'Book added successfully', book: newBook });
    } catch (error) {
      next(error);
    }
  });

  router.put("/books/:_id", upload.single("bookImage"), async (req, res, next) => {
    try {
        const { title, author } = req.body;
        const imagePath = req.file ? req.file.path : '';
        const updatedBook = await Book.findByIdAndUpdate(
            req.params._id,
            { title, author, imagePath },
            { new: true }
          );
          res.json({ message: 'Book updated successfully', book: updatedBook });
        } catch (error) {
          next(error);
        }
      });


router.get("/books", getAllBooks);
router.get("/books/:_id", getBookById);
router.post("/books", upload.single("bookImage"), createBook);
router.put("/books/:_id", updateBook);
router.delete("/books/:_id", deleteBook);

module.exports = router;
