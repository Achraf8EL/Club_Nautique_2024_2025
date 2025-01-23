const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Récupérer tous les équipements
router.get("/equipements", async (req, res) => {
  try {
    const query = `
      SELECT noequipement, type_equipement, statut
      FROM Equipement;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des équipements :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Mettre à jour le statut d'un équipement
router.put("/equipements/:id", async (req, res) => {
  const { id } = req.params;
  const { statut } = req.body;

  if (!statut) {
    return res.status(400).json({ error: "Le statut est requis." });
  }

  try {
    const query = `
      UPDATE Equipement
      SET statut = $1
      WHERE noequipement = $2
      RETURNING *;
    `;
    const result = await pool.query(query, [statut, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Équipement introuvable." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
