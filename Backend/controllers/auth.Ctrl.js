const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const dbConfig = require("../config/db");

// Enregistrement d'un nouvel utilisateur
exports.signup = async (req, res) => {
  try {
    const { user_password } = req.body;
    // Hashage du mot de passe
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(user_password, salt);

    const user = {
      ...req.body,
      user_password: encryptedPassword,
    };
    const sql = `INSERT INTO users VALUES ( NULL, '${user.user_email}', '${user.user_password}', '${user.user_firstname}', '${user.user_lastname}')`;
    const db = dbConfig.getDb();
    db.query(sql, (err, result) => {
      console.log(err);
      if (!result) {
        res.status(200).json({ message: "Email déjà enregistré !" });
      } else {
        res.status(201).json({ message: "Utilisateur créé !" });
      }
    });
  } catch (err) {
    res.status(200).json({ message: "Erreur lors de l'enregistrement !", err });
  }
};

//   Login d'un utilisateur
exports.login = (req, res) => {
  // Vérification que l'utilisateur est présent dans la base de données
  const { user_email, user_password: clearPassword } = req.body;
  const sql = `SELECT user_firstname, user_lastname, user_password, user_id FROM users WHERE user_email=?`;
  const db = dbConfig.getDb();
  db.query(sql, [user_email], async (err, results) => {
    if (err) {
      return res.status(404).json({ err });
    }

    // Vérification du mot de passe hasher de l'utilisateur
    if (results[0]) {
      try {
        const { user_password: hashedPassword, user_id } = results[0];
        const match = await bcrypt.compare(clearPassword, hashedPassword);
        if (match) {
          // Si le mot de passe correspond, génération du token de connexion
          const maxAge = 1 * (24 * 60 * 60 * 1000);
          const token = jwt.sign({ user_id }, process.env.RANDOM_TOKEN_SECRET, {
            expiresIn: maxAge,
          });

          res.cookie("jwt", token);
          res.status(200).json({
            user: results[0],
            token: jwt.sign(
              { userId: user_id },
              process.env.RANDOM_TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(400).json({ err });
      }
    } else if (results[0] && results[0].active === 0) {
      res.status(200).json({
        error: true,
        message: "Votre compte n'existe plus",
      });
    } else if (!results[0]) {
      res.status(200).json({
        error: true,
        message: "L'adresse email ou le mot de passe ne correspond pas",
      });
    }
  });
};

// Deconnexion d'un utlisateur
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  res.status(200).json("OUT");
};
