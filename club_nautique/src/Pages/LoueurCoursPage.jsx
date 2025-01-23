import React, { useState, useEffect } from "react";
import "./CSS/LoueurCoursPage.css";

const LoueurCoursPage = () => {
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({
    niveau: "",
    date: "",
    heure: "",
    duree: "1:30:00", // Durée par défaut
    id_moniteur: "", // Moniteur lié
  });

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/loueur/courses/available");
      if (response.ok) {
        const data = await response.json();
        setCourses(data);
      } else {
        console.error("Erreur lors de la récupération des cours :", response.statusText);
      }
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
      const response = await fetch("http://localhost:5001/api/loueur/courses", {
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
      } else {
        console.error("Erreur lors de l'ajout :", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un cours :", error);
    }
  };

  return (
    <div className="course-form-container">
      <h1>Proposer un Cours</h1>
      <form onSubmit={addCourse}>
        <label>
          Niveau :
          <select
            name="niveau"
            value={newCourse.niveau}
            onChange={handleInputChange}
            required
          >
            <option value="">Choisir...</option>
            <option value="Debutant">Débutant</option>
            <option value="Sportif">Sportif</option>
          </select>
        </label>
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
          Moniteur (ID) :
          <input
            type="text"
            name="id_moniteur"
            value={newCourse.id_moniteur}
            onChange={handleInputChange}
            required
          />
        </label>
        <button type="submit">Proposer</button>
      </form>

      <div className="course-list">
        <h2>Cours Disponibles</h2>
        {courses.map((course) => (
          <div key={course.id_cours} className="course-card">
            <h3>{course.niveau}</h3>
            <p>Date : {new Date(course.date).toLocaleDateString()}</p>
            <p>Heure : {course.heure.slice(0, 5)}</p>
            <p>Moniteur : {course.moniteur}</p>
            <p>Apprenants : {course.nb_apprenants}/10</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoueurCoursPage;
