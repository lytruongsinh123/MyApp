const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const multer = require("multer");
const AccountModel = require("../models/Account.js");
const upload = require("../config/multer");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const existingUser = await AccountModel.findOne({ username });
    if (existingUser) {
      return res.json("Tạo khoản đã tồn tại");
    }
    await AccountModel.create({ username, password, email });
    res.json("Tạo tài khoản thành công");
  } catch (err) {
    res.status(500).json("Tạo tài khoản thất bại");
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await AccountModel.findOne({ username, password });
    if (user) {
      req.session.data = user;
      console.log(user)
      res.json(user)
    } else {
      console.log('Đăng nhập không thành công')
    }
  } catch (err) {
    res.status(500).json("Lỗi Server");
  }
});

router.post(
  "/update-image/:userId",
  upload.single("image"),
  async (req, res) => {
    const { address, phone , jobs} = req.body
    try {
      const userId = req.params.userId;
      const imagePath = `${req.protocol}://${req.get("host")}/images/${req.file.filename}`;

      const updatedAccount = await AccountModel.findByIdAndUpdate(
        userId,
        { address,
          phone,
          jobs,
          image: imagePath },
        { new: true }
      );

      if (!updatedAccount) {
        return res.status(404).json({ error: "User not found" });
      }

      res.json(updatedAccount);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong" });
    }
  }
);

router.get('/check-session', (req, res) => {
  if (req.session.data) {
    res.json({ user: req.session.data });
  } else {
    res.status(401).json({ message: 'No session' });
  }
});

router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: 'Logout error' });
    }
    res.json({ message: 'Logout successful' }); // Trả về thông báo thay vì redirect
  });
});

module.exports = router;


