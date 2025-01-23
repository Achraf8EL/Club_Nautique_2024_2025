import React, { useState } from "react";
import "./CSS/MoniteurPresencePage.css";

const MoniteurPresencePage = () => {
  const [sessions, setSessions] = useState([
    { id: 1, date: "2025-01-20", course: "Cours Débutant", status: "Non confirmé" },
    { id: 2, date: "2025-01-21", course: "Cours Sportif", status: "Non confirmé" },
  ]);

  const updateStatus = (id, status) => {
    setSessions(
      sessions.map((session) =>
        session.id === id ? { ...session, status } : session
      )
    );
  };

  return (
    <div className="presence-container">
      <h1>Confirmation de Présence</h1>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <span>
              {session.course} - {session.date} - {session.status}
            </span>
            <button onClick={() => updateStatus(session.id, "Confirmé")}>
              Confirmer
            </button>
            <button onClick={() => updateStatus(session.id, "Annulé")}>
              Annuler
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoniteurPresencePage;
