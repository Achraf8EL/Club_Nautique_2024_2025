import React, { useState } from "react";
import "./CSS/ClientEquipementsPage.css";

const ClientEquipementsPage = () => {
  const [equipements] = useState([
    { id: 1, name: "Planche à voile", status: "Disponible", price: 25 },
    { id: 2, name: "Catamaran", status: "Disponible", price: 45 },
    { id: 3, name: "Stand-up Paddle", status: "Non disponible", price: 20 },
  ]);

  return (
    <div className="equipements-container">
      <h1>Matériels Disponibles</h1>
      <ul>
        {equipements.map((equip) => (
          <li key={equip.id} className={`equipement-item ${equip.status === "Non disponible" ? "disabled" : ""}`}>
            <span>{equip.name} - <strong>{equip.status}</strong></span>
            <span>Prix : {equip.price}€/h</span>
            <button disabled={equip.status === "Non disponible"}>Louer</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientEquipementsPage;
