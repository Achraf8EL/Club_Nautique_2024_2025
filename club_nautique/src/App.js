import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import './App.css'; // Import global CSS file
import CoursePage from './Pages/CoursePage';
import SignUpPage from "./Pages/SignUpPage";
import OptionsPage from './Pages/OptionsPage';
import RechargePage from './Pages/RechargePage';
import ContactPage from './Pages/ContactPage';
import { Link } from "react-router-dom";
import AdminDashboard from "./Pages/AdminDashboard";
import AdminCourses from "./Pages/AdminCourses";
import AdminLocations from "./Pages/AdminLocations";
import AdminStock from "./Pages/AdminStock";
import AdminUsers from "./Pages/AdminUsers";
import LoginPage from './Pages/LoginPage'; // Import Login Page
import adminLogo from './Assets/admin.png'
import AdminLogin from './Pages/AdminLogin';
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import { AuthProvider } from './Context/AuthContext.js';
import PaymentPage from './Pages/PaymentPage.jsx';
import AdminValidationPage from './Pages/AdminValidationPage.jsx';
import LocationManagementPage from './Pages/LocationManagementPage.jsx';
import MoniteurLoginPage from "./Pages/MoniteurLoginPage";
import MoniteurDashboardPage from "./Pages/MoniteurDashboardPage";
import MoniteurPlanningPage from "./Pages/MoniteurPlanningPage";
import MoniteurPresencePage from "./Pages/MoniteurPresencePage";
import LoueurLoginPage from './Pages/LoueurLoginPage';
import LoueurDashboardPage from './Pages/LoueurDashboardPage';
import LoueurCoursPage from './Pages/LoueurCoursPage';
import LoueurClientsPage from './Pages/LoueurClientsPage';
import LoueurEquipementsPage from './Pages/LoueurEquipementsPage';
import ClientEquipementsPage from "./Pages/ClientEquipementsPage";
import ClientLocationsPage from "./Pages/ClientLocationsPage";
import ClientPlanningPage from "./Pages/ClientPlanningPage";
import ClientCoursesPage from "./Pages/ClientCoursesPage.jsx";
import RoleSelectionPage from "./Pages/RoleSelectionPage";
import LoueurSignUpPage from "./Pages/LoueurSignUpPage";
import LocationPage from "./Pages/LocationPage";





const App = () => {
  return (
    <>

    <AuthProvider>
      <header>
        <div className="header-logo">
        <Link to="/role-selection">
          <img src={adminLogo} alt="Club Nautique Logo" className="logo" />
          </Link>
        </div>
        <Link to="/" className="header-title">
          <h1>Club Nautique</h1>
        </Link>
        <p>Explorez nos activités, cours et locations</p>
        <nav className="header-links">
  
  {/* 
  <Link to="/login" className="nav-link">Connexion</Link>
  <span className="link-separator"></span>
  <Link to="/signup" className="nav-link">Inscription</Link>
*/}
</nav>

      </header>

      <main className="container">
        <Routes>

        <Route path="/moniteur/planning" element={<MoniteurPlanningPage moniteurId={9} />} />

          <Route path="/" element={<HomePage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/options" element={<OptionsPage />} />
          <Route path="/recharger" element={<RechargePage />} />
          <Route path="/inscription" element={<SignUpPage />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/locations" element={<AdminLocations />} />
          <Route path="/admin/stock" element={<AdminStock />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin" element={<AdminLogin />} />


          <Route path="/recharger/payment" element={<PaymentPage />} />

          <Route path="/admin/validation" element={<AdminValidationPage />} />

          <Route path="/admin/locations" element={<LocationManagementPage />} />

          <Route path="/moniteur/login" element={<MoniteurLoginPage />} />
  <Route path="/moniteur/dashboard" element={<MoniteurDashboardPage />} />

  <Route path="/moniteur/planning" element={<MoniteurPlanningPage />} />
  <Route path="/moniteur/presence" element={<MoniteurPresencePage />} />

  <Route path="/loueur/login" element={<LoueurLoginPage />} />
<Route path="/loueur/dashboard" element={<LoueurDashboardPage />} />
<Route path="/loueur/cours" element={<LoueurCoursPage />} />
<Route path="/loueur/clients" element={<LoueurClientsPage />} />
<Route path="/loueur/equipements" element={<LoueurEquipementsPage />} />

<Route path="/client/equipements" element={<ClientEquipementsPage />} />
<Route path="/client/locations" element={<ClientLocationsPage />} />
<Route path="/client/planning" element={<ClientPlanningPage />} />
<Route path="/client/courses" element={<ClientCoursesPage />} />
<Route path="/role-selection" element={<RoleSelectionPage />} />
<Route path="/locations" element={<LocationPage />} />



<Route path="/loueur/signup" element={<LoueurSignUpPage />} />
<Route path="/payment" element={<PaymentPage />} />



          <Route
            path="/cours"
            element={
              <PrivateRoute>
                <CoursePage />
              </PrivateRoute>
            }
          />

        </Routes>
     

      </main>

      <footer>
        <div className="footer-contact">
          <h3>Contactez-nous :</h3>
          <p>Adresse : Rue des Vagues, 12345 Nautica</p>
          <p>Téléphone : 01 23 45 67 89</p>
          <p>Email : <a href="mailto:contact@clubnautique.com">contact@clubnautique.com</a></p>
        </div>
        <p>© 2025 Club Nautique - Tous droits réservés</p>
      </footer>
      </AuthProvider>
    </>
  );
};

export default App;
