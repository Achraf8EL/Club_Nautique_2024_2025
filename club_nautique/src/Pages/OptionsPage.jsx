import React from "react";
import { useNavigate } from "react-router-dom";
import "../Pages/CSS/OptionsPage.css";
 

const OptionsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="options-page">
      <h1>Bienvenue !</h1>
      <p>Que souhaitez-vous faire ?</p>
      <div className="options-buttons">
        <button onClick={() => navigate("/cours")}>Voir les Cours</button>
        <button onClick={() => navigate("/locations")}>Louer un Matériel</button>
      </div>
    </div>
  );
};

export default OptionsPage;
