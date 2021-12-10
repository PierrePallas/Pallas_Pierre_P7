const jwt = require("jsonwebtoken");
const dbConfig = require("../config/db");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.RANDOM_TOKEN_SECRET);
    const { userId } = decodedToken;
    let db = dbConfig.getDb();
    const sql = `SELECT user_id FROM users WHERE user_id = ${userId}`;
    db.query(sql, (err, result) => {
      if (err) res.status(204).json(err);
      else {
        next();
      }
    });
  } catch (err) {
    res.status(401).json({ message: "Unauthorized" });
  }
};
