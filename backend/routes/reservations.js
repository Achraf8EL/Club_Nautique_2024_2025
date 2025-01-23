const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Route pour réserver un cours
router.post("/reserve", async (req, res) => {
    const { clientId, courseId } = req.body;
  
    if (!clientId || !courseId || isNaN(clientId) || isNaN(courseId)) {
      return res.status(400).json({ error: "Client ID et Course ID doivent être valides." });
    }
  
    try {
      // Vérifier les séances restantes
      const checkQuery = `
        SELECT seances_restantes FROM ClientForfait
        WHERE id_client = $1 AND seances_restantes > 0 LIMIT 1;
      `;
      const checkResult = await pool.query(checkQuery, [clientId]);
  
      if (checkResult.rowCount === 0) {
        return res.status(400).json({ error: "Aucune séance restante. Rechargez votre forfait." });
      }
  
      // Réserver le cours
      const reserveQuery = `
        INSERT INTO ClientCours (id_client, id_cours, date_inscription)
        VALUES ($1, $2, CURRENT_DATE)
        RETURNING *;
      `;
      await pool.query(reserveQuery, [clientId, courseId]);
  
      // Décrémenter les séances restantes
      const decrementQuery = `
        UPDATE ClientForfait
        SET seances_restantes = seances_restantes - 1
        WHERE id_client = $1 AND seances_restantes > 0;
      `;
      await pool.query(decrementQuery, [clientId]);
  
      res.status(200).json({ message: "Réservation réussie !" });
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  
module.exports = router;
