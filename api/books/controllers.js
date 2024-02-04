const Book = require("../../models/Book");


const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();
    //return res.status(200).json(books);
    res.json(books);
  } catch (error) {
    next(error);
  }
};
const getBookById = async (req, res, next) => {
  const _id = req.params._id;
  try {
    const book = await Book.findById(_id);
    if (!book) {
      //   return res.status(404).json({ error: "Book not found" });
    }
    res.json(book);
  } catch (error) {
    next(error);
  }
};
const createBook = async (req, res, next) => {
  try {
    if (req.file) {
      req.body.image = req.file.path;
    }
    const newBook = await Book.create(req.body);
    res.status(201).json(newBook);
  } catch (error) {
    next(error);

    // res
    //   .status(500)
    //   .json({ error: "An error occurred while creating the book." });
  }
};
const updateBook = async (req, res, next) => {
  const bookId = req.params.id;
  const updatedBookData = req.body;
  try {
    const updatedBook = await Book.findByIdAndUpdate(bookId, updatedBookData, {
      new: true,
    });
    if (!updatedBook) {
      return res.status(404).json({
        error: " Book not found",
      });
    }
    res.json(updatedBook);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   error: " An error occurred while updating the book ",
    // });
  }
};
const deleteBook = async (req, res, next) => {
  const bookId = req.params.id;

  try {
    const deletedBook = await Book.findByIdAndRemove(bookId);
    if (!deletedBook) {
      return res.status(404).json({
        error: " Book not found",
      });
    }
    res.json(deletedBook);
  } catch (error) {
    next(error);
    // res
    //   .status(500)
    //   .json({ error: "An error occurred while deleting the book" });
  }
};

//const fetchById = async(id)=>{

//     const _id = req.params_id;
//     const book = await Book.findById(_id);
//     if(!book)
//     return res.status(404).json({message:"Book with this Id could not be found"});

// }

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

// 500 Internal Server Error, indicates that the server encountered an
