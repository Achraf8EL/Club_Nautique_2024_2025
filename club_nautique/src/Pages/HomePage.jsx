import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../Context/AuthContext"; // Import du contexte
import "./CSS/HomePage.css";

const HomePage = () => {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div>
      <section className="section">
        <h2>Bienvenue au Club Nautique</h2>
        <p>Découvrez notre histoire, nos activités, et nos cours.</p>
        <p>Rejoignez-nous dès aujourd'hui pour des cours et des activités nautiques passionnants !</p>
        {!isAuthenticated ? (
          <>
            
            {/* 
  - Le premier lien redirige l'utilisateur vers la page de connexion ("/login").
  - Le deuxième lien redirige l'utilisateur vers la page d'inscription ("/signup").
  - La classe "nav-link" est utilisée pour appliquer un style uniforme aux liens.
  - "link-separator" est une classe CSS probablement utilisée pour ajouter une séparation visuelle entre les deux liens.
  <Link to="/signup">
              <button>S'inscrire</button>
            </Link>
*/}
            <Link to="/login">
              <button>Se connecter</button>
            </Link>
          </>
        ) : (
          <button onClick={logout}>Se déconnecter</button>
        )}
      </section>

      <section className="section">
        <h2>Nos sections principales :</h2>
        <div className="sections-grid">
          <Link to="/cours" className="section-card cours">
            <div className="overlay">
              <h3>Cours</h3>
            </div>
          </Link>
          <Link to="/locations" className="section-card locations">
            <div className="overlay">
              <h3>Locations</h3>
            </div>
          </Link>
          <Link to="/inscription" className="section-card inscription">
            <div className="overlay">
              <h3>Inscription</h3>
            </div>
          </Link>
          <Link to="/contact" className="section-card contact">
            <div className="overlay">
              <h3>Contact</h3>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
