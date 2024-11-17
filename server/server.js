const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const authRoutes = require("./routers/auth");
const homeRoutes = require("./routers/home");
const commentRoutes = require("./routers/comment");

const app = express();
const PORT = process.env.PORT || 8000;
require("dotenv").config();

// Kết nối MongoDB
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Tăng thời gian timeout
      socketTimeoutMS: 45000,
    }
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Failed to connect MongoDB:", err));
  mongoose.set('debug', true);
// Middleware
app.use(
  cors({
    origin: "http://localhost:3000", // Thay đổi thành domain của frontend
    credentials: true, // Cho phép gửi cookie
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cấu hình express-session
app.use(
  session({
    secret: "yourSecretKey", // Khóa bí mật để mã hóa phiên
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl:
        process.env.MONGODB_URI ||
        "mongodb+srv://23021410:Sl2jCrBm63EqopFA@cluster0.gq1kc.mongodb.net/Nodejs?retryWrites=true&w=majority&appName=Cluster0", // URI cho MongoDB
      collectionName: "sessions", // Tên collection lưu trữ phiên
    }),
    cookie: {
      maxAge: 180 * 60 * 1000, // Thời gian sống của cookie (180 phút)
      secure: false, // Đặt true nếu sử dụng HTTPS
      sameSite: "lax", // Chế độ SameSite cho cookie
    },
  })
);

// Cấu hình Static Files
app.use("/images", express.static("public/images")); // Phục vụ hình ảnh từ thư mục public/images

// Định nghĩa các route với prefix
app.use("/api/auth", authRoutes); // Tất cả routes liên quan đến xác thực
app.use("/api/home", homeRoutes); // Routes chính cho trang chủ
app.use("/api/comments", commentRoutes); // Routes cho comment

// Khởi động server

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
