const jwt = require("jsonwebtoken");

const authenticateMoniteur = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Accès non autorisé, jeton manquant." });
  }

  try {
    const decoded = jwt.verify(token, "7f8e8d8bde8f74e9d81a78e31f4cf8457ae92b3c8a67c9458d3c42e6b28e3271c48c492bc7642ea842d83477e90e2191");
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Erreur d'authentification :", error);
    res.status(401).json({ error: "Accès non autorisé, jeton invalide." });
  }
};

module.exports = authenticateMoniteur;
