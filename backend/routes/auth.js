const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const pool = require("../config/db");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
  const { nom, prenom, email, numero_tel, piece_identite, motDePasse, id_forfait, type } = req.body;

  if (!nom || !prenom || !email || !numero_tel || !piece_identite || !motDePasse || !id_forfait || !type) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    // Étape 1 : Hachage du mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(motDePasse, saltRounds);

    // Étape 2 : Insertion du client
    const clientQuery = `
      INSERT INTO Client (nom, prenom, email, numero_tel, piece_identite, type)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id_client;
    `;
    const clientValues = [nom, prenom, email, numero_tel, piece_identite, type];
    const clientResult = await pool.query(clientQuery, clientValues);
    const id_client = clientResult.rows[0]?.id_client;

    // Étape 3 : Association au forfait
    const forfaitQuery = `
      INSERT INTO ClientForfait (id_client, id_forfait)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const forfaitResult = await pool.query(forfaitQuery, [id_client, id_forfait]);

    // Étape 4 : Création du compte utilisateur
    const compteQuery = `
      INSERT INTO Compte (mot_de_passe, id_client)
      VALUES ($1, $2)
      RETURNING identifiant;
    `;
    const compteResult = await pool.query(compteQuery, [hashedPassword, id_client]);

    // Réponse réussie
    res.status(201).json({
      message: "Inscription réussie et forfait acheté avec succès.",
      client: clientResult.rows[0],
      forfait: forfaitResult.rows[0],
      compte: compteResult.rows[0],
    });
  } catch (err) {
    console.error("Erreur lors de l'inscription :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Clé secrète pour JWT
const SECRET_KEY = '7f8e8d8bde8f74e9d81a78e31f4cf8457ae92b3c8a67c9458d3c42e6b28e3271c48c492bc7642ea842d83477e90e2191';

// Route de connexion
// Route de connexion
router.post("/login", async (req, res) => {
  console.log("Requête reçue : /login");
  console.log("Headers reçus :", req.headers);
  console.log("Content-Type :", req.headers["content-type"]);
  console.log("Body reçu :", req.body);

  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    console.log("Champs manquants !");
    return res.status(400).json({ error: "Email et mot de passe requis." });
  }

  try {
    const query = `
      SELECT c.mot_de_passe, cl.id_client, cl.nom, cl.prenom
      FROM Compte c
      JOIN Client cl ON c.id_client = cl.id_client
      WHERE cl.email = $1;
    `;
    const result = await pool.query(query, [email]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const user = result.rows[0];
    const isPasswordValid = await bcrypt.compare(motDePasse, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id_client: user.id_client, nom: user.nom, prenom: user.prenom },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Connexion réussie.",
      token,
      client: {
        id_client: user.id_client,
        nom: user.nom,
        prenom: user.prenom,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
