import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CSS/LoueurLoginPage.css';

const LoueurLoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/loueur/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      console.log("Données envoyées :", { username, password });

      const data = await response.json();

      if (response.ok) {
        console.log('Connexion réussie:', data);
        localStorage.setItem('token', data.token);
        navigate('/loueur/dashboard'); // Redirection après connexion réussie
      } else {
        console.error('Erreur API:', data.message);
        setError(data.message || 'Erreur de connexion.');
      }
    } catch (err) {
      console.error('Erreur réseau:', err.message);
      setError('Erreur du serveur. Veuillez réessayer plus tard.');
    }
  };

  return (
    <div className="loueur-login-container">
      <h2>Connexion Loueur</h2>
      <form onSubmit={handleLogin} className="loueur-login-form">
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

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="login-button">Se connecter</button>
      </form>
    </div>
  );
};

export default LoueurLoginPage;
