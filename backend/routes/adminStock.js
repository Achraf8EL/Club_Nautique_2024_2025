const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Récupérer tous les équipements
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT noEquipement, type_equipement, disponibilite, quantite_stock, statut
      FROM Equipement;
    `;
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des équipements :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Ajouter un équipement
router.post("/", async (req, res) => {
  const { type_equipement, disponibilite, quantite_stock, statut } = req.body;

  if (!type_equipement || quantite_stock === undefined || !statut) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const query = `
      INSERT INTO Equipement (type_equipement, disponibilite, quantite_stock, statut)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      type_equipement,
      disponibilite,
      quantite_stock,
      statut,
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un équipement :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Mettre à jour un équipement
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { disponibilite, quantite_stock, statut } = req.body;

  if (quantite_stock === undefined || !statut) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const query = `
      UPDATE Equipement
      SET disponibilite = $1, quantite_stock = $2, statut = $3
      WHERE noEquipement = $4
      RETURNING *;
    `;
    const result = await pool.query(query, [
      disponibilite,
      quantite_stock,
      statut,
      id,
    ]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Équipement introuvable." });
    }

    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'équipement :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Supprimer un équipement
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const query = `DELETE FROM Equipement WHERE noEquipement = $1;`;
    const result = await pool.query(query, [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Équipement introuvable." });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipement :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Ajouter un équipement
router.post("/", async (req, res) => {
  const { type_equipement, disponibilite, quantite_stock, statut, quantite_max } = req.body;
  try {
    const query = `
      INSERT INTO Equipement (type_equipement, disponibilite, quantite_stock, statut, quantite_max)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `;
    const result = await pool.query(query, [
      type_equipement,
      disponibilite,
      quantite_stock,
      statut,
      quantite_max || 10, // Valeur par défaut : 10
    ]);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erreur lors de l'ajout d'un équipement :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


module.exports = router;
