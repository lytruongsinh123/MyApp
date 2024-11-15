// models/Comment.js
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/nodejs");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    postId: {
      type: Schema.Types.ObjectId,
      ref: "blog",
      required: false,
    },
    author: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    image: {
      type: String,
      require: false,
    },
    replies: [
      {
        type: Schema.Types.ObjectId,
        ref: "comment",
      },
    ], // Mảng chứa các comment con
  },
  {
    collection: "Comments",
  }
);

const CommentModel = mongoose.model("comment", CommentSchema);
module.exports = CommentModel;
