const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Récupérer les cours filtrés par niveau
router.get("/", async (req, res) => {
  const { level } = req.query;
  try {
    const query = `
      SELECT c.id_cours, c.date, c.heure, c.duree, c.niveau, e.nom AS moniteur, COUNT(cc.id_client) AS nb_apprenants
      FROM Cours c
      LEFT JOIN Employe e ON c.id_moniteur = e.id_employe
      LEFT JOIN ClientCours cc ON c.id_cours = cc.id_cours
      WHERE c.niveau = $1
      GROUP BY c.id_cours, e.nom
      HAVING COUNT(cc.id_client) < 10
    `;
    const result = await pool.query(query, [level]);
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des cours :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Réserver un cours
router.post("/reserve", async (req, res) => {
  const { clientId, courseId } = req.body;

  if (!clientId || !courseId) {
    return res.status(400).json({ error: "Client ID et Course ID sont requis." });
  }

  try {
    const query = `
      INSERT INTO ClientCours (id_client, id_cours, date_inscription, status)
      VALUES ($1, $2, CURRENT_DATE, 'En attente');
    `;
    await pool.query(query, [clientId, courseId]);
    res.status(201).json({ message: "Réservation en attente de validation." });
  } catch (err) {
    console.error("Erreur lors de la réservation :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});
router.get("/client-courses/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const query = `
      SELECT r.id_reservation, c.date, c.heure, c.niveau, r.status
      FROM Reservation r
      JOIN Cours c ON r.id_cours = c.id_cours
      WHERE r.id_client = $1
      ORDER BY c.date ASC, c.heure ASC;
    `;
    const result = await pool.query(query, [clientId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des réservations :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});
router.get("/courses", async (req, res) => {
  const { level } = req.query;

  if (!level) {
    return res.status(400).json({ error: "Le niveau est requis." });
  }

  try {
    const query = `
      SELECT c.id_cours, c.date, c.heure, c.niveau, e.nom AS moniteur, c.nb_apprenants
      FROM Cours c
      JOIN Employe e ON c.id_moniteur = e.id_employe
      WHERE c.niveau = $1
    `;
    const result = await pool.query(query, [level]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


module.exports = router;
