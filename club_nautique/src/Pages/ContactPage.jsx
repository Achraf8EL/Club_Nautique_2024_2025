import React from "react";
import "../Pages/CSS/ContactPage.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Configuration du marqueur
const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const ContactPage = () => {
  // Coordonnées GPS du club
  const position = [48.697, 6.177]; // Remplacez par les coordonnées exactes de l'adresse

  return (
    <div className="contact-page">
      <h1>Contactez-nous</h1>
      <p className="club-description">
        Fondé en juin 1995, le club nautique de Jarville sur Mer est situé au 2 rue des Palmiers. 
        Grâce à une concession de la mairie, il bénéficie d'un accès privilégié à une partie de la plage pour mener à bien ses activités nautiques.
      </p>
      <div className="contact-info">
        <h2>Informations de Contact</h2>
        <p><strong>Adresse :</strong> 2 rue des Palmiers, Jarville sur Mer</p>
        <p><strong>Téléphone :</strong> +33 1 23 45 67 89</p>
        <p><strong>Email :</strong> contact@clubnautique.com</p>
      </div>
      
    </div>
  );
};

export default ContactPage;
