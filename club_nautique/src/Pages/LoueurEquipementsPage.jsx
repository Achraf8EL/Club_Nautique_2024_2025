import React, { useState, useEffect } from "react";
import "./CSS/LoueurEquipementsPage.css";

const LoueurEquipementsPage = () => {
  const [equipements, setEquipements] = useState([]);

  // Récupérer les équipements depuis le backend
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/loueur/equipements");
        if (response.ok) {
          const data = await response.json();
          setEquipements(data);
        } else {
          console.error("Erreur lors de la récupération des équipements :", response.statusText);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements :", error);
      }
    };

    fetchEquipements();
  }, []);

  // Mettre à jour le statut d'un équipement dans la base de données
  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`http://localhost:5001/api/loueur/equipements/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ statut: newStatus }),
      });
      if (response.ok) {
        setEquipements(
          equipements.map((eq) =>
            eq.noequipement === id ? { ...eq, statut: newStatus, confirmed: false } : eq
          )
        );
      } else {
        console.error("Erreur lors de la mise à jour :", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du statut :", error);
    }
  };

  // Confirmer le statut dans l'état local (sans interaction avec le backend)
  const confirmStatus = (id) => {
    setEquipements(
      equipements.map((eq) =>
        eq.noequipement === id ? { ...eq, confirmed: true } : eq
      )
    );
    alert(`État de "${equipements.find((eq) => eq.noequipement === id).type_equipement}" confirmé !`);
  };

  return (
    <div className="equipements-container">
      <h1>Déclarer l'État des Matériels</h1>
      <ul>
        {equipements.map((eq) => (
          <li key={eq.noequipement} className="equipement-item">
            <span>
              <strong>ID :</strong> {eq.noequipement} - <strong>Type :</strong> {eq.type_equipement} - 
              <strong> Statut :</strong>
            </span>
            <select
              value={eq.statut}
              onChange={(e) => updateStatus(eq.noequipement, e.target.value)}
            >
              <option value="fonctionnel">Fonctionnel</option>
              <option value="en panne">En panne</option>
              <option value="hors service">Hors service</option>
            </select>
            <button
              className="confirm-button"
              onClick={() => confirmStatus(eq.noequipement)}
              disabled={eq.confirmed}
            >
              {eq.confirmed ? "Confirmé" : "Confirmer"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoueurEquipementsPage;
