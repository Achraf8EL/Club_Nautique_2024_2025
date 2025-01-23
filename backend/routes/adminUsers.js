const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Récupérer tous les utilisateurs
router.get("/", async (req, res) => {
  try {
    const query = `
      SELECT id_client, nom, prenom, email, numero_tel, type
      FROM Client;
    `;
    const result = await pool.query(query);
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

// Supprimer un utilisateur
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const query = `DELETE FROM Client WHERE id_client = $1;`;
    await pool.query(query, [id]);
    res.status(204).send();
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
