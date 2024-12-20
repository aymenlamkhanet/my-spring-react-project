import React, { useState, useEffect } from "react";
import { Users, Car, CheckCircle, XCircle, MessageCircle } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ReservationDetailPage = () => {
  const { id } = useParams();
  const [reservation, setReservation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/reservations/get/${id}`)
      .then((response) => {
        setReservation(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservation:", error);
        setError("Failed to fetch reservation.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading)
    return <div className="text-center text-xl mt-10">Loading...</div>;
  if (error) return <div className="text-red-500 text-center">{error}</div>;
  if (!reservation) return <div>No reservation data available.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-800 to-gray-900 text-white p-6">
      <div className="container mx-auto space-y-8">
        <h1 className="text-4xl font-extrabold text-center text-blue-400">
          Reservation Details
        </h1>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Reservation Info */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-4 text-yellow-400">
              Reservation
            </h3>
            <p className="text-lg">
              <strong>ID:</strong> {reservation.id}
            </p>
            <p className="text-lg">
              <strong>Start Date:</strong> {reservation.dateReservation}
            </p>
            <p className="text-lg">
              <strong>End Date:</strong> {reservation.dateFin}
            </p>
            <p className="text-lg">
              <strong>Total Amount:</strong> ${reservation.montantTotal}
            </p>
            <p className="text-lg flex items-center">
              <strong>Return Vehicle:</strong>
              {reservation.retourVoiture ? (
                <span className="text-green-400 flex items-center ml-2">
                  <CheckCircle className="mr-1" /> Yes
                </span>
              ) : (
                <span className="text-red-400 flex items-center ml-2">
                  <XCircle className="mr-1" /> No
                </span>
              )}
            </p>
          </div>

          {/* Vehicle Info */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-4 flex items-center text-blue-400">
              <Car className="mr-2" /> Vehicle Information
            </h3>
            {reservation.voiture ? (
              <>
                <p className="text-lg">
                  <strong>Model:</strong> {reservation.voiture.modele}
                </p>
                <p className="text-lg">
                  <strong>Brand:</strong> {reservation.voiture.marque}
                </p>
                <p className="text-lg">
                  <strong>Year:</strong> {reservation.voiture.annee}
                </p>
                <p className="text-lg">
                  <strong>Type:</strong> {reservation.voiture.type}
                </p>
                <p className="text-lg">
                  <strong>Color:</strong> {reservation.voiture.couleur}
                </p>
                <p className="text-lg">
                  <strong>Registration:</strong>{" "}
                  {reservation.voiture.immatriculation}
                </p>
              </>
            ) : (
              <p>No vehicle data available.</p>
            )}
          </div>

          {/* Customer Info */}
          <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-3xl font-semibold mb-4 flex items-center text-indigo-400">
              <Users className="mr-2" /> Customer Information
            </h3>
            {reservation.utilisateur ? (
              <>
                <p className="text-lg">
                  <strong>Name:</strong> {reservation.utilisateur.nom}{" "}
                  {reservation.utilisateur.prenom}
                </p>
                <p className="text-lg">
                  <strong>Email:</strong> {reservation.utilisateur.email}
                </p>
                <p className="text-lg">
                  <strong>Phone:</strong> {reservation.utilisateur.numTelephone}
                </p>
                <p className="text-lg">
                  <strong>Address:</strong> {reservation.utilisateur.adresse}
                </p>
              </>
            ) : (
              <p>No customer data available.</p>
            )}
          </div>
        </div>

        {/* User Feedback */}
        <div className="bg-gray-800 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
          <h3 className="text-3xl font-semibold mb-4 flex items-center text-green-400">
            <MessageCircle className="mr-2" /> User Feedback
          </h3>
          <p className="text-lg italic">
            "Great experience with this car rental! The vehicle was in top
            condition, and the service was very professional. Highly
            recommended!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
