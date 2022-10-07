require("dotenv").config();
const express = require("express");
const PORT = process.env.PORT || 4000;
const cors = require("cors");

const { dbConnect } = require("./modules/config/dbConnect");
const { authRouter } = require("./modules/users/auth.route");
const { postRouter } = require("./modules/posts/posts.route");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res
    .status(200)
    .json({ msg: "Welcome to Bint Blog. Kindly use/posts to get all posts" });
});
app.use("/auth", authRouter);
app.use("/posts", postRouter);
app.use((error, req, res, next) => {
  res
    .status(error.status || 500)
    .json({ error: error.message || "Internal server error" });
});

const start = async () => {
  await dbConnect();

  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
};
start();
