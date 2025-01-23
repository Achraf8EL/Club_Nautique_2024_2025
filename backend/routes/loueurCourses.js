const express = require("express");
const pool = require("../config/db"); // Assurez-vous que la configuration de la base est correcte
const router = express.Router();

// Récupérer les cours disponibles
router.get("/available", async (req, res) => {
  try {
    const query = `
      SELECT c.id_cours, c.date, c.heure, c.niveau, c.duree, 
             e.nom AS moniteur, COUNT(cc.id_client) AS nb_apprenants
      FROM Cours c
      LEFT JOIN Employe e ON c.id_moniteur = e.id_employe
      LEFT JOIN ClientCours cc ON c.id_cours = cc.id_cours
      WHERE c.date >= CURRENT_DATE
      GROUP BY c.id_cours, e.nom
      HAVING COUNT(cc.id_client) < 10; -- Maximum 10 apprenants
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des cours disponibles :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Ajouter un cours (proposé par un loueur)
router.post("/", async (req, res) => {
  const { date, heure, niveau, duree, id_moniteur } = req.body;

  if (!date || !heure || !niveau || !duree || !id_moniteur) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    const query = `
      INSERT INTO Cours (date, heure, niveau, duree, id_moniteur)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [date, heure, niveau, duree, id_moniteur]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un cours :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Inscription à un cours
router.post("/register", async (req, res) => {
  const { clientId, courseId } = req.body;

  if (!clientId || !courseId) {
    return res.status(400).json({ error: "Client ID et Course ID sont requis." });
  }

  try {
    const query = `
      INSERT INTO ClientCours (id_client, id_cours, date_inscription)
      VALUES ($1, $2, CURRENT_DATE);
    `;
    await pool.query(query, [clientId, courseId]);
    res.status(201).json({ message: "Inscription réussie !" });
  } catch (error) {
    console.error("Erreur lors de l'inscription :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
