import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importez les styles

const Navbar = () => {
  return (
    <header className="navbar">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="navbar-logo">Club Nautique</div>
        <ul className="navbar-menu">
          <li>
            <Link to="/" className="hover:text-blue-300">Accueil</Link>
          </li>
          <li>
            <Link to="/cours" className="hover:text-blue-300">Cours</Link>
          </li>
          <li>
            <Link to="/locations" className="hover:text-blue-300">Locations</Link>
          </li>
          <li>
            <Link to="/contact" className="hover:text-blue-300">Contact</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
