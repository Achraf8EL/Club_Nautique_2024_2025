const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../config/db");

router.get("/equipements", async (req, res) => {
    try {
      const query = "SELECT id, name, status FROM Equipement";
      const result = await pool.query(query);
      res.status(200).json(result.rows);
    } catch (error) {
      console.error("Erreur lors de la récupération des équipements :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
  router.put("/equipements/:id", async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
  
    try {
      const query = "UPDATE Equipement SET status = $1 WHERE id = $2 RETURNING *";
      const result = await pool.query(query, [status, id]);
  
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Équipement introuvable." });
      }
  
      res.status(200).json({ message: "État mis à jour avec succès.", equipement: result.rows[0] });
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'état :", error);
      res.status(500).json({ error: "Erreur interne du serveur." });
    }
  });
    
  module.exports = router;
