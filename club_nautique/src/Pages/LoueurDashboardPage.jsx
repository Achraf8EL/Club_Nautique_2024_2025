import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CSS/LoueurDashboardPage.css";

const LoueurDashboardPage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token de localStorage ou autre méthode de stockage
    localStorage.removeItem("loueurToken");

    // Rediriger vers la page de connexion
    navigate("/loueur/login");
  };

  return (
    <div className="dashboard-container">
      <h1>Tableau de Bord Loueur</h1>
      <div className="dashboard-links">
        <Link to="/loueur/cours" className="dashboard-card">Proposer des Cours</Link>
        <Link to="/loueur/clients" className="dashboard-card">Liste des Clients</Link>
        <Link to="/loueur/equipements" className="dashboard-card">État des Matériels</Link>
      </div>
      <button className="logout-button" onClick={handleLogout}>
        Déconnexion
      </button>
    </div>
  );
};

export default LoueurDashboardPage;
