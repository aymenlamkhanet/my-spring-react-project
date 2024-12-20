import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PaymentsPage = () => {
  const [payments, setPayments] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [sortOrder, setSortOrder] = useState("ASC");
  const [reservationIdFilter, setReservationIdFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  // Fetch payments from the API
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/paiements/all")
      .then((response) => {
        setPayments(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setError("Failed to fetch payments.");
        setLoading(false);
      });
  }, []);

  // Handle sorting by price
  const sortedPayments = [...payments].sort((a, b) => {
    if (sortOrder === "ASC") {
      return a.amount - b.amount;
    } else {
      return b.amount - a.amount;
    }
  });


  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/paiements/del/${id}`)
      .then(() => {
        setPayments(payments.filter((reservation) => reservation.id !== id));
        alert("Reservation deleted successfully!");
      })
      .catch(() => {
        alert("Error deleting reservation.");
      });
  };

  const navigate = useNavigate();
  const handleInfo = (id) => {
    console.log(`Showing info for reservation with id: ${id}`);
    navigate(`/paiements/${id}`);
  };

  // Filter payments by reservation ID
  const filteredPayments = sortedPayments.filter((payment) => {
    const reservationId = payment.reservation.id || "";
    return reservationIdFilter
      ? reservationId.toString().includes(reservationIdFilter.toString())
      : true;
  });


  // Display loading message while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg text-gray-600">Loading payments...</div>
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
          <h2 className="text-3xl font-semibold text-gray-900">Payments</h2>
          <div className="flex items-center space-x-6">
            {/* Sort Order */}
            <div className="flex flex-col">
              <label htmlFor="sortOrder" className="text-sm text-gray-600">
                Sort by Price
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ASC">Ascending</option>
                <option value="DESC">Descending</option>
              </select>
            </div>

            {/* Filter by Reservation ID */}
            <div className="flex flex-col">
              <label
                htmlFor="reservationFilter"
                className="text-sm text-gray-600"
              >
                Filter by Reservation ID
              </label>
              <input
                id="reservationFilter"
                type="text"
                placeholder="Enter Reservation ID"
                value={reservationIdFilter}
                onChange={(e) => setReservationIdFilter(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          </div>
        </div>

        {/* Payments Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-6 py-3 text-left">Amount</th>
                <th className="px-6 py-3 text-left">Payment Method</th>
                <th className="px-6 py-3 text-left">Reservation ID</th>
                <th className="px-6 py-3 text-left">Voiture</th>
                <th className="px-6 py-3 text-left">Couleur</th>
                <th className="px-6 py-3 text-left">model</th>
                <th className="px-6 py-3 text-left">Utilisateur</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length > 0 ? (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-100">
                    <td className="px-6 py-4">{payment.amount}</td>
                    <td className="px-6 py-4">{payment.paymentMethod}</td>
                    <td className="px-6 py-4">{payment.reservation.id}</td>
                    <td className="px-6 py-4">
                      {payment.reservation.voiture.marque || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {payment.reservation.voiture.couleur || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {payment.reservation.voiture.modele || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      {payment.reservation.utilisateur.nom || "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => handleInfo(payment.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleDelete(payment.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-4">
                    No payments found
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

export default PaymentsPage;
