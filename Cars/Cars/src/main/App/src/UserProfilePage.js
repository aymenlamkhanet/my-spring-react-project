import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

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
  // Static data
  const userProfile = {
    nom: "Pelé",
    prenom: "Edson",
    adresse: "Santos, Brazil",
    phone: "+553399876543",
    email: "pele@football.com",
    role: "CLIENT",
    reservations: 5,
    completedReservations: 4,
    cancelledReservations: 1,
  };

  const vehicleData = [
    { id: 1, type: "Car", model: "Toyota Corolla", plate: "AB-123-CD" },
    { id: 2, type: "Motorbike", model: "Honda CBR", plate: "EF-456-GH" },
  ];

  const reservationData = [
    { id: 1, date: "2024-12-10", time: "10:00 AM", status: "Completed" },
    { id: 2, date: "2024-12-11", time: "2:00 PM", status: "Cancelled" },
  ];

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

  // Data for Bar Chart
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
            <span className="text-3xl font-bold text-white">
              {userProfile.nom[0]}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-100">
            {userProfile.nom} {userProfile.prenom}
          </h2>
          <p className="text-sm font-light text-gray-400 mb-2">
            {userProfile.role}
          </p>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg shadow-inner">
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Adresse: </span>
            {userProfile.adresse}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Téléphone: </span>
            {userProfile.phone}
          </p>
          <p className="text-gray-300 mb-2">
            <span className="font-semibold">Email: </span>
            {userProfile.email}
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
                <th className="border-b border-gray-700 p-2">Date</th>
                <th className="border-b border-gray-700 p-2">Time</th>
                <th className="border-b border-gray-700 p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {reservationData.map((res) => (
                <tr key={res.id}>
                  <td className="border-b border-gray-700 p-2">{res.id}</td>
                  <td className="border-b border-gray-700 p-2">{res.date}</td>
                  <td className="border-b border-gray-700 p-2">{res.time}</td>
                  <td className="border-b border-gray-700 p-2">{res.status}</td>
                </tr>
              ))}
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
                <th className="border-b border-gray-700 p-2">Type</th>
                <th className="border-b border-gray-700 p-2">Model</th>
                <th className="border-b border-gray-700 p-2">Plate</th>
              </tr>
            </thead>
            <tbody>
              {vehicleData.map((vehicle) => (
                <tr key={vehicle.id}>
                  <td className="border-b border-gray-700 p-2">{vehicle.id}</td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.type}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.model}
                  </td>
                  <td className="border-b border-gray-700 p-2">
                    {vehicle.plate}
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
