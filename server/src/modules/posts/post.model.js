const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    body: {
      type: String,
      required: true,
      minLength: 10,
    },
    published: {
      type: Boolean,
      default: true,
    },
    imageUrl: {
      type: String,
    },
    likedBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
