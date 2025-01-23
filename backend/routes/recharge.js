const express = require("express");
const router = express.Router();
const pool = require("../config/db");

router.post("/recharge", async (req, res) => {
  const { clientId, forfaitId } = req.body;

  if (!clientId || !forfaitId || isNaN(clientId) || isNaN(forfaitId)) {
    return res.status(400).json({ error: "Client ID et Forfait ID doivent être valides." });
  }

  try {
    let seancesToAdd = 0;
    switch (forfaitId) {
      case 1:
        seancesToAdd = 1;
        break;
      case 2:
        seancesToAdd = 2;
        break;
      case 3:
        seancesToAdd = 5;
        break;
      default:
        return res.status(400).json({ error: "Forfait ID invalide." });
    }

    const updateQuery = `
      INSERT INTO ClientForfait (id_client, id_forfait, seances_restantes)
      VALUES ($1, $2, $3)
      ON CONFLICT (id_client, id_forfait)
      DO UPDATE SET seances_restantes = ClientForfait.seances_restantes + EXCLUDED.seances_restantes
      RETURNING *;
    `;

    const result = await pool.query(updateQuery, [clientId, forfaitId, seancesToAdd]);
    res.status(200).json({
      message: "Recharge réussie !",
      data: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de la recharge :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});



module.exports = router;
