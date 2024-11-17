// bloglist.js
const BlogModel = require("../../models/blog"); // Đường dẫn tới model BlogModel, chỉnh sửa nếu cần

const getBlogList = async (req, res, next) => {
  try {
    console.log(req.body);
    const blogs = await BlogModel.find()
      .populate("author")
      .populate("comments");
    res.json(blogs);
  } catch (error) {
    next(error); // Gửi lỗi đến middleware xử lý lỗi (nếu có)
  }
};

module.exports = { getBlogList };
