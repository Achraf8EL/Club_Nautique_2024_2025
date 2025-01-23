import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Pages/CSS/AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si le token existe
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin"); // Rediriger vers la page de connexion si non connecté
    }
  }, [navigate]);

  const handleLogout = () => {
    // Supprimer le token
    localStorage.removeItem("token");

    // Rediriger vers la page de connexion admin
    navigate("/admin");
  };

  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <h1>Tableau de Bord Admin</h1>
        <button onClick={handleLogout} className="logout-button">
          Déconnexion
        </button>
      </header>

      <div className="dashboard-links">
        <Link to="/admin/courses" className="dashboard-card">
          <h2>Gestion des Cours</h2>
          <p>Planifiez, modifiez et gérez les cours.</p>
        </Link>
        <Link to="/admin/locations" className="dashboard-card">
          <h2>Gestion des Locations</h2>
          <p>Validez ou refusez les demandes de location.</p>
        </Link>
        <Link to="/admin/stock" className="dashboard-card">
          <h2>Gestion du Stock</h2>
          <p>Ajoutez ou supprimez des équipements.</p>
        </Link>
        <Link to="/admin/users" className="dashboard-card">
          <h2>Gestion des Utilisateurs</h2>
          <p>Consultez et gérez les comptes des utilisateurs.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
