const { getAllCourses, reserveCourse } = require("../models/courseModel");

// Récupérer tous les cours
const getCourses = async (req, res) => {
  try {
    const courses = await getAllCourses();
    res.json(courses);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur serveur" });
  }
};

// Réserver un cours
const reserveCourseHandler = async (req, res) => {
  const { courseId, clientId } = req.body;

  try {
    await reserveCourse(courseId, clientId);
    res.json({ message: "Réservation réussie !" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Erreur lors de la réservation" });
  }
};

module.exports = { getCourses, reserveCourseHandler };
