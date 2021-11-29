const express = require("express");
const router = express.Router();
const postCtrl = require("../controllers/post.Ctrl");
const auth = require("../middlewares/auth");
const multerImage = require("../middlewares/multer-config");

// Route récupération des posts
router.get("/", auth, postCtrl.getAllPosts);

// Route récupération d'un seul post
router.get("/:id", auth, postCtrl.getOnePost);

// Route post d'un post
router.post("/", auth, multerImage.single("post_image"), postCtrl.createPost);

// Route suppression d'un post
router.delete("/:id", auth, postCtrl.deleteOnePost);

// Route modification d'un post
router.put("/:id", auth, postCtrl.updatePost);

// Route récupération de l'image
router.get("/image/:id", auth, postCtrl.getImage);

// Route like
router.patch("/:id/like", auth, postCtrl.likeDislikePost);

// Route like d'un utilisateur
router.post("/:id/postLiked", auth, postCtrl.postLikeByUser);

// Router retire du like
router.post("/:id/unlike", auth, postCtrl.countLikes);

module.exports = router;
