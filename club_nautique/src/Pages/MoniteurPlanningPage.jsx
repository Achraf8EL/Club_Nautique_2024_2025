import React, { useState } from "react";
import "./CSS/MoniteurPlanningPage.css";

const MoniteurPlanningPage = () => {
  const [planning, setPlanning] = useState([
    {
      id: 1,
      date: "2025-01-21",
      time: "09:30",
      course: "Cours Débutant",
      status: "Présent",
    },
  ]);

  const handleConfirm = (id) => {
    setPlanning((prevPlanning) =>
      prevPlanning.map((slot) =>
        slot.id === id ? { ...slot, status: "Confirmé" } : slot
      )
    );
  };

  const handleCancel = (id) => {
    setPlanning((prevPlanning) =>
      prevPlanning.map((slot) =>
        slot.id === id ? { ...slot, status: "Annulé" } : slot
      )
    );
  };

  return (
    <div className="planning-container">
      <h1>Planning</h1>
      <div className="calendar">
        {planning.map((slot) => (
          <div key={slot.id} className="planning-card">
            <div className="card-header">
              <h2>{slot.course}</h2>
            </div>
            <div className="card-body">
              <p>
                <strong>Date :</strong> {slot.date}
              </p>
              <p>
                <strong>Heure :</strong> {slot.time}
              </p>
              <p>
                <strong>Statut :</strong> {slot.status}
              </p>
              <div className="button-group">
                {slot.status !== "Confirmé" && (
                  <button
                    className="confirm-button"
                    onClick={() => handleConfirm(slot.id)}
                  >
                    Confirmer
                  </button>
                )}
                {slot.status !== "Annulé" && (
                  <button
                    className="cancel-button"
                    onClick={() => handleCancel(slot.id)}
                  >
                    Annuler
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoniteurPlanningPage;
