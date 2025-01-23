const express = require("express");
const cors = require("cors");
const app = express(); // Déclarez 'app' une seule fois
const PORT = process.env.PORT || 5001; // Utilisez le port 5001

app.use(express.json());

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:3000', // Adresse du frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Méthodes autorisées
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers autorisés
  credentials: true, // Autoriser les cookies si nécessaire
}));
app.options('*', (req, res) => {
  res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.set('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.sendStatus(200); // Répondre avec un statut 200
});

app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

app.use(cors({
  origin: "http://localhost:3000", // Adresse de votre frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
}));

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Importez et utilisez les routes
const forfaitsRoutes = require("./routes/forfaits");
app.use("/api/forfaits", forfaitsRoutes);

const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);
app.use("/client", authRoutes); // Utiliser le préfixe /client


const coursesRoutes = require("./routes/courses");
app.use("/api/courses", coursesRoutes);

const reservationRoutes = require("./routes/reservations");
app.use("/api/reserve", reservationRoutes); // Gestion des réservations


const rechargeRoutes = require("./routes/recharge");
app.use("/api/recharge", rechargeRoutes);

const adminCoursesRoutes = require("./routes/adminCourses");
app.use("/api/admin/courses", adminCoursesRoutes);
const adminStockRoutes = require("./routes/adminStock");
app.use("/api/admin/stocks", adminStockRoutes);

const adminLocationsRoutes = require("./routes/adminLocations");
app.use("/api/admin/locations", adminLocationsRoutes);

const adminUsersRoutes = require("./routes/adminUsers");
app.use("/api/admin/users", adminUsersRoutes);

const adminAuth = require('./routes/adminAuth'); 
app.use('/admin', adminAuth);

const paymentRoutes = require("./routes/payment");
app.use("/api/payment", paymentRoutes);

const moniteurRoutes = require("./routes/moniteur");
app.use("/api/moniteur", moniteurRoutes);

// Routes pour les loueurs
const loueurRoutes = require("./routes/loueur"); // Assurez-vous que le chemin est correct
app.use("/api/loueur", loueurRoutes);



// Import des routes
const locationRoutes = require("./routes/location");

// Association des routes
app.use("/api/location", locationRoutes); // Pour les équipements et la gestion de location

const clientLocationsRoutes = require("./routes/clientLocations");
app.use("/api/client-locations", clientLocationsRoutes);

const planningRoutes = require("./routes/planning");
app.use("/api/planning", planningRoutes);

const loueurCoursesRoutes = require("./routes/loueurCourses"); // Nouvelle route
app.use("/api/loueur/courses", loueurCoursesRoutes); // Utilisez une route spécifique pour les loueurs

const loueurClientsRoutes = require("./routes/loueurClients");
app.use("/api/loueur", loueurClientsRoutes);
 
const loueurEquipementsRoutes = require("./routes/loueurEquipements");
app.use("/api/loueur", loueurEquipementsRoutes);

const moniteurPlanningRoutes = require("./routes/moniteurPlanning");

app.use("/api/moniteur/planning", moniteurPlanningRoutes);

const moniteurEquipements = require("./routes/moniteurEquipements");
app.use("/api/moniteur", moniteurEquipements);


// Lancement du serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
