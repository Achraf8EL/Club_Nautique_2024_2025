const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const router = express.Router();
const pool = require("../config/db");

const SECRET_KEY = '7f8e8d8bde8f74e9d81a78e31f4cf8457ae92b3c8a67c9458d3c42e6b28e3271c48c492bc7642ea842d83477e90e2191';

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        console.log("Nom d'utilisateur ou mot de passe manquant.");
        return res.status(400).json({ error: "Nom ou mot de passe requis." });
    }

    try {
        const query = `
            SELECT c.mot_de_passe, e.id_employe, e.nom, e.type_employe
            FROM compte c
            JOIN employe e ON c.id_employe = e.id_employe
            WHERE e.nom = $1 AND e.type_employe = 'Moniteur';
        `;
        const result = await pool.query(query, [username]);

        if (result.rowCount === 0) {
            console.log("Moniteur non trouvé :", username);
            return res.status(404).json({ error: "Moniteur non trouvé." });
        }

        const moniteur = result.rows[0];

        console.log("Données du moniteur :", moniteur);

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, moniteur.mot_de_passe);
        console.log("Mot de passe valide :", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Mot de passe incorrect.");
            return res.status(401).json({ error: "Mot de passe incorrect." });
        }

        // Génération du token JWT
        const token = jwt.sign(
            { id_employe: moniteur.id_employe, nom: moniteur.nom },
            SECRET_KEY,
            { expiresIn: "1h" }
        );

        console.log("Connexion réussie :", username);
        res.status(200).json({ message: "Connexion réussie", token });
    } catch (error) {
        console.error("Erreur serveur :", error.message);
        res.status(500).json({ error: "Erreur interne du serveur." });
    }
});


module.exports = router;
