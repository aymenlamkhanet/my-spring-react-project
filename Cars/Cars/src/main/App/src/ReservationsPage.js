import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ReservationsPage = () => {
  const [reservations, setReservations] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("id");
  const [selectedReservations, setSelectedReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reservations from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/reservations/all")
      .then((response) => {
        setReservations(response.data);
        console.log(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
        setError("Failed to fetch reservations.");
        setLoading(false);
      });
  }, []);

  // Filtered reservations based on search
  const filteredReservations = reservations.filter((reservation) => {
    return reservation[selectedColumn]
      ?.toString()
      .toLowerCase()
      .includes(searchText.toLowerCase());
  });

  // Handle checkbox for individual rows
  const handleCheckboxChange = (id) => {
    setSelectedReservations((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((reservationId) => reservationId !== id)
        : [...prevSelected, id]
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedReservations.length === filteredReservations.length) {
      setSelectedReservations([]);
    } else {
      setSelectedReservations(
        filteredReservations.map((reservation) => reservation.id)
      );
    }
  };

  // Handle delete and info actions
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/reservations/del/${id}`)
      .then(() => {
        setReservations(
          reservations.filter((reservation) => reservation.id !== id)
        );
        alert("Reservation deleted successfully!");
      })
      .catch(() => {
        alert("Error deleting reservation.");
      });
  };

  const navigate = useNavigate();
  const handleInfo = (id) => {
    console.log(`Showing info for reservation with id: ${id}`);
    navigate(`/reservation/${id}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading reservations...</div>
      </div>
    );
  }

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
        <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-6 max-w-full mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900">Reservations</h2>
          <div className="flex items-center space-x-6">
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
                <option value="id">ID</option>
                <option value="dateReservation">Date Reservation</option>
                <option value="dateFin">Date Fin</option>
                <option value="montantTotal">Montant Total</option>
                <option value="retourVoiture">Retour Voiture</option>
              </select>
            </div>

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
          </div>
        </div>

        <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedReservations.length ===
                        filteredReservations.length &&
                      filteredReservations.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Date Reservation</th>
                <th className="px-6 py-3 text-left">Date Fin</th>
                <th className="px-6 py-3 text-left">Montant Total</th>
                <th className="px-6 py-3 text-left">Retour Voiture</th>
                <th className="px-6 py-3 text-left">Voiture</th>
                <th className="px-6 py-3 text-left">Utilisateur</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredReservations.length > 0 ? (
                filteredReservations.map((reservation) => (
                  <tr key={reservation.id} className="hover:bg-gray-100">
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedReservations.includes(reservation.id)}
                        onChange={() => handleCheckboxChange(reservation.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{reservation.id}</td>
                    <td className="px-6 py-4">{reservation.dateReservation}</td>
                    <td className="px-6 py-4">{reservation.dateFin}</td>
                    <td className="px-6 py-4">{reservation.montantTotal}</td>
                    <td className="px-6 py-4">
                      {reservation.retourVoiture ? "Yes" : "No"}
                    </td>
                    <td className="px-6 py-4">
                      {reservation.voiture?.modele || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {reservation.utilisateur?.nom || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleInfo(reservation.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleDelete(reservation.id)}
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
                    No reservations found
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

export default ReservationsPage;
