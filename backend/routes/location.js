const express = require("express");
const pool = require("../config/db");
const router = express.Router();

// Récupérer les équipements disponibles pour la location
// Route pour récupérer les équipements disponibles
router.get("/available", async (req, res) => {
  try {
    const query = `
      SELECT *
      FROM Equipement
      WHERE disponibilite = true AND statut = 'fonctionnel';
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des équipements disponibles :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


// Route pour louer un équipement
router.post("/rent", async (req, res) => {
  const { clientId, equipmentId, duration, heure_debut, heure_fin } = req.body;

  if (!clientId || !equipmentId || !duration || !heure_debut || !heure_fin) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    // Vérifier la disponibilité
    const checkQuery = `
      SELECT quantite_stock
      FROM Equipement
      WHERE noequipement = $1 AND disponibilite = true AND statut = 'fonctionnel';
    `;
    const checkResult = await pool.query(checkQuery, [equipmentId]);

    if (checkResult.rowCount === 0 || checkResult.rows[0].quantite_stock <= 0) {
      return res.status(400).json({ error: "Équipement non disponible." });
    }

    // Enregistrer la location
    const rentQuery = `
      INSERT INTO Location (id_client, noequipement, duree, date_location, heure_debut, heure_fin)
      VALUES ($1, $2, $3, CURRENT_DATE, $4, $5)
      RETURNING *;
    `;
    const rentResult = await pool.query(rentQuery, [
      clientId,
      equipmentId,
      duration,
      heure_debut,
      heure_fin,
    ]);

    // Mise à jour du stock
    const updateStockQuery = `
      UPDATE Equipement
      SET quantite_stock = quantite_stock - 1
      WHERE noequipement = $1 RETURNING quantite_stock;
    `;
    await pool.query(updateStockQuery, [equipmentId]);

    res.status(200).json({
      message: "Location réussie.",
      location: rentResult.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la location :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});
router.post("/rent", async (req, res) => {
  const { clientId, equipmentId, duration, heure_debut, heure_fin } = req.body;

  if (!clientId || !equipmentId || !duration || !heure_debut || !heure_fin) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    // Vérification de la disponibilité et enregistrement comme avant
    // Code identique à ce qui est déjà en place
  } catch (error) {
    console.error("Erreur lors de la location :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


module.exports = router;
