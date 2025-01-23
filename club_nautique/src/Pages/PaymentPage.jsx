import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Pages/CSS/PaymentPage.css";

const PaymentPage = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Récupérer les données passées depuis la page précédente
  const { equipmentId, duration, heureDebut, heureFin, totalPrice } = location.state || {};

  const handlePayment = async (e) => {
    e.preventDefault();

    if (!cardNumber || !expiryDate || !cvv) {
      setError("Tous les champs de paiement sont obligatoires.");
      return;
    }

    try {
      const token = localStorage.getItem("clientToken");
      const clientId = token ? JSON.parse(atob(token.split(".")[1])).id_client : null;

      if (!clientId) {
        alert("Vous devez être connecté pour effectuer un paiement.");
        navigate("/login");
        return;
      }

      // Effectuer la requête de paiement
      const paymentResponse = await fetch("http://localhost:5001/api/payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clientId,
          cardNumber,
          expiryDate,
          cvv,
          totalPrice, // Ajout du montant total pour le paiement
        }),
      });

      if (paymentResponse.ok) {
        // Si le paiement est réussi, enregistrer la location
        const rentResponse = await fetch("http://localhost:5001/api/location/rent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            clientId,
            equipmentId,
            duration,
            heure_debut: heureDebut,
            heure_fin: heureFin,
          }),
        });

        const rentData = await rentResponse.json();
        if (rentResponse.ok) {
          setMessage("Paiement réussi et location enregistrée !");
          setTimeout(() => navigate("/locations"), 2000); // Redirection après 2 secondes
        } else {
          setError(rentData.error || "Erreur lors de l'enregistrement de la location.");
        }
      } else {
        const paymentError = await paymentResponse.json();
        setError(paymentError.error || "Erreur lors du paiement.");
      }
    } catch (error) {
      console.error("Erreur lors du paiement :", error);
      setError("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  return (
    <div className="payment-page">
      <h1>Paiement</h1>
      <p>Montant total : {totalPrice}€</p>
      <form className="payment-form" onSubmit={handlePayment}>
        <div className="form-group">
          <label htmlFor="cardNumber">Numéro de carte :</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="1234 5678 9012 3456"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Date d'expiration :</label>
          <input
            type="text"
            id="expiryDate"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            placeholder="MM/AA"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cvv">CVV :</label>
          <input
            type="password"
            id="cvv"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
            placeholder="123"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
        <button type="submit" className="pay-button">
          Payer
        </button>
      </form>
    </div>
  );
};

export default PaymentPage;
