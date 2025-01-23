import React from 'react';
import './Footer.css'; // Importation des styles personnalisés

const Footer = () => {
  return (
    <footer className="footer bg-blue-700 text-white mt-10">
      <div className="container mx-auto px-4 py-6 text-center">
        <p className="text-sm mb-4">
          &copy; {new Date().getFullYear()} Club Nautique. Tous droits réservés.
        </p>
        <div className="footer-info">
          <p className="text-sm">Adresse : 2 Rue des Palmiers, 54300 Jarville-sur-Mer</p>
          <p className="text-sm">Téléphone : +33 6 12 34 56 78</p>
          <p className="text-sm">Email : contact@clubnautique.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
