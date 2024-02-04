
const express = require('express');

const { getAllBooks,
        getBookById,
        createBook,
        updateBook,
        deleteBook,
 } = require('./controllers');
const router = express.Router();


 router.param("_id", async (req, res, next, _id)=>{
    const _id = req.params._id;
    const book = await Book.findBy(_id);
    if(!book)
    return res.status(404).json({message:"Book with this ID is not found"});
    //console.log("Guess what?", _id);
    next();
 });

router.get('/books', getAllBooks);
router.get('/books/:_id', getBookById);
router.post('/books', createBook);
router.put('/books/:_id', updateBook);
router.delete('/books/:_id', deleteBook);




module.exports = router;
