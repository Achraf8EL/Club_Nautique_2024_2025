import React, { useState, useEffect } from "react";
import "../Pages/CSS/AdminStock.css";

const AdminStock = () => {
  const [equipments, setEquipments] = useState([]);
  const [newEquipment, setNewEquipment] = useState({
    type_equipement: "",
    disponibilite: true,
    quantite_stock: "",
    quantite_max: "",
    statut: "fonctionnel",
  });

  useEffect(() => {
    fetchEquipments();
  }, []);

  const fetchEquipments = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/stocks");
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEquipment({ ...newEquipment, [name]: value });
  };

  const addEquipment = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/admin/stocks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEquipment),
      });
      if (response.ok) {
        fetchEquipments(); // Rafraîchit la liste des équipements
        setNewEquipment({
          type_equipement: "",
          disponibilite: true,
          quantite_stock: "",
          quantite_max: "",
          statut: "fonctionnel",
        });
      } else {
        console.error("Erreur lors de l'ajout :", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout d'un équipement :", error);
    }
  };

  const deleteEquipment = async (id) => {
    try {
      const response = await fetch(`http://localhost:5001/api/admin/stocks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        fetchEquipments(); // Rafraîchit la liste des équipements
      } else {
        console.error("Erreur lors de la suppression :", await response.text());
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de l'équipement :", error);
    }
  };

  return (
    <div className="admin-stock">
      <h1>Gestion des Stocks</h1>
      <form onSubmit={addEquipment} className="add-equipment-form">
        <h2>Ajouter un Équipement</h2>
        <label>
          Type d'Équipement :
          <input
            type="text"
            name="type_equipement"
            value={newEquipment.type_equipement}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Quantité en Stock :
          <input
            type="number"
            name="quantite_stock"
            value={newEquipment.quantite_stock}
            onChange={handleInputChange}
            required
          />
        </label>
        <form onSubmit={addEquipment} className="add-equipment-form">
  <h2>Ajouter un Équipement</h2>
  {/* Autres champs */}
  <label>
    Quantité Maximum :
    <input
      type="number"
      name="quantite_max"
      value={newEquipment.quantite_max || 10} // Valeur par défaut : 10
      onChange={handleInputChange}
      required
    />
  </label>
</form>

        <label>
          Disponibilité :
          <select
            name="disponibilite"
            value={newEquipment.disponibilite}
            onChange={handleInputChange}
          >
            <option value={true}>Disponible</option>
            <option value={false}>Indisponible</option>
          </select>
        </label>
        <label>
          Statut :
          <select
            name="statut"
            value={newEquipment.statut}
            onChange={handleInputChange}
          >
            <option value="fonctionnel">Fonctionnel</option>
            <option value="en panne">En panne</option>
            <option value="mis au rebut">Mis au rebut</option>
          </select>
        </label>
        <button type="submit">Ajouter</button>
      </form>

      <div className="equipment-list">
        <h2>Liste des Équipements</h2>
        {equipments.map((equipment) => (
          <div key={equipment.noEquipement} className="equipment-card">
            <h3>{equipment.type_equipement}</h3>
            <p>Quantité en Stock : {equipment.quantite_stock}</p>
            <p>Quantité Maximum : {equipment.quantite_max}</p>
            <p>
              Disponibilité : {equipment.disponibilite ? "Disponible" : "Indisponible"}
            </p>
            <p>Statut : {equipment.statut}</p>
            <button onClick={() => deleteEquipment(equipment.noEquipement)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminStock;
