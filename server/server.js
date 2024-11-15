const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require('connect-mongo'); 
const mongoose = require('mongoose'); 
const authRoutes = require("./routers/auth"); 
const homeRoutes = require("./routers/home"); 
const commentRoutes = require("./routers/comment");

const app = express();
const PORT = process.env.PORT || 8000;


mongoose.connect('mongodb://localhost/nodejs', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Thay đổi thành domain của frontend
  credentials: true // Cho phép gửi cookie
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình express-session
app.use(session({
  secret: 'yourSecretKey', // Khóa bí mật để mã hóa phiên
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    mongoUrl: 'mongodb://localhost/nodejs', // URI cho MongoDB
    collectionName: 'sessions', // Tên collection lưu trữ phiên
  }), // Lưu phiên trong MongoDB
  cookie: { 
    maxAge: 180 * 60 * 1000, // Thời gian sống của cookie (180 phút)
    secure: false, // Đặt true nếu sử dụng HTTPS
    sameSite: 'lax' // Chế độ SameSite cho cookie
  }
}));

// Cấu hình Static Files
app.use("/images", express.static("public/images")); // Phục vụ hình ảnh từ thư mục public/images



app.use("/", authRoutes); 
app.use("/", homeRoutes); 
app.use("/", commentRoutes)
// Khởi động server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
