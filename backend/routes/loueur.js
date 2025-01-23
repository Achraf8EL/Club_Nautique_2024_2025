const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db");
const router = express.Router();
const jwt = require("jsonwebtoken");

const SECRET_KEY = '7f8e8d8bde8f74e9d81a78e31f4cf8457ae92b3c8a67c9458d3c42e6b28e3271c48c492bc7642ea842d83477e90e2191';



router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      console.log("Nom d'utilisateur ou mot de passe manquant.");
      return res.status(400).json({ message: 'Nom d’utilisateur et mot de passe requis.' });
    }
  
    try {
      const result = await pool.query(
        `SELECT c.mot_de_passe, e.id_employe, e.nom, e.type_employe
         FROM compte c
         JOIN employe e ON c.id_employe = e.id_employe
         WHERE e.nom = $1 AND e.type_employe = 'Loueur'`,
        [username]
      );
  
      if (result.rowCount === 0) {
        console.log("Loueur non trouvé :", username);
        return res.status(404).json({ message: "Loueur non trouvé." });
      }
  
      const loueur = result.rows[0];
      console.log("Données du loueur :", loueur);
  
      const isPasswordValid = bcrypt.compareSync(password, loueur.mot_de_passe);
  
      if (!isPasswordValid) {
        console.log("Mot de passe incorrect.");
        return res.status(401).json({ message: 'Mot de passe incorrect.' });
      }
  
      const token = jwt.sign(
        { id_employe: loueur.id_employe, nom: loueur.nom, role: 'Loueur' },
        SECRET_KEY,
        { expiresIn: '1h' }
      );
  
      console.log("Connexion réussie :", username);
      res.status(200).json({ message: 'Connexion réussie', token });
    } catch (err) {
      console.error("Erreur serveur :", err.message);
      res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
  });
  
  // Route pour créer un compte loueur
router.post("/signup", async (req, res) => {
    const { username, password } = req.body;
  
    if (!username || !password) {
      return res.status(400).json({ error: "Nom et mot de passe requis." });
    }
  
    try {
      // Vérifiez si le nom d'utilisateur existe déjà
      const userCheck = await pool.query("SELECT id_employe FROM employe WHERE nom = $1", [username]);
      if (userCheck.rowCount > 0) {
        return res.status(400).json({ error: "Nom d'utilisateur déjà utilisé." });
      }
  
      // Hachage du mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insérez un nouveau loueur dans `employe`
      const result = await pool.query(
        `INSERT INTO employe (nom, prenom, type_employe) VALUES ($1, $2, 'Loueur') RETURNING id_employe`,
        [username, "PrenomTemp"]
      );
  
      const id_employe = result.rows[0].id_employe;
  
      // Insérez les informations dans `compte`
      await pool.query(
        `INSERT INTO compte (id_employe, mot_de_passe) VALUES ($1, $2)`,
        [id_employe, hashedPassword]
      );
  
      res.status(201).json({ message: "Compte créé avec succès !" });
    } catch (error) {
      console.error("Erreur lors de la création du compte :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  module.exports = router;
