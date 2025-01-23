import React, { useEffect, useState } from "react";
import "./CSS/ClientPlanningPage.css";

const ClientPlanningPage = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchPlanning = async () => {
      try {
        const token = localStorage.getItem("clientToken");
        const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;

        if (!clientId) {
          alert("Vous devez être connecté pour consulter vos plannings.");
          return;
        }

        const response = await fetch(`http://localhost:5001/api/planning/${clientId}`);
        if (response.ok) {
          const data = await response.json();
          setCourses(data.courses);
        } else {
          console.error("Erreur lors de la récupération des plannings :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des plannings :", error);
      }
    };

    fetchPlanning();
  }, []);

  return (
    <div className="planning-container">
      <h1>Mes Plannings</h1>
      <div>
        <h2>Cours</h2>
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              {course.name} - {course.date} à {course.time} - Statut : {course.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientPlanningPage;
