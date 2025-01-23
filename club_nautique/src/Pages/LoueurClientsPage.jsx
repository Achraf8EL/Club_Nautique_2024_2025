import React, { useState, useEffect } from "react";
import "./CSS/LoueurClientsPage.css";

const LoueurClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/loueur/clients");
      if (response.ok) {
        const data = await response.json();
        setClients(data);
      } else {
        console.error("Erreur lors de la récupération des clients :", response.statusText);
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des clients :", error);
    }
  };

  return (
    <div className="clients-container">
      <h1>Liste des Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id_client}>
            {client.nom} {client.prenom} - Niveau : {client.niveau}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LoueurClientsPage;
