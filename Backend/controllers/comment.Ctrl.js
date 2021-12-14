const dbConfig = require("../config/db");
const db = dbConfig.getDb();

// Suppression d'un commentaire
exports.deleteComment = (req, res) => {
  const comment_id = req.params.id;
  const sql = `DELETE FROM comments WHERE comments.id = ${comment_id}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Récupération d'un commentaire
exports.getOneComment = (req, res) => {
  const commentId = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.id = ${commentId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Récupération de tous les commentaires
exports.getAllComments = (req, res) => {
  const postId = req.params.id;
  const sql = `SELECT * FROM comments WHERE comments.post_id = ${postId}`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Récupération de la photo de profil
exports.getProfilPicture = (req, res) => {
  const { id: user_id } = req.params;
  const sqlGetUser = `SELECT image_url FROM images WHERE images.user_id = ${user_id} ORDER BY images.image_id desc;`;
  db.query(sqlGetUser, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      throw err;
    }
    res.status(200).json(result);
  });
};

// Création d'un commentaire
exports.createComment = (req, res, next) => {
  const { message, post_id, author_id, author_firstname, author_lastname } =
    req.body;
  const sql = `INSERT INTO comments (id, post_id, author_id, author_firstname, author_lastname, message) VALUES (NULL, ${post_id}, ${author_id}, "${author_firstname}", "${author_lastname}", "${message}")`;
  db.query(sql, (err, result) => {
    if (err) {
      res.status(404).json({ err });
      console.log(err);
      throw err;
    }
    res.status(200).json(result);
  });
};
