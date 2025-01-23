const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Route pour récupérer les locations d'un client
router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const query = `
      SELECT l.id_location, e.type_equipement AS material, l.date_location AS date, l.status
      FROM Location l
      JOIN Equipement e ON l.noequipement = e.noequipement
      WHERE l.id_client = $1
      ORDER BY l.date_location DESC;
    `;
    const result = await pool.query(query, [clientId]);

    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des locations :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

router.put("/cancel/:locationId", async (req, res) => {
    const { locationId } = req.params;
    try {
      const query = `
        UPDATE Location
        SET status = 'Annulée (Remboursement en cours)'
        WHERE id_location = $1
        RETURNING *;
      `;
      const result = await pool.query(query, [locationId]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Location introuvable." });
      }
  
      res.status(200).json({ message: "Location annulée.", location: result.rows[0] });
    } catch (error) {
      console.error("Erreur lors de l'annulation de la location :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  router.put("/cancel/:locationId", async (req, res) => {
    const { locationId } = req.params;
    console.log("Annulation de la location ID :", locationId);
    // Reste du code...
  });
  
  

module.exports = router;
