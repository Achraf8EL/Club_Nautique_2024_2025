const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  try {
    const query = `
      INSERT INTO ContactMessages (name, email, subject, message, date_submitted)
      VALUES ($1, $2, $3, $4, NOW())
    `;
    await pool.query(query, [name, email, subject, message]);
    res.status(201).json({ message: "Message envoyé avec succès." });
  } catch (error) {
    console.error("Erreur lors de l'envoi du message :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});
console.log("Données reçues :", req.body);


module.exports = router;
