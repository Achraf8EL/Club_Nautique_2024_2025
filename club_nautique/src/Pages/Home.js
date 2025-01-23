import React from 'react';
import Navbar from '../Components/Navbar/Navbar';
import Footer from '../Components/Footer/Footer';
import { Link } from 'react-router-dom';
import '../Pages/CSS/Home.css'; // Styles personnalisés

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Bannière principale */}
      <section className="home-banner bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Bienvenue au Club Nautique</h1>
          <p className="text-lg mb-6">
            Découvrez nos cours de voile et profitez de nos locations pour une expérience
            inoubliable en bord de mer.
          </p>
          <Link
            to="/cours"
            className="bg-white text-blue-700 font-semibold py-3 px-6 rounded shadow hover:bg-blue-100 transition"
          >
            Réservez vos cours
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Nos Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="service-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Cours de Voile</h3>
              <p className="text-gray-600">
                Participez à nos cours pour débutants ou sportifs, encadrés par des moniteurs
                qualifiés.
              </p>
              <Link
                to="/cours"
                className="text-blue-700 font-semibold mt-4 inline-block hover:underline"
              >
                En savoir plus &rarr;
              </Link>
            </div>
            <div className="service-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Locations de Matériel</h3>
              <p className="text-gray-600">
                Louez du matériel de qualité pour explorer la mer : pédalos, planches à voile,
                catamarans.
              </p>
              <Link
                to="/locations"
                className="text-blue-700 font-semibold mt-4 inline-block hover:underline"
              >
                Découvrir nos offres &rarr;
              </Link>
            </div>
            <div className="service-card bg-white p-6 rounded shadow hover:shadow-lg transition">
              <h3 className="text-xl font-bold text-blue-700 mb-3">Promotions Spéciales</h3>
              <p className="text-gray-600">
                Profitez de remises exclusives pour nos clients issus des campings partenaires.
              </p>
              <Link
                to="/promotions"
                className="text-blue-700 font-semibold mt-4 inline-block hover:underline"
              >
                Voir les promotions &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-16 bg-blue-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Témoignages</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="testimonial-card bg-white p-6 rounded shadow">
              <p className="text-gray-600 mb-4">
                "Une expérience incroyable ! Les moniteurs sont très professionnels et le matériel
                est de qualité."
              </p>
              <h4 className="font-bold text-blue-700">- Alice M.</h4>
            </div>
            <div className="testimonial-card bg-white p-6 rounded shadow">
              <p className="text-gray-600 mb-4">
                "Nous avons adoré les pédalos et les cours pour débutants. Je recommande vivement
                !"
              </p>
              <h4 className="font-bold text-blue-700">- Karim D.</h4>
            </div>
            <div className="testimonial-card bg-white p-6 rounded shadow">
              <p className="text-gray-600 mb-4">
                "Parfait pour une journée en famille. Les prix sont très raisonnables."
              </p>
              <h4 className="font-bold text-blue-700">- Sophie L.</h4>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Home;
