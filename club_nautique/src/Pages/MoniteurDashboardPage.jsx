import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MoniteurDashboardPage.css"; // Assurez-vous de créer un fichier CSS si nécessaire

const MoniteurDashboardPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("moniteurToken");
    if (!token) {
      navigate("/moniteur/login");
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Tableau de Bord Moniteur</h1>
      <div className="links-container">
        
        <button
          className="dashboard-link"
          onClick={() => navigate("/moniteur/planning")}
        >
          Planning et Liste des Clients
        </button>
      </div>
    </div>
  );
};

export default MoniteurDashboardPage;
