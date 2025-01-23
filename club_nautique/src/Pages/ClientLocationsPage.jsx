import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/ClientLocationsPage.css";

const ClientLocationsPage = () => {
  const [locations, setLocations] = useState([]);
  const [courses, setCourses] = useState([]); // Ajout des réservations de cours
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("clientToken");
      const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;

      if (!clientId) {
        alert("Vous devez être connecté pour consulter vos réservations.");
        navigate("/login");
        return;
      }

      try {
        // Récupérer les locations d'équipements
        const locationsResponse = await fetch(
          `http://localhost:5001/api/client-locations/${clientId}`
        );
        if (locationsResponse.ok) {
          const locationsData = await locationsResponse.json();
          setLocations(locationsData);
        } else {
          console.error(
            "Erreur lors de la récupération des locations :",
            locationsResponse.statusText
          );
        }

        // Récupérer les réservations de cours
        const coursesResponse = await fetch(
          `http://localhost:5001/api/client-courses/${clientId}`
        );
        if (coursesResponse.ok) {
          const coursesData = await coursesResponse.json();
          setCourses(coursesData);
        } else {
          console.error(
            "Erreur lors de la récupération des cours :",
            coursesResponse.statusText
          );
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchData();
  }, [navigate]);

  const cancelLocation = async (locationId) => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/client-locations/cancel/${locationId}`,
        {
          method: "PUT",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erreur lors de l'annulation :", errorData.error);
        return;
      }

      alert("Location annulée avec succès.");
      setLocations((prevLocations) =>
        prevLocations.map((loc) =>
          loc.id === locationId
            ? { ...loc, status: "Annulée (Remboursement en cours)" }
            : loc
        )
      );
    } catch (error) {
      console.error("Erreur lors de l'annulation :", error);
    }
  };

  return (
    <div className="locations-container">
      <h1>Mes Réservations</h1>
      {message && <p className="message">{message}</p>}

      <h2>Locations d'Équipements</h2>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id_location}>
            <span>
              {loc.material} - {new Date(loc.date).toLocaleDateString()} - Statut :{" "}
              {loc.status}
            </span>
            {loc.status === "En attente" && (
              <button onClick={() => cancelLocation(loc.id_location)}>
                Annuler
              </button>
            )}
          </li>
        ))}
      </ul>

      <h2>Réservations de Cours</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id_reservation}>
            <span>
              {course.niveau} - {new Date(course.date).toLocaleDateString()} à{" "}
              {course.heure.slice(0, 5)} - Statut : {course.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientLocationsPage;
