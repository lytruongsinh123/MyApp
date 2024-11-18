const { S3Client } = require('@aws-sdk/client-s3');

// Cấu hình S3 client với thông tin cần thiết
const s3Client = new S3Client({
  region: 'us-east-1', // Chỉnh sửa theo vùng của bạn
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Thay bằng Access Key của bạn từ biến môi trường
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Thay bằng Secret Key của bạn từ biến môi trường
  },
});

module.exports = s3Client; // Export để sử dụng trong các file khác
