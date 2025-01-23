const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db'); // Assurez-vous que le chemin vers le fichier db.js est correct
const router = express.Router();

const SECRET_KEY = '7f8e8d8bde8f74e9d81a78e31f4cf8457ae92b3c8a67c9458d3c42e6b28e3271c48c492bc7642ea842d83477e90e2191';

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Extraction des données de la requête
    console.log(`Tentative de connexion : ${username}`);

    if (!username || !password) {
      return res.status(400).json({ message: 'Nom d’utilisateur et mot de passe requis.' });
    }

    // Requête pour vérifier l'utilisateur
    const result = await pool.query(
      `SELECT c.mot_de_passe, p.privilege_gestion
       FROM Compte c
       JOIN Employe e ON c.id_employe = e.id_employe
       JOIN Proprietaire p ON e.id_employe = p.id_employe
       WHERE e.nom = $1`,
      [username]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    const user = result.rows[0];
    const isPasswordValid = bcrypt.compareSync(password, user.mot_de_passe);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Mot de passe incorrect.' });
    }

    if (!user.privilege_gestion) {
      return res.status(403).json({ message: "Accès non autorisé." });
    }

    const token = jwt.sign({ username, role: 'Admin' }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Connexion réussie', token });
  } catch (err) {
    console.error('Erreur serveur :', err.message);
    res.status(500).json({ message: 'Erreur serveur', error: err.message });
  }
});

module.exports = router;
