import React from "react";
import { Users,  Car, CreditCard, History } from "lucide-react";

const ReservationDetailPage = ({ reservation = {} }) => {
  const totalReservations = 3;
  const confirmedReservations = 1;
  const progressPercentage = (confirmedReservations / totalReservations) * 100;

  const {
    id = "N/A",
    dateReservation = "Not Specified",
    dateFin = "Not Specified",
    montantTotal = "0",
    retourVoiture = false,
    voiture = {},
    utilisateur = {},
    paymentStatus = "Pending",
    transactionId = "N/A",
    history = [],
  } = reservation || {};

  if (!reservation) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <p className="text-2xl">No reservation details available</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Reservation Info Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Reservation Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between mb-2">
              <p>
                <strong>Reservation ID:</strong>
              </p>
              <p className="ml-4">{id}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Date Reservation:</strong>
              </p>
              <p className="ml-4">{dateReservation}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Date Fin:</strong>
              </p>
              <p className="ml-4">{dateFin}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Montant Total:</strong>
              </p>
              <p className="ml-4">{montantTotal}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Retour Voiture:</strong>
              </p>
              <p className="ml-4">{retourVoiture ? "Yes" : "No"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Voiture:</strong>
              </p>
              <p className="ml-4">{voiture.modele || "N/A"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Utilisateur:</strong>
              </p>
              <p className="ml-4">{utilisateur.nom || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Vehicle Info Section */}
        <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Car className="mr-3 text-blue-400" />
            Vehicle Information
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between mb-2">
              <p>
                <strong>Model:</strong>
              </p>
              <p className="ml-4">{voiture.modele || "N/A"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Registration:</strong>
              </p>
              <p className="ml-4">{voiture.registration || "N/A"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Type:</strong>
              </p>
              <p className="ml-4">{voiture.type || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Customer Info Section */}
        <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <Users className="mr-3 text-indigo-400" />
            Customer Information
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between mb-2">
              <p>
                <strong>Name:</strong>
              </p>
              <p className="ml-4">{utilisateur.nom || "N/A"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Email:</strong>
              </p>
              <p className="ml-4">{utilisateur.email || "N/A"}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Phone:</strong>
              </p>
              <p className="ml-4">{utilisateur.phone || "N/A"}</p>
            </div>
          </div>
        </div>

        {/* Payment Info Section */}
        <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <CreditCard className="mr-3 text-green-400" />
            Payment Information
          </h3>
          <div className="space-y-3 text-gray-300">
            <div className="flex justify-between mb-2">
              <p>
                <strong>Status:</strong>
              </p>
              <p className="ml-4">{paymentStatus}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Transaction ID:</strong>
              </p>
              <p className="ml-4">{transactionId}</p>
            </div>
          </div>
        </div>

        {/* Reservation History Section */}
        <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 flex items-center">
            <History className="mr-3 text-purple-400" />
            Reservation History
          </h3>
          <div className="space-y-3 text-gray-300">
            {history.length > 0 ? (
              history.map((event, index) => (
                <div key={index} className="flex justify-between mb-2">
                  <p>{event.date}</p>
                  <p>{event.action}</p>
                </div>
              ))
            ) : (
              <p>No history available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
