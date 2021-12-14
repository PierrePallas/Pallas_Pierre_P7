const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.Ctrl");
const auth = require("../middlewares/auth");
const multerImage = require("../middlewares/multer-config");
// Route récupération utilisateur
router.get("/:id", userCtrl.getOneUser);

// Route récupération photo de profil
router.get("/image/:id", userCtrl.getProfilPicture);

// Route modification d'un utilisateur
router.put("/:id", multerImage.single("profil_image"), userCtrl.updateOneUser);

// Route suppression d'un utlisateur
router.delete("/:id", userCtrl.deleteOneUser);

module.exports = router;
