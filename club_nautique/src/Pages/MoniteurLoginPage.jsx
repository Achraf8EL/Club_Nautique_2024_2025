import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/MoniteurLoginPage.css";

const MoniteurLoginPage = () => {
  const [username, setUsername] = useState(""); // Le nom du moniteur
  const [password, setPassword] = useState(""); // Le mot de passe
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!username || !password) {
      setError("Nom et mot de passe requis.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5001/api/moniteur/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        localStorage.setItem("moniteurToken", data.token);
        navigate("/moniteur/dashboard");
      } else {
        setError(data.error || "Erreur lors de la connexion.");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      setError("Erreur serveur. Veuillez réessayer plus tard.");
    }
  };
  console.log("Données envoyées :", { username, password });


  return (
    <div className="login-container">
      <h2>Connexion Moniteur</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="text"
          placeholder="Nom"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default MoniteurLoginPage;
