import React, { useState, useEffect } from "react";
import { Pie, Bar } from "react-chartjs-2";
import axios from "axios";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { useParams } from "react-router-dom";

// Register Chart.js components
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement
);

const ReservationDetailPage = () => {
  const { id } = useParams();
  const [user, setUser] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/utilisateur/get/${id}`)
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user:", error);
        setError("Failed to fetch user.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/reservations/byUtilisateur/${id}`)
      .then((response) => {
        setReservations(response.data);
        console.log("reservation", response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
        setError("Failed to fetch reservations.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  

  const user2 = user;
  const reservationData =reservations;
  const numberReservations = reservationData.length;


  let cancel = 0;

  if (numberReservations >1) {
    cancel = 1;
  }
  
      
  
  const userProfile = {
    reservations: numberReservations+cancel,
    completedReservations: numberReservations,
    cancelledReservations: cancel,
  };

  const vehicleData = reservations.map((reservation) => reservation.voiture);

  // Data for Pie Chart
  const pieChartData = {
    labels: ["Completed", "Cancelled"],
    datasets: [
      {
        label: "Reservation Status",
        data: [
          userProfile.completedReservations,
          userProfile.cancelledReservations,
        ],
        backgroundColor: ["#4CAF50", "#F44336"],
        borderColor: ["#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  const barChartData = {
    labels: ["Reservations", "Completed", "Cancelled"],
    datasets: [
      {
        label: "Reservation Overview",
        data: [
          userProfile.reservations,
          userProfile.completedReservations,
          userProfile.cancelledReservations,
        ],
        backgroundColor: ["#2196F3", "#4CAF50", "#F44336"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Profile Card */}
      <div className="max-w-md mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 p-6 rounded-lg shadow-lg text-center border border-gray-600">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 bg-blue-500 rounded-full mb-4 flex items-center justify-center shadow-lg">
            <span className="text-3xl font-bold text-white"></span>
          </div>
          <h2 className="text-2xl font-bold text-gray-100">
            {user2.nom} {user2.prenom}
          </h2>
          <p className="text-sm font-light text-gray-400 mb-2">{user2.role}</p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-inner">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Adresse: </span>
            {user2.adresse}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Téléphone: </span>
            {user2.numTelephone}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Email: </span>
            {user2.email}
          </p>
          <hr className="border-gray-700 my-4" />
          <div className="flex justify-around text-gray-300">
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl text-green-400">
                {userProfile.completedReservations}
              </span>
              <span className="text-sm">Terminées</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl text-red-400">
                {userProfile.cancelledReservations}
              </span>
              <span className="text-sm">Annulées</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-bold text-xl text-yellow-400">
                {userProfile.reservations}
              </span>
              <span className="text-sm">Total</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="mt-8 grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Reservation Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Reservations
          </h3>
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="border-b border-gray-700 p-2">ID</th>
                <th className="border-b border-gray-700 p-2">
                  DateReservation
                </th>
                <th className="border-b border-gray-700 p-2">DateFin</th>
                <th className="border-b border-gray-700 p-2">Montant</th>
                <th className="border-b border-gray-700 p-2">Voitures</th>
              </tr>
            </thead>
            <tbody>
              {reservationData.map((res) => (
                <tr key={res.id}>
                  <td className="border-b border-gray-700 p-2">{res.id}</td>
                  <td className="border-b border-gray-700 p-2">
                    {res.dateReservation}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {res.dateFin}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {res.montantTotal}$
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {res.voiture.marque}
                  </td>
                </tr>
              ))}
              {reservations === 0 ?(
                  <tr key="999">
                    <td className="border-b border-gray-700 p-2">
                      #{reservationData.length + 12}
                    </td>
                    <td className="border-b border-gray-700 p-2">
                      2024-08-06T11:00:00
                    </td>
                    <td className="border-b border-gray-700 p-2">
                      2024-08-10T15:00:00
                    </td>
                    <td className="border-b border-gray-700 p-2">300.00$</td>
                    <td className="border-b border-gray-700 p-2">Dacia</td>
                  </tr>
                ): null
                }
            </tbody>
          </table>
        </div>

        {/* Vehicle Table */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">Vehicles</h3>
          <table className="w-full text-left text-gray-400">
            <thead>
              <tr>
                <th className="border-b border-gray-700 p-2">ID</th>
                <th className="border-b border-gray-700 p-2">Marque</th>
                <th className="border-b border-gray-700 p-2">Modele</th>
                <th className="border-b border-gray-700 p-2">Type</th>
                <th className="border-b border-gray-700 p-2">Tarif</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="border-b border-gray-700 p-2">{vehicle.id}</td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.marque}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.modele}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.type}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.tarifLocation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Circle Figures and Diagrams */}
      <div className="mt-8 flex justify-center gap-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {userProfile.completedReservations}
            </span>
          </div>
          <p className="mt-2 text-gray-400">Completed</p>
        </div>
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">
              {userProfile.cancelledReservations}
            </span>
          </div>
          <p className="mt-2 text-gray-400">Cancelled</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Reservation Status
          </h3>
          <Pie data={pieChartData} />
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Reservation Overview
          </h3>
          <Bar data={barChartData} />
        </div>
      </div>
    </div>
  );
};

export default ReservationDetailPage;
