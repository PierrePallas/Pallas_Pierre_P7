const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.Ctrl");
const auth = require("../middlewares/auth");

// Route récupération de tous les commentaires
router.get("/:id/comments", auth, commentCtrl.getAllComments);

// Route récupération d'un commentaire
router.get("/:id", auth, commentCtrl.getOneComment);

// Route post d'un commentaire
router.post("/:id", auth, commentCtrl.createComment);

// Route suppression d'un commentaire
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
