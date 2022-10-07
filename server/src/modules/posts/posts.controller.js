const Post = require("./post.model");
const createHttpError = require("http-errors");

// checking if you the one who create the post (verify author)
const verifyAuthor = (req, post) => {
  const { id } = req.user;
  if (post.author !== id) {
    throw createHttpError(403, "You cannot perform this task");
  }
};

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find({ published: true });
    res.status(200).json({ posts });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const { title, body, imageUrl } = req.body;

    const post = await Post.create({
      title,
      body,
      imageUrl,
      author: req.user.id,
    });
    res.status(200).json({ post });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

exports.getSinglePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.findById(postId);
    if (!post) {
      next(createHttpError(404, "Post Not Found"));
    }
    res.status(200).json({ post });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let post = await Post.findById(postId);
    verifyAuthor(req, post);

    post = await Post.findByIdAndUpdate(postId, { ...req.body }, { new: true });
    res.status(200).json({ post });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const { postId } = req.params;
    let post = await Post.findById(postId);
    verifyAuthor(req, post);
    
    await Post.findByIdAndDelete(postId);
    res.status(200).json({ msg: "Post has been deleted successfully" });
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};
