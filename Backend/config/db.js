const mysql = require("mysql");
require("dotenv").config();

// Connexion à la base de données
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DBNAME,
});
db.connect(function (err) {
  if (err) {
    console.error("Connexion échouée");
    return;
  }

  console.log("connexion réussie");
});

module.exports.getDb = () => {
  return db;
};
