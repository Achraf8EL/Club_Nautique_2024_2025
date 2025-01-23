const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  const { clientId, cardNumber, expiryDate, cvv } = req.body;

  if (!clientId || !cardNumber || !expiryDate || !cvv) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  // Simuler une logique de paiement
  console.log("Paiement reçu pour le client ID :", clientId);
  return res.status(200).json({ message: "Paiement réussi." });
});

module.exports = router;
