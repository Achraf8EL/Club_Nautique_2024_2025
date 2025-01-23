const { Pool } = require("pg");
require("dotenv").config();

// Configuration de la connexion
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Vérification de la connexion
pool.connect()
  .then(() => console.log("Connecté à PostgreSQL avec succès"))
  .catch((err) => console.error("Erreur de connexion à PostgreSQL :", err.stack));

module.exports = pool;
