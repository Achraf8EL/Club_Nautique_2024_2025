const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Récupérer la liste des clients avec leur type de forfait
router.get("/clients", async (req, res) => {
  try {
    const query = `
      SELECT c.id_client, c.nom, c.prenom, c.type AS niveau
      FROM Client c
      LEFT JOIN ClientForfait cf ON c.id_client = cf.id_client;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des clients :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
