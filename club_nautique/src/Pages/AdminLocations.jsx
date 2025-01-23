import React, { useState, useEffect } from "react";
import "../Pages/CSS/AdminLocations.css";

const AdminLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/locations");
      if (response.ok) {
        const data = await response.json();
        setLocations(data);
      } else {
        console.error("Erreur lors de la récupération des locations :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des locations :", error);
    }
  };

  const updateLocationStatus = async (id, action) => {
    try {
      const url = `http://localhost:5001/api/admin/locations/${action}/${id}`;
      const response = await fetch(url, {
        method: "PUT",
      });

      if (response.ok) {
        fetchLocations(); // Rafraîchir les données
      } else {
        console.error("Erreur lors de la mise à jour de la location :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la location :", error);
    }
  };

  return (
    <div className="admin-locations">
      <h1>Gestion des Locations</h1>
      <div className="location-list">
        {locations.map((location) => (
          <div key={location.id_location} className="location-card">
            <h3>Location ID: {location.id_location}</h3>
            <p>Client: {location.client_nom} {location.client_prenom}</p>
            <p>Équipement: {location.type_equipement}</p>
            <p>Date: {new Date(location.date_location).toLocaleDateString()}</p>
            <p>Statut: {location.status}</p>
            {location.status === "En attente" && (
              <div className="action-buttons">
                <button
                  className="accept-button"
                  onClick={() => updateLocationStatus(location.id_location, "accept")}
                >
                  Accepter
                </button>
                <button
                  className="reject-button"
                  onClick={() => updateLocationStatus(location.id_location, "reject")}
                >
                  Refuser
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLocations;
