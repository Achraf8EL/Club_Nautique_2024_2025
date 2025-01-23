import React, { useState } from "react";

const LoueurSignUpPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5001/api/loueur/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message);
        setError("");
      } else {
        setError(data.error || "Erreur lors de l'inscription.");
        setMessage("");
      }
    } catch (error) {
      console.error("Erreur serveur :", error);
      setError("Erreur serveur. Veuillez réessayer plus tard.");
      setMessage("");
    }
  };

  return (
    <div className="signup-container">
      <h2>Créer un Compte Loueur</h2>
      <form onSubmit={handleSignUp} className="signup-form">
        <div className="form-group">
          <label htmlFor="username">Nom d'utilisateur :</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Mot de passe :</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {message && <p className="success-message">{message}</p>}
        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="signup-button">Créer un compte</button>
      </form>
    </div>
  );
};

export default LoueurSignUpPage;
