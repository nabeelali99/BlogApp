const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const Post = require("./Models/Post");
const dotenv = require("dotenv");

dotenv.config({ path: "../.env" });

const app = express();

const salt = bcrypt.genSaltSync(10);

// env variables

const secret = process.env.SECRET;
const mongodbUrl = process.env.MONGODB_URL;
const PORT = process.env.PORT;

app.use(express.json());

app.use(
  cors({
    origin: "true",
    credentials: true,
    methods: [
      "GET",
      "POST",
      "PUT",
      "DELETE",
      "OPTIONS",
      "PATCH",
      "HEAD",
      "CONNECT",
      "TRACE",
      "LINK",
      "UNLINK",
    ],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "Cookie",
      "X-CSRF-Token",
      "X-Auth-Token",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Credentials",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
      "Access-Control-Allow-Origin",
      "X-Access-Token",
    ],
    accessControlAllowOrigin: "*",
  })
);

app.use(cookieParser());

app.use("/uploads", express.static(__dirname + "/uploads"));

// connect to database

mongoose.connect(mongodbUrl);

// test server

app.get("/test", (req, res) => {
  res.json("Hello World");
});

// register user

app.post("/register", async (req, res) => {
  const { username, password, fullName, email, phone, age } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.hashSync(password, salt),
      fullName,
      email,
      phone,
      age,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

// login user

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  const passOk = bcrypt.compareSync(password, user.password);
  if (passOk) {
    //loggedin
    jwt.sign(
      {
        username,
        id: user._id,
      },
      secret,
      {
        expiresIn: "1h",
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json({
          id: user._id,
          username,
        });
      }
    );
  } else {
    //not logged in
    res.status(400).json("wrong credentials");
  }
});

// get user profile

app.get("/profile", (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, (err, info) => {
    if (err) throw err;
    res.json(info);
  });
});

// logout user

app.post("/logout", (req, res) => {
  res.cookie("token", "").json("Logged Out");
});

// create post

app.post("/post", upload.single("file"), async (req, res) => {
  const { originalname, path } = req.file;
  const parts = originalname.split(".");
  const extension = parts[parts.length - 1];
  const newPath = path + "." + extension;
  fs.renameSync(path, newPath);

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { title, summary, content } = req.body;
    const post = await Post.create({
      title,
      summary,
      content,
      cover: newPath,
      author: info.id,
    });
    res.json(post);
  });
});

// update existing post

app.put("/post", upload.single("file"), async (req, res) => {
  let newPath = null;
  if (req.file) {
    const { originalname, path } = req.file;
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    newPath = path + "." + ext;
    fs.renameSync(path, newPath);
  }

  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const { id, title, summary, content } = req.body;
    const post = await Post.findById(id);
    const isAuthor = JSON.stringify(post.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json("you are not the author");
    }
    await post.updateOne({
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });

    res.json(post);
  });
});

//get all posts

app.get("/post", async (req, res) => {
  res.json(
    await Post.find()
      .populate("author", ["username"])
      .sort({ createdAt: -1 })
      .limit(20)
  );
});

//get single post

app.get("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findById(id).populate("author", ["username"]);
  res.json(post);
});

// like post

app.put("/post/:id/like", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);
  post.likedBy.push(userId);
  post.likes = post.likes + 1;
  await post.save();
  res.json(post);
});

// unlike post

app.put("/post/:id/unlike", async (req, res) => {
  const { id } = req.params;
  const { userId } = req.body;
  const post = await Post.findById(id);
  post.likedBy = post.likedBy.filter((id) => id !== userId);
  post.likes = post.likes - 1;
  await post.save();
  res.json(post);
});

// delete post

app.delete("/post/:id", async (req, res) => {
  const { id } = req.params;
  const post = await Post.findByIdAndDelete(id);
  res.json(post);
});

// profile page

app.get("/profile/:id", async (req, res) => {
  const { id } = req.params;
  const { token } = req.cookies;
  jwt.verify(token, secret, {}, async (err, info) => {
    if (err) throw err;
    const posts = await Post.find({ author: info.id }).populate("author", [
      "username",
    ]);
    const user = await User.findById(id);
    res.json({ user, posts });
  });
});

// listen to port

app.listen(PORT, () => {
  console.log("Server running on port 4000");
});
