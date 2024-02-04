const multer = require("multer");
const path = require('path');
const storage = multer.diskStorage({
    destination: function ( req, file, cb){
        console.log(__dirname);
        cb(null, path.join(__dirname, "../media"));
    },
    filename: function ( req, file, cb){
        const uniqueSuffix = Date.now() + "-"+Math.round(Math.random() *1e9);
        cb(null, file.filename + "-" + uniqueSuffix + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage});

module.exports = upload;