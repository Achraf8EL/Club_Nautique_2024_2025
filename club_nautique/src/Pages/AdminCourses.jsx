import React, { useState, useEffect } from "react";
import "../Pages/CSS/AdminCourses.css";

const AdminCourses = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    date: "",
    heure: "",
    niveau: "Debutant",
    duree: "1:30:00",
    id_moniteur: "",
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours :", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCourse({ ...newCourse, [name]: value });
  };

  const addCourse = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/admin/courses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCourse),
      });
      if (response.ok) {
        fetchCourses();
        setNewCourse({
          date: "",
          heure: "",
          niveau: "Debutant",
          duree: "1:30:00",
          id_moniteur: "",
        });
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un cours :", error);
    }
  };

  const deleteCourse = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/admin/courses/${id}`, {
        method: "DELETE",
      });
      fetchCourses();
    } catch (error) {
      console.error("Erreur lors de la suppression du cours :", error);
    }
  };

  return (
    <div className="admin-courses">
      <h1>Gestion des Cours</h1>
      <form onSubmit={addCourse} className="add-course-form">
        <h2>Ajouter un Cours</h2>
        <label>
          Date :
          <input
            type="date"
            name="date"
            value={newCourse.date}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Heure :
          <input
            type="time"
            name="heure"
            value={newCourse.heure}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Niveau :
          <select
            name="niveau"
            value={newCourse.niveau}
            onChange={handleInputChange}
          >
            <option value="Debutant">Débutant</option>
            <option value="Sportif">Sportif</option>
          </select>
        </label>
        <label>
          Moniteur (ID) :
          <input
            type="text"
            name="id_moniteur"
            value={newCourse.id_moniteur}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Ajouter</button>
      </form>
      <div className="course-list">
        <h2>Liste des Cours</h2>
        {courses.map((course) => (
          <div key={course.id_cours} className="course-card">
            <h3>{course.niveau}</h3>
            <p>Date : {new Date(course.date).toLocaleDateString()}</p>
            <p>Heure : {course.heure.slice(0, 5)}</p>
            <p>Moniteur : {course.moniteur}</p>
            <p>Apprenants : {course.nb_apprenants}/10</p>
            <button onClick={() => deleteCourse(course.id_cours)}>Supprimer</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminCourses;
