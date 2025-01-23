import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ForfaitStatus = ({ clientId }) => {
  const [forfaits, setForfaits] = useState([]);

  useEffect(() => {
    const fetchForfaits = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/forfaits/${clientId}`);
        const data = await response.json();
        setForfaits(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des forfaits :", error);
      }
    };

    fetchForfaits();
  }, [clientId]);

  return (
    <div className="forfait-status">
      <h2>Mes Forfaits</h2>
      <ul>
        {forfaits.map((forfait) => (
          <li key={forfait.id_forfait}>
            {forfait.type_forfait}: {forfait.seances_restantes} séances restantes
            <Link to="/recharger"> Recharger ?</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ForfaitStatus;
