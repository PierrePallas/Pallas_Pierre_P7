const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.Ctrl");

// Route enregistrement
router.post("/signup", authCtrl.signup);

// Route de connexion
router.post("/login", authCtrl.login);

// Route de déconnexion
router.post("/logout", authCtrl.logout);

module.exports = router;
