const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Route pour récupérer les cours et locations d'un client
router.get("/:clientId", async (req, res) => {
  const { clientId } = req.params;

  try {
    const coursesQuery = `
      SELECT c.id_cours AS id, c.niveau AS name, c.date, c.heure AS time, cc.status
      FROM ClientCours cc
      JOIN Cours c ON cc.id_cours = c.id_cours
      WHERE cc.id_client = $1
      ORDER BY c.date ASC;
    `;
    const locationsQuery = `
      SELECT l.id_location AS id, e.type_equipement AS material, l.date_location AS date, l.status
      FROM Location l
      JOIN Equipement e ON l.noequipement = e.noequipement
      WHERE l.id_client = $1
      ORDER BY l.date_location ASC;
    `;

    const [coursesResult, locationsResult] = await Promise.all([
      pool.query(coursesQuery, [clientId]),
      pool.query(locationsQuery, [clientId]),
    ]);

    res.status(200).json({
      courses: coursesResult.rows,
      locations: locationsResult.rows,
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des plannings :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
