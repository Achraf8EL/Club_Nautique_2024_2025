const express = require("express");
const cors = require("cors");
const courseRoutes = require("./routes/courses");

const app = express();
app.use(cors());
app.use(express.json());

// Ajouter les routes
app.use("/api/courses", courseRoutes);

module.exports = app;
