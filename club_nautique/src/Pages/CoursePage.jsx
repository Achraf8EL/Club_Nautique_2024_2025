import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/CSS/CoursePage.css";

const CoursePage = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState("Debutant");
  const [reservationMessage, setReservationMessage] = useState("");

  // Exemple de données fictives pour le forfait
  const [forfaitStatus, setForfaitStatus] = useState({
    typeForfait: "5 séances",
    seancesRestantes: 3,
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("clientToken");
    if (!token) {
      navigate("/login"); // Rediriger vers la page de connexion si non connecté
    }
  }, [navigate]);

  // Récupération des cours disponibles filtrés par niveau
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/api/courses?level=${selectedLevel}`
        );
        if (response.ok) {
          const data = await response.json();
          setCourses(data);
        } else {
          console.error(
            "Erreur lors de la récupération des cours :",
            response.statusText
          );
          setCourses([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des cours :", error);
        setCourses([]);
      }
    };
    fetchCourses();
  }, [selectedLevel]);

  // Gestion de la réservation
  const handleReservation = async (courseId) => {
    const token = localStorage.getItem("clientToken");
    const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;

    if (!token) {
      setReservationMessage("Vous devez être connecté pour réserver un cours.");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch("http://localhost:5001/api/courses/reserve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ clientId, courseId }),
      });

      if (response.ok) {
        setReservationMessage("Réservation réussie !");
      } else {
        const result = await response.json();
        setReservationMessage(result.error || "Erreur lors de la réservation.");
      }
    } catch (error) {
      console.error("Erreur lors de la réservation :", error);
      setReservationMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="course-page">
      <h1>Réserver un cours</h1>

      {/* Section visuelle pour afficher le forfait restant */}
      <div className="forfait-status">
        <h2>Votre Forfait</h2>
        <p><strong>Type de Forfait :</strong> {forfaitStatus.typeForfait}</p>
        <p><strong>Sessions restantes :</strong> {forfaitStatus.seancesRestantes}</p>
        <button className="recharger-button" onClick={() => navigate("/recharger")}>
          Recharger
        </button>
      </div>

      <div className="filter">
        <label htmlFor="level-select">Choisir un niveau :</label>
        <select
          id="level-select"
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
        >
          <option value="Debutant">Débutant</option>
          <option value="Sportif">Sportif</option>
        </select>
      </div>

      <div className="course-list">
        {courses.length > 0 ? (
          courses.map((course) => (
            <div key={course.id_cours} className="course-card">
              <h2>{course.niveau}</h2>
              <p><strong>Date :</strong> {new Date(course.date).toLocaleDateString()}</p>
              <p><strong>Heure :</strong> {course.heure.slice(0, 5)}</p>
              <p><strong>Durée :</strong> {`${course.duree.hours}h ${course.duree.minutes}min`}</p>
              <p><strong>Moniteur :</strong> {course.moniteur}</p>
              <p><strong>Nombre d'apprenants :</strong> {course.nb_apprenants}/10</p>
              {course.nb_apprenants < 10 ? (
                <button onClick={() => handleReservation(course.id_cours)}>Réserver</button>
              ) : (
                <button disabled>Complet</button>
              )}
            </div>
          ))
        ) : (
          <p>Aucun cours disponible pour le niveau sélectionné.</p>
        )}
      </div>

      {reservationMessage && <div className="reservation-message">{reservationMessage}</div>}
    </div>
  );
};

export default CoursePage;
