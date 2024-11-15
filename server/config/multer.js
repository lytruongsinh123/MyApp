const multer = require('multer');
const path = require('path');


// Đường dẫn tới thư mục public/images
const publicImagesDir = path.join(__dirname, '..', 'public', 'images');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicImagesDir);  // Đảm bảo đường dẫn này là đúng
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });
module.exports = upload;
