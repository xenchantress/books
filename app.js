//console.log("hi");

const express = require("express");
const app = express();
const connectDB = require("./database");
//require("dotenv").config();
const multer = require("multer");
const cors = require("cors");
//console.log(process.env)
const booksRouter = require("./api/books/routers"); // Import the router
const morgan = require("morgan");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/');


    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Set the filename
    },
  });


  const upload = multer({ storage: storage });



//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

const path = require('path')

console.log(__dirname);
app.use('/media', express.static(path.join(__dirname, 'media')));


app.use((req, res, next) => {
  console.log(req.method, req.originalUrl);
  console.log("Can you hear me?");
  next();
});
//router
app.use("/api", booksRouter);

//handler not found
app.get("/", (req, res, next) => {
  return res.status(404).json({ message: "Path not found" });
  //res.send("Hello, Express!");
});

//error handler
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json(err.message || " Server error");
});

//running the server
const PORT = process.env.PORT || 8000;
connectDB();

app.use('/api/upload', upload.single('bookImage'));

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
