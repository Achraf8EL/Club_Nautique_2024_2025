const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Récupérer les cours assignés à un moniteur
router.get("/:moniteurId", async (req, res) => {
    const { moniteurId } = req.params;
  
    // Validation de l'ID du moniteur
    if (!moniteurId || isNaN(parseInt(moniteurId))) {
      return res.status(400).json({ error: "ID du moniteur invalide ou manquant." });
    }
  
    try {
      const query = `
        SELECT 
          c.id_cours, 
          c.date, 
          c.heure, 
          c.niveau, 
          c.presence_moniteur, 
          ARRAY_AGG(cl.nom) AS clients
        FROM Cours c
        LEFT JOIN ClientCours cc ON c.id_cours = cc.id_cours
        LEFT JOIN Client cl ON cc.id_client = cl.id_client
        WHERE c.id_moniteur = $1
        GROUP BY c.id_cours, c.date, c.heure, c.niveau, c.presence_moniteur;
      `;
      const result = await pool.query(query, [moniteurId]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  
// Confirmer ou refuser la présence du moniteur
router.put("/:id/presence", async (req, res) => {
    const { id } = req.params;
    const { presence } = req.body;
  
    try {
      const query = `
        UPDATE Cours
        SET presence_moniteur = $1
        WHERE id_cours = $2
        RETURNING *;
      `;
      const result = await pool.query(query, [presence, id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Cours introuvable." });
      }
  
      res.status(200).json({ message: "Présence mise à jour avec succès.", course: result.rows[0] });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la présence :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  
router.get("/:id", async (req, res) => {
    const { id } = req.params; // ID du moniteur
  
    try {
      const query = `
        SELECT 
          c.id_cours, 
          c.date, 
          c.heure AS time, 
          c.niveau AS course, 
          c.presence_moniteur AS status, 
          ARRAY_AGG(cl.nom) AS clients
        FROM Cours c
        LEFT JOIN ClientCours cc ON c.id_cours = cc.id_cours
        LEFT JOIN Client cl ON cc.id_client = cl.id_client
        WHERE c.id_moniteur = $1
        GROUP BY c.id_cours, c.date, c.heure, c.niveau, c.presence_moniteur;
      `;
      const result = await pool.query(query, [id]);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  

module.exports = router;
