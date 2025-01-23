import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/RoleSelectionPage.css"; // Assurez-vous de styliser cette page

const RoleSelectionPage = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role) => {
    switch (role) {
      case "admin":
        navigate("/admin");
        break;
      case "moniteur":
        navigate("/moniteur/login");
        break;
      case "loueur":
        navigate("/loueur/login");
        break;
      default:
        break;
    }
  };

  return (
    <div className="role-selection-container">
      <h1>Choisissez votre rôle</h1>
      <div className="role-buttons">
        <button onClick={() => handleRoleSelection("admin")}>Administrateur</button>
        <button onClick={() => handleRoleSelection("moniteur")}>Moniteur</button>
        <button onClick={() => handleRoleSelection("loueur")}>Loueur</button>
      </div>
    </div>
  );
};

export default RoleSelectionPage;
