import React, { useState, useEffect } from "react";
import "./ForfaitsPage.css";

const ForfaitsPage = () => {
  const [forfaits, setForfaits] = useState([]);
  const [selectedForfait, setSelectedForfait] = useState(null);
  const [setClientId] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("clientToken");
    if (!token) {
      navigate("/login"); // Redirige vers la page de connexion si non connecté
    }
  }, [navigate]);
  const token = localStorage.getItem("clientToken");
const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;

// Récupération des forfaits
useEffect(() => {
  if (clientId) {
    const fetchForfaits = async () => {
      try {
        const response = await fetch(`http://localhost:5001/api/forfaits/${clientId}`);
        const data = await response.json();
        setForfaits(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des forfaits :", error);
      }
    };
    fetchForfaits();
  }
}, [clientId]);


  // Récupérer les forfaits depuis le backend
  useEffect(() => {
    const fetchForfaits = async () => {
      try {
        const response = await fetch("http://localhost:5001/api/forfaits");
        const data = await response.json();
        setForfaits(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des forfaits :", error);
      }
    };
    fetchForfaits();
  }, []);

  // Acheter un forfait
  const handlePurchase = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/forfaits/purchase", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clientId, forfaitId: selectedForfait }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Achat réussi !");
        setSelectedForfait(null);
        fetchForfaits(); // Actualiser les forfaits
      } else {
        alert(`Erreur : ${data.error}`);
      }
    } catch (error) {
      console.error("Erreur lors de l'achat :", error);
      alert("Une erreur s'est produite, veuillez réessayer.");
    }
  };
  

  return (
    <div className="forfaits-page">
      <h1>Choisissez un Forfait</h1>
      <div className="forfait-grid">
        {forfaits.map((forfait) => (
          <div key={forfait.id_forfait} className="forfait-card">
            <h2>{forfait.type_forfait}</h2>
            <p><strong>Prix :</strong> {forfait.prix} €</p>
            <button onClick={() => setSelectedForfait(forfait.id_forfait)}>
              Sélectionner
            </button>
          </div>
        ))}
      </div>
      {selectedForfait && (
        <div className="purchase-section">
          <h2>Valider votre achat</h2>
          <label>
            <strong>Client ID :</strong>
            <input
              type="text"
              value={clientId}
              onChange={(e) => setClientId(e.target.value)}
              required
            />
          </label>
          <button onClick={handlePurchase}>Acheter</button>
        </div>
      )}
    </div>
  );
};

export default ForfaitsPage;
