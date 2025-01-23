import React, { useState } from "react";
import "./CSS/ClientCoursesPage.css";

const ClientCoursesPage = () => {
  const [courses, setCourses] = useState([
    { id: 1, name: "Cours Débutant", date: "2025-01-20", time: "10:00", level: "Débutant", status: "Inscrit" },
    { id: 2, name: "Cours Sportif", date: "2025-01-22", time: "14:00", level: "Sportif", status: "Disponible" },
  ]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const handleEnroll = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: "Inscrit" } : course
    ));
    alert("Vous êtes inscrit au cours !");
  };

  const handleCancel = (id) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, status: "Disponible" } : course
    ));
    alert("Votre inscription a été annulée.");
  };

  const handleReschedule = (id, newDate, newTime) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, date: newDate, time: newTime } : course
    ));
    alert("Le créneau a été modifié.");
  };

  const handleLevelChange = (id, newLevel) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, level: newLevel } : course
    ));
    alert("La demande de changement de niveau a été envoyée.");
  };

  return (
    <div className="courses-container">
      <h1>Gestion des Cours</h1>
      <ul className="courses-list">
        {courses.map(course => (
          <li key={course.id} className="course-card">
            <h2>{course.name}</h2>
            <p><strong>Date :</strong> {course.date}</p>
            <p><strong>Heure :</strong> {course.time}</p>
            <p><strong>Niveau :</strong> {course.level}</p>
            <p><strong>Status :</strong> {course.status}</p>

            {course.status === "Disponible" && (
              <button onClick={() => handleEnroll(course.id)} className="enroll-button">
                S'inscrire
              </button>
            )}

            {course.status === "Inscrit" && (
              <>
                <button onClick={() => handleCancel(course.id)} className="cancel-button">
                  Annuler
                </button>
                <button onClick={() => setSelectedCourse(course.id)} className="reschedule-button">
                  Modifier le créneau
                </button>
                <button onClick={() => handleLevelChange(course.id, "Sportif")} className="level-change-button">
                  Changer de niveau
                </button>
              </>
            )}
          </li>
        ))}
      </ul>

      {selectedCourse && (
        <div className="reschedule-modal">
          <h3>Modifier le créneau</h3>
          <label>
            Nouvelle date :
            <input type="date" />
          </label>
          <label>
            Nouvelle heure :
            <input type="time" />
          </label>
          <button onClick={() => handleReschedule(selectedCourse, "2025-01-23", "15:00")}>
            Confirmer
          </button>
          <button onClick={() => setSelectedCourse(null)}>Annuler</button>
        </div>
      )}
    </div>
  );
};

export default ClientCoursesPage;
