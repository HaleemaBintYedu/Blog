const router = require("express").Router;
const {
  createPost,
  deletePost,
  getAllPosts,
  getSinglePost,
  updatePost,
} = require("./posts.controller");
const { authRequired } = require("../middlewares/authRequired");

const postRouter = router();

postRouter.route("/").get(getAllPosts).post(authRequired, createPost);
postRouter
  .route("/:postId")
  .get(getSinglePost)
  .patch(authRequired, updatePost)
  .delete(authRequired, deletePost);

module.exports = { postRouter };
