const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Récupérer toutes les demandes de location
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT l.id_location, l.status, l.date_location, e.type_equipement, c.nom AS client_nom, c.prenom AS client_prenom
      FROM Location l
      JOIN Equipement e ON l.noequipement = e.noequipement
      JOIN Client c ON l.id_client = c.id_client
      WHERE l.status IN ('En attente', 'Confirmée')
      ORDER BY l.date_location DESC;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des locations :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Accepter une demande de location
router.put("/accept/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      UPDATE Location
      SET status = 'Confirmée'
      WHERE id_location = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Location introuvable." });
    }

    res.status(200).json({ message: "Demande acceptée.", location: result.rows[0] });
  } catch (error) {
    console.error("Erreur lors de l'acceptation de la demande :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Refuser une demande de location
router.put("/reject/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
      UPDATE Location
      SET status = 'Refusée'
      WHERE id_location = $1
      RETURNING *;
    `;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Location introuvable." });
    }

    res.status(200).json({ message: "Demande refusée.", location: result.rows[0] });
  } catch (error) {
    console.error("Erreur lors du refus de la demande :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
