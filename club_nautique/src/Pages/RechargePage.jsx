import React from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/RechargePage.css"; // Assurez-vous que le chemin vers votre CSS est correct

const RechargePage = () => {
  const navigate = useNavigate(); // Hook pour la navigation

  const handleRecharge = async (forfaitId) => {
    const token = localStorage.getItem("clientToken");
    const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;
  
    if (!clientId) {
      alert("Vous devez être connecté pour recharger un forfait.");
      navigate("/login");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/forfaits/recharge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId, forfaitId }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Recharge réussie !");
        navigate("/cours"); // Redirection après recharge
      } else {
        console.error("Erreur :", data.error);
        alert(data.error || "Erreur inconnue");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    }
  };
  
  

  return (
    <div className="recharge-page">
      <h1>Rechargez votre Forfait</h1>
      <div className="forfait-options">
        <div className="forfait-card">
          <h3>1 séance</h3>
          <p>Prix : 25€</p>
          <button onClick={() => navigate("/recharger/payment")}>Payer un Forfait</button>
          </div>
        <div className="forfait-card">
          <h3>2 séances</h3>
          <p>Prix : 42€</p>
          <button onClick={() => navigate("/recharger/payment")}>Payer un Forfait</button>
          </div>
        <div className="forfait-card">
          <h3>5 séances</h3>
          <p>Prix : 100€</p>
          <button onClick={() => navigate("/recharger/payment")}>Payer un Forfait</button>
          </div>
      </div>
    </div>
  );
};

export default RechargePage;
