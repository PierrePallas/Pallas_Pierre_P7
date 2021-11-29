const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.Ctrl");
const auth = require("../middlewares/auth");

// Route récupération utilisateur
router.get("/:id", auth, userCtrl.getOneUser);

// Route récupération photo de profil
// router.get("/image/:id", auth, userCtrl.getProfilPicture); METTRE EN PLACE MULTER ET DOSSIER IMAGE
module.exports = router;
