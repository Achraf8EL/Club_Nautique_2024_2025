const pool = require("../config/db");

// Récupérer tous les cours
const getAllCourses = async () => {
  const query = `
    SELECT c.id_cours, c.date, c.heure, c.duree, c.niveau, e.nom AS moniteur
    FROM Cours c
    JOIN Employe e ON c.id_moniteur = e.id_employe
  `;
  const result = await pool.query(query);
  return result.rows;
};

// Réserver un cours
const reserveCourse = async (courseId, clientId) => {
  const query = `
    INSERT INTO ClientCours (id_client, id_cours, date_inscription)
    VALUES ($1, $2, CURRENT_DATE)
  `;
  await pool.query(query, [clientId, courseId]);
};

module.exports = { getAllCourses, reserveCourse };
