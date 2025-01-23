const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// Route pour récupérer tous les forfaits
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Forfait");
    res.json(result.rows);
  } catch (err) {
    console.error("Erreur lors de la récupération des forfaits :", err);
    res.status(500).json({ error: "Erreur lors de la récupération des forfaits." });
  }
});

module.exports = router;
// Route pour acheter un forfait
router.post("/purchase", async (req, res) => {
  const { clientId, forfaitId } = req.body;

  if (!clientId || !forfaitId) {
    return res.status(400).json({ error: "Client ID et Forfait ID sont requis." });
  }

  try {
    let seancesToAdd = 0;
    if (forfaitId === 1) seancesToAdd = 1;
    else if (forfaitId === 2) seancesToAdd = 2;
    else if (forfaitId === 5) seancesToAdd = 5;

    const query = `
      INSERT INTO ClientForfait (id_client, id_forfait, seances_restantes)
      VALUES ($1, $2, $3)
      ON CONFLICT (id_client, id_forfait)
      DO UPDATE SET seances_restantes = ClientForfait.seances_restantes + EXCLUDED.seances_restantes
      RETURNING *;
    `;
    const result = await pool.query(query, [clientId, forfaitId, seancesToAdd]);

    res.status(200).json({
      message: "Achat de forfait réussi !",
      forfait: result.rows[0],
    });
  } catch (error) {
    console.error("Erreur lors de l'achat de forfait :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

  
  
  
  router.get("/", (req, res) => {
    // Logique pour récupérer les forfaits
    res.status(200).json([
      { id: 1, type: "1 séance", prix: 25 },
      { id: 2, type: "2 séances", prix: 42 },
      { id: 3, type: "5 séances", prix: 100 },
    ]);
  });

router.post("/buy", async (req, res) => {
  const { clientId, forfaitId } = req.body;

  if (!clientId || !forfaitId) {
    return res.status(400).json({ error: "Client ID et Forfait ID sont obligatoires." });
  }

  try {
    // Déterminer le nombre de séances restantes
    let seancesRestantes;
    if (forfaitId === 1) {
      seancesRestantes = 1;
    } else if (forfaitId === 2) {
      seancesRestantes = 2;
    } else if (forfaitId === 5) {
      seancesRestantes = 5;
    } else {
      return res.status(400).json({ error: "Forfait ID invalide." });
    }

    // Insérer le forfait dans la base de données
    const query = `
      INSERT INTO ClientForfait (id_client, id_forfait, seances_restantes)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;
    const result = await pool.query(query, [clientId, forfaitId, seancesRestantes]);

    // Répondre avec les détails du forfait acheté
    res.status(201).json({
      message: "Forfait acheté avec succès.",
      forfait: result.rows[0],
    });
  } catch (err) {
    console.error("Erreur lors de l'achat du forfait :", err);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});


router.get("/:clientId", async (req, res) => {
  console.log("Paramètre reçu :", req.params.clientId); // Affiche le paramètre reçu

  const { clientId } = req.params;

  if (isNaN(clientId)) {
    console.log("Erreur : ID client invalide");
    return res.status(400).json({ error: "ID client invalide." });
  }

  try {
    const query = `
      SELECT cf.id_forfait, f.type_forfait, cf.seances_restantes
      FROM ClientForfait cf
      JOIN Forfait f ON cf.id_forfait = f.id_forfait
      WHERE cf.id_client = $1;
    `;
    const result = await pool.query(query, [parseInt(clientId, 10)]);
    console.log("Résultat de la requête :", result.rows); // Affiche le résultat SQL
    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des forfaits :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});




  module.exports = router;
  