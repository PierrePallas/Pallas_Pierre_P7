const express = require("express");
const auth = require("./middlewares/auth");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

app.use(express.json());
app.use(cookieParser());
app.use("/images", express.static(path.join(__dirname, "images")));

// Routes
const authRoutes = require("./routes/authR");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userR");
app.use("/api/user", userRoutes);

const postRoutes = require("./routes/postR");
app.use("/api/post", postRoutes);

const commentRoutes = require("./routes/commentR");
app.use("/api/comment", commentRoutes);

module.exports = app;
