// const multer = require('multer');
// const path = require('path');


// // Đường dẫn tới thư mục public/images
// const publicImagesDir = path.join(__dirname, '..', 'public', 'images');

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, publicImagesDir);  // Đảm bảo đường dẫn này là đúng
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   }
// });

// const upload = multer({ storage: storage });
// module.exports = upload;
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');

// Cấu hình AWS SDK với thông tin xác thực của bạn
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,  // Lấy từ biến môi trường
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,  // Lấy từ biến môi trường
  region: 'us-east-1'  // Vùng của S3 bucket (thay đổi nếu cần)
});

// Tạo đối tượng S3
const s3 = new AWS.S3();

// Cấu hình Multer để sử dụng S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'your-s3-bucket-name',  // Thay bằng tên bucket S3 của bạn
    acl: 'public-read',  // Quyền truy cập của tệp (public-read cho phép tệp được truy cập công khai)
    key: function (req, file, cb) {
      // Tạo tên file duy nhất trên S3
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const fileName = `images/${uniqueSuffix}${path.extname(file.originalname)}`;  // Lưu ảnh vào thư mục images trong bucket
      cb(null, fileName);
    }
  })
});

module.exports = upload;
