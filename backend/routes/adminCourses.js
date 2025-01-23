const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Lister tous les cours
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT c.id_cours, c.date, c.heure, c.niveau, c.duree, 
             e.nom AS moniteur, COUNT(cc.id_client) AS nb_apprenants
      FROM Cours c
      LEFT JOIN Employe e ON c.id_moniteur = e.id_employe
      LEFT JOIN ClientCours cc ON c.id_cours = cc.id_cours
      GROUP BY c.id_cours, e.nom;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Ajouter un cours
router.post("/", async (req, res) => {
  const { date, heure, niveau, duree, id_moniteur } = req.body;
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

// Modifier un cours
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { date, heure, niveau, duree, id_moniteur } = req.body;
  try {
    const query = `
      UPDATE Cours
      SET date = $1, heure = $2, niveau = $3, duree = $4, id_moniteur = $5
      WHERE id_cours = $6
      RETURNING *;
    `;
    const result = await pool.query(query, [date, heure, niveau, duree, id_moniteur, id]);
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de la modification du cours :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Supprimer un cours
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM Cours WHERE id_cours = $1;`;
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression du cours :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});
// Route pour récupérer les cours disponibles pour les clients
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
    console.error("Erreur lors de la récupération des cours disponibles :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


module.exports = router;
