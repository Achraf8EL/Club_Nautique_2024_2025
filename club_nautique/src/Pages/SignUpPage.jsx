import React, { useState, useEffect } from "react";
import "../Pages/CSS/SignUpPage.css";
import { useNavigate } from "react-router-dom";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté

  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero_tel: "",
    piece_identite: "",
    motDePasse: "",
    id_forfait: "4", // Forfait par défaut
    type: "Debutant", // Type par défaut
  });

  useEffect(() => {
    // Vérifier si l'utilisateur est déjà connecté
    const token = localStorage.getItem("clientToken");
    if (token) {
      setIsLoggedIn(true); // L'utilisateur est connecté
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    console.log("Données envoyées :", formData);

    try {
      const response = await fetch("http://localhost:5001/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Réponse du serveur :", result);

      if (response.ok) {
        alert("Inscription réussie !");
        navigate("/options"); // Redirige vers la page des options
      } else {
        alert(`Erreur : ${result.error || "Erreur lors de l'inscription"}`);
      }
    } catch (err) {
      console.error("Erreur lors de l'inscription :", err);
      alert("Une erreur s'est produite, veuillez réessayer.");
    }
  };

  if (isLoggedIn) {
    // Afficher un message si l'utilisateur est connecté
    return (
      <div className="signup-page">
        <h1>Vous êtes déjà connecté</h1>
        <p>Vous n'avez pas besoin de vous inscrire. Accédez directement à votre compte ou déconnectez-vous pour créer un nouveau compte.</p>
        <button onClick={() => navigate("/")}>Retour à l'accueil</button>
      </div>
    );
  }

  return (
    <div className="signup-page">
      <h1>Inscription</h1>
      <form onSubmit={handleSignup}>
        <label>
          Nom
          <input
            type="text"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Prénom
          <input
            type="text"
            name="prenom"
            value={formData.prenom}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Numéro de téléphone
          <input
            type="tel"
            name="numero_tel"
            value={formData.numero_tel}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Pièce d'identité
          <input
            type="text"
            name="piece_identite"
            value={formData.piece_identite}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Mot de passe
          <input
            type="password"
            name="motDePasse"
            value={formData.motDePasse}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Type
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
          >
            <option value="Debutant">Débutant</option>
            <option value="Sportif">Sportif</option>
            <option value="Plaisancier">Plaisancier</option>
          </select>
        </label>
        <button type="submit">S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpPage;
