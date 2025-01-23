const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../config/db"); // Assurez-vous que pool est correctement configuré
const router = express.Router();

// Route pour changer le mot de passe d'un employé
router.put("/update-password/:8", async (req, res) => {
  const { id } = req.params; // ID de l'employé
  const { newPassword } = req.body; // Nouveau mot de passe transmis dans le body

  if (!newPassword) {
    return res.status(400).json({ error: "Le mot de passe est requis." });
  }

  try {
    // Hash du nouveau mot de passe
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Mise à jour du mot de passe dans la base de données
    const query = `
      UPDATE Employe
      SET mot_de_passe = $1
      WHERE id_employe = $2;
    `;
    const result = await pool.query(query, [hashedPassword, id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Employé non trouvé." });
    }

    res.status(200).json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du mot de passe :", error);
    res.status(500).json({ error: "Erreur interne du serveur." });
  }
});

module.exports = router;
