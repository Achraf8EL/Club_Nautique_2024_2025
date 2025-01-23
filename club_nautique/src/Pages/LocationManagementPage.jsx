import React, { useState } from "react";

const LocationManagementPage = () => {
  const [locations, setLocations] = useState([]);
  const [material, setMaterial] = useState("Planche à voile");
  const [hours, setHours] = useState(1);

  const addLocation = () => {
    const price =
      material === "Planche à voile" && hours > 1
        ? 25 + (hours - 1) * 20
        : material === "Pédalo"
        ? hours === 1
          ? 15
          : 10
        : material === "Stand-up paddle"
        ? 20 + (hours - 1) * 15
        : 45 + (hours - 1) * 35;

    setLocations([
      ...locations,
      { id: locations.length + 1, material, hours, price },
    ]);
  };

  return (
    <div>
      <h1>Gestion des Locations</h1>
      <div>
        <label>Matériel :</label>
        <select value={material} onChange={(e) => setMaterial(e.target.value)}>
          <option value="Planche à voile">Planche à voile</option>
          <option value="Pédalo">Pédalo</option>
          <option value="Stand-up paddle">Stand-up paddle</option>
          <option value="Catamaran">Catamaran</option>
        </select>
        <label>Durée (heures) :</label>
        <input
          type="number"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
        />
        <button onClick={addLocation}>Ajouter une location</button>
      </div>
      <h2>Locations</h2>
      <ul>
        {locations.map((loc) => (
          <li key={loc.id}>
            {loc.material} - {loc.hours}h - {loc.price}€
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationManagementPage;
