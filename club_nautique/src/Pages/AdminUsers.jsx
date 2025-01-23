import React, { useState, useEffect } from "react";
import "../Pages/CSS/AdminUsers.css";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5001/api/admin/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await fetch(`http://localhost:5001/api/admin/users/${id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
    }
  };

  return (
    <div className="admin-users">
      <h1>Gestion des Utilisateurs</h1>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id_client} className="user-card">
            <h3>{user.nom} {user.prenom}</h3>
            <p>Email: {user.email}</p>
            <p>Téléphone: {user.numero_tel}</p>
            <p>Type: {user.type}</p>
            <button onClick={() => deleteUser(user.id_client)}>
              Supprimer
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminUsers;
