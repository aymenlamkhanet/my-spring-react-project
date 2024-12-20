import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ClientsPage = () => {
  
  const [clients, setClients] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("nom");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [selectedClients, setSelectedClients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch clients from the API
  useEffect(() => {
    setLoading(true); // Set loading to true when starting fetch
    axios
      .get("http://localhost:8080/utilisateur/clients")
      .then((response) => {
        setClients(response.data)
        console.log(response.data);
        setLoading(false); // Data fetched, stop loading
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
        setError("Failed to fetch clients."); // Set error message
        setLoading(false); // Stop loading even if there's an error
      },);
  }, []);

  // Filtered clients based on search and role
  const filteredClients = clients.filter((client) => {
    return (
      client[selectedColumn]
        ?.toLowerCase()
        .includes(searchText.toLowerCase()) &&
      (roleFilter === "ALL" || client.role === roleFilter)
    );
  });

  // Handle checkbox for individual rows
  const handleCheckboxChange = (id) => {
    setSelectedClients(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((clientId) => clientId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not already selected
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedClients.length === filteredClients.length) {
      setSelectedClients([]); // Deselect all
    } else {
      setSelectedClients(filteredClients.map((client) => client.id)); // Select all
    }
  };

  // Handle delete and info actions
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/utilisateur/del/${id}`)
      .then(() => {
        setClients(clients.filter((client) => client.id !== id));
        alert("User deleted successfully!");
      })
      .catch(() => {
        alert("Error deleting user.");
      });
  };


  const navigate = useNavigate();
  const handleInfo = (id) => {
    console.log(`Showing info for client with id: ${id}`);
    navigate(`/user/${id}`);
  };

  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading clients...</div>
      </div>
    );
  }

  // Display error message if there was an error fetching data
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-6 max-w-full mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900">Clients</h2>
          <div className="flex items-center space-x-6">
            {/* Column Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="columnFilter" className="text-sm text-gray-600">
                Filter by
              </label>
              <select
                id="columnFilter"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="nom">Nom</option>
                <option value="prenom">Prenom</option>
                <option value="adresse">Adresse</option>
                <option value="email">Email</option>
                <option value="role">Role</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col">
              <label htmlFor="searchBar" className="text-sm text-gray-600">
                Search
              </label>
              <input
                id="searchBar"
                type="text"
                placeholder={`Search by ${selectedColumn}`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Role Filter */}
            <div className="flex flex-col">
              <label htmlFor="roleFilter" className="text-sm text-gray-600">
                Role
              </label>
              <select
                id="roleFilter"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ALL">All Roles</option>
                <option value="ADMINISTRATOR">Admin</option>
                <option value="CLIENT">User</option>
              </select>
            </div>
          </div>
        </div>

        {/* Client Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedClients.length === filteredClients.length &&
                      filteredClients.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Nom</th>
                <th className="px-6 py-3 text-left">Prenom</th>
                <th className="px-6 py-3 text-left">Adresse</th>
                <th className="px-6 py-3 text-left">Num. Téléphone</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedClients.includes(client.id)}
                        onChange={() => handleCheckboxChange(client.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{client.id}</td>
                    <td className="px-6 py-4">{client.nom}</td>
                    <td className="px-6 py-4">{client.prenom}</td>
                    <td className="px-6 py-4">{client.adresse}</td>
                    <td className="px-6 py-4">{client.numTelephone}</td>
                    <td className="px-6 py-4">{client.email}</td>
                    <td className="px-6 py-4">{client.role}</td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleInfo(client.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleDelete(client.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center text-gray-500 py-4">
                    No clients found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsPage;
