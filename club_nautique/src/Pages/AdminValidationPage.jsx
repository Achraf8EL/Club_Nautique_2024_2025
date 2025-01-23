import React, { useState } from "react";
import '../Pages/CSS/AdminValidationPage.css'

const AdminValidationPage = () => {
  const [reservations, setReservations] = useState([
    { id: 1, client: "Achraf", material: "Planche à voile", status: "En attente" },
    { id: 2, client: "El Messaoudi", material: "Catamaran", status: "En attente" },
  ]);

  const validateReservation = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "Validée" } : res
      )
    );
  };

  const cancelReservation = (id) => {
    setReservations(
      reservations.map((res) =>
        res.id === id ? { ...res, status: "Annulée" } : res
      )
    );
  };

  return (
    <div>
      <h1>Validation des Réservations</h1>
      <ul>
        {reservations.map((res) => (
          <li key={res.id}>
            {res.client} a réservé {res.material} - Statut : {res.status}
            <button onClick={() => validateReservation(res.id)}>Valider</button>
            <button onClick={() => cancelReservation(res.id)}>Annuler</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminValidationPage;
