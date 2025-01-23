import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/LocationPage.css";

const LocationPage = () => {
  const [equipments, setEquipments] = useState([]);
  const [heureDebut, setHeureDebut] = useState("");
  const [heureFin, setHeureFin] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté
    const token = localStorage.getItem("clientToken");
    if (!token) {
      // Redirigez vers la page de connexion si l'utilisateur n'est pas connecté
      navigate("/login");
    } else {
      // Charger les équipements disponibles si l'utilisateur est connecté
      const fetchEquipments = async () => {
        try {
          const response = await fetch("http://localhost:5001/api/location/available");
          if (response.ok) {
            const data = await response.json();
            setEquipments(data);
          } else {
            console.error("Erreur lors de la récupération des équipements :", response.statusText);
          }
        } catch (error) {
          console.error("Erreur lors de la récupération des équipements :", error);
        }
      };

      fetchEquipments();
    }
  }, [navigate]);

  const handleRent = (equipmentId, pricePerHour) => {
    const duration = calculateDuration(heureDebut, heureFin);
    if (!localStorage.getItem("clientToken")) {
      alert("Vous devez être connecté pour louer un équipement.");
      return;
    }
    if (duration <= 0) {
      alert("La durée doit être supérieure à 0.");
      return;
    }
    const totalPrice = duration * pricePerHour;
    navigate("/payment", { state: { equipmentId, duration, heureDebut, heureFin, totalPrice } });
  };

  const calculateDuration = (start, end) => {
    const [startHour, startMinute] = start.split(":").map(Number);
    const [endHour, endMinute] = end.split(":").map(Number);
    return (endHour + endMinute / 60) - (startHour + startMinute / 60);
  };

  return (
    <div className="location-page">
      <h1>Location d'Équipements</h1>
      
      {/* Bouton Mes Locations */}
      <div className="actions">
        <button className="my-locations-button" onClick={() => navigate("/client/locations")}>
          Mes Locations
        </button>
      </div>
      
      <div className="equipments-list">
        {equipments.map((equipment) => (
          <div key={equipment.noequipement} className="equipment-card">
            <h3>{equipment.type_equipement}</h3>
            <p>Capacité : {equipment.capacite}</p>
            <p>Stock : {equipment.quantite_stock}</p>
            {equipment.quantite_stock === 0 ? (
              <p className="out-of-stock">Rupture de stock</p>
            ) : (
              <>
                <p>
                  Prix :
                  {equipment.type_equipement === "Planche à Voile" && "25€/h, 20€/h supplémentaire"}
                  {equipment.type_equipement === "Pédalo" && "10€/30min, 15€/h"}
                  {equipment.type_equipement === "Stand Up Paddle" && "20€/h, 15€/h supplémentaire"}
                  {equipment.type_equipement === "Catamaran" && "45€/h, 35€/h supplémentaire"}
                </p>
                <div className="reservation-section">
                  <label>Heure de Début :</label>
                  <input
                    type="time"
                    value={heureDebut}
                    onChange={(e) => setHeureDebut(e.target.value)}
                  />
                  <label>Heure de Fin :</label>
                  <input
                    type="time"
                    value={heureFin}
                    onChange={(e) => setHeureFin(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleRent(
                        equipment.noequipement,
                        equipment.type_equipement === "Planche à Voile" ? 25 : // Prix par type
                        equipment.type_equipement === "Pédalo" ? 15 :
                        equipment.type_equipement === "Stand Up Paddle" ? 20 :
                        equipment.type_equipement === "Catamaran" ? 45 : 0
                      )
                    }
                  >
                    Réserver
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationPage;
