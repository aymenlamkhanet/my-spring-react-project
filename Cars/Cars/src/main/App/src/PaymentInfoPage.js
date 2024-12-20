import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CreditCard, Car, User, ClipboardList, DollarSign } from "lucide-react"; // Importing icons

const PaymentInfoPage = () => {
  const [paiements, setPaiements] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Fetch payment and reservation data
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/paiements/${id}`)
      .then((response) => {
        setPaiements(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching payments:", error);
        setError("Failed to fetch payments.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p className="text-white text-center">Loading data...</p>;
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  if (!paiements) {
    return <p className="text-white text-center">No payment data available.</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-10">
      <h1 className="text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-blue-500 mb-10">
        Payment Information
      </h1>

      {/* Payment Card */}
      <div className="max-w-5xl mx-auto bg-gray-800 shadow-xl rounded-2xl p-10 space-y-10">
        {/* Header Section */}
        <div className="flex items-center space-x-8">
          <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 rounded-full">
            <CreditCard size={48} className="text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-400">Payment ID</h2>
            <p className="text-xl text-gray-300">{paiements.id}</p>
          </div>
        </div>

        {/* Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center space-x-3">
              <DollarSign className="text-green-400" size={28} />
              <span>Payment Details</span>
            </h3>
            <p className="text-xl">
              <span className="font-semibold text-green-400">Amount:</span> $
              {paiements.amount}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-green-400">Method:</span>{" "}
              {paiements.paymentMethod}
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 flex items-center space-x-3">
              <ClipboardList className="text-blue-400" size={28} />
              <span>Reservation Details</span>
            </h3>
            <p className="text-xl">
              <span className="font-semibold text-blue-400">
                Reservation ID:
              </span>{" "}
              {paiements.reservation?.id}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-blue-400">Car:</span>{" "}
              {paiements.reservation?.voiture?.marque}
            </p>
            <p className="text-xl">
              <span className="font-semibold text-blue-400">Client:</span>{" "}
              {paiements.reservation?.utilisateur?.nom}
            </p>
          </div>
        </div>
      </div>

      {/* Summary Section */}
      <div className="mt-16 max-w-5xl mx-auto bg-gray-800 rounded-2xl p-10 shadow-xl">
        <h2 className="text-4xl font-bold text-center text-yellow-400 mb-6">
          Summary
        </h2>
        <p className="text-center text-2xl mb-4">
          The payment of{" "}
          <span className="text-green-400">${paiements.amount}</span> has been
          successfully processed via{" "}
          <span className="text-blue-400">{paiements.paymentMethod}</span>.
        </p>
        <p className="text-center text-2xl">
          Reservation ID:{" "}
          <span className="text-yellow-400">{paiements.reservation?.id}</span>,{" "}
          Car:{" "}
          <span className="text-green-400">
            {paiements.reservation?.voiture?.marque}
          </span>
          , Client:{" "}
          <span className="text-blue-400">
            {paiements.reservation?.utilisateur?.nom}
          </span>
          .
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center mt-16 text-gray-400 text-lg">
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default PaymentInfoPage;
