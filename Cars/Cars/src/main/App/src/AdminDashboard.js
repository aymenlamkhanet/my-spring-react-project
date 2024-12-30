import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, TrendingDown, Car, Plus } from "lucide-react";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalCars: 0,
    totalSales: 0,
    activeDeals: 0,
  });
  const [recentUsers, setRecentUsers] = useState([]);
  const [recentReservations, setRecentReservations] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [cars, setCars] = useState([]);
  const [reservationTrends, setReservationTrends] = useState([]);
  const [paymentTrends, setPaymentTrends] = useState([]);

  // Get admin info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {

      //Fetch cars
      const carsResponse = await fetch("http://localhost:8080/voitures/all");
      const carsData = await carsResponse.json();
      setCars(carsData);
      setStats((prev) => ({ ...prev, totalCars: carsData.length }));

      // Fetch users data
      const usersResponse = await fetch(
        "http://localhost:8080/utilisateur/clients"
      );
      const usersData = await usersResponse.json();

      // Fetch reservations data
      const reservationsResponse = await fetch(
        "http://localhost:8080/reservations/all"
      );
      const reservationsData = await reservationsResponse.json();

      // Fetch payments data
      const paymentsResponse = await fetch(
        "http://localhost:8080/paiements/all"
      );
      const paymentsData = await paymentsResponse.json();

      // Update stats
      setStats({
        totalUsers: usersData.length,
        totalCars: 0, // Update this based on your cars endpoint
        totalSales: paymentsData.reduce((acc, curr) => acc + curr.amount, 0),
        activeDeals: reservationsData.filter((r) => !r.retourVoiture).length,
      });

      // Set recent users
      setRecentUsers(
        usersData.slice(-7).map((user) => ({
          id: user.id,
          name: `${user.prenom} ${user.nom}`,
          email: user.email,
          numTelephone : user.numTelephone,
          adresse : user.adresse, // Since there's no creation date in the model
        }))
      );

      // Set recent reservations
      setRecentReservations(
        reservationsData.slice(-5).map((res) => ({
          id: res.id,
          user: `${res.utilisateur.prenom} ${res.utilisateur.nom}`,
          car: res.voiture.model, // Assuming you have a model field in Voiture
          date: new Date(res.dateReservation).toISOString().split("T")[0],
          status: res.retourVoiture ? "Completed" : "Active",
        }))
      );

      // Set recent payments
      setRecentPayments(
        paymentsData.slice(-5).map((payment) => ({
          id: payment.id,
          user: `${payment.reservation.utilisateur.prenom} ${payment.reservation.utilisateur.nom}`,
          amount: payment.amount,
          date: new Date(payment.reservation.dateReservation)
            .toISOString()
            .split("T")[0],
          status: payment.paymentMethod,
          method: payment.paymentMethod,
        }))
      );

      // Process reservation trends
      const reservationsByMonth = processMonthlyData(
        reservationsData,
        "dateReservation"
      );
      setReservationTrends(reservationsByMonth);

      // Process payment trends
      const paymentsByMonth = processMonthlyData(
        paymentsData,
        "reservation.dateReservation"
      );
      setPaymentTrends(paymentsByMonth);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const processMonthlyData = (data, dateField) => {
    const monthlyData = data.reduce((acc, item) => {
      const date = new Date(
        dateField.includes(".")
          ? item[dateField.split(".")[0]][dateField.split(".")[1]]
          : item[dateField]
      );
      const month = date.toLocaleString("default", { month: "short" });
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(monthlyData).map(([month, count]) => ({
      month,
      count,
      trend: count > (monthlyData[month] || 0) ? "up" : "down",
    }));
  };


  function getColorByIndex(index) {
    const colors = ["#4F46E5", "#22C55E", "#F59E0B", "#EC4899", "#10B981"];
    return colors[index % colors.length];
  }

  const renderTrendIndicator = (trend) => {
    if (trend === "up") {
      return <TrendingUp className="text-green-500 ml-2" size={20} />;
    }
    return <TrendingDown className="text-red-500 ml-2" size={20} />;
  };

  const renderStatusBadge = (status) => {
    const colors = {
      Active: "bg-green-100 text-green-800",
      Completed: "bg-blue-100 text-blue-800",
      "Credit Card": "bg-purple-100 text-purple-800",
      Cash: "bg-yellow-100 text-yellow-800",
    };
    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-semibold ${
          colors[status] || "bg-gray-100 text-gray-800"
        }`}
      >
        {status}
      </span>
    );
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Welcome, {user.prenom} {user.nom}
          </h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your website's statistics.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="bg-blue-500 text-white rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-1a4 4 0 00-4-4H6a4 4 0 00-4 4v1h5m3-4a4 4 0 100-8 4 4 0 000 8z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-600 text-lg font-semibold">
                Total Users
              </h3>
              <p className="text-2xl font-bold">{stats.totalUsers}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="bg-green-500 text-white rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-600 text-lg font-semibold">
                Total Sales
              </h3>
              <p className="text-2xl font-bold">
                ${stats.totalSales.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="bg-yellow-500 text-white rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10h11M9 21V3"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-600 text-lg font-semibold">
                Active Deals
              </h3>
              <p className="text-2xl font-bold">{stats.activeDeals}</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 flex items-center space-x-4">
            <div className="bg-red-500 text-white rounded-lg p-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 4a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-gray-600 text-lg font-semibold">
                Pending Payments
              </h3>
              <p className="text-2xl font-bold">
                $
                {recentPayments
                  .reduce((sum, p) => sum + p.amount, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {cars.slice(0, 6).map((car) => (
            <div
              key={car.id}
              className="relative bg-gray-100 rounded-2xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 transition transform"
            >
              <div className="absolute top-4 right-4 text-sm bg-white py-1 px-3 rounded-full shadow-sm font-semibold text-gray-600">
                {Math.floor(Math.random() * 100)}% Recommend
              </div>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 mb-4 flex items-center justify-center">
                  <img
                    src={
                      `http://localhost:8080${car.image}` ||
                      "https://via.placeholder.com/150"
                    }
                    alt={`${car.marque} ${car.modele}`}
                    className="max-h-full rounded-lg"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">
                  {car.marque} {car.modele}
                </h3>
                <div className="flex justify-between w-full text-gray-600 text-sm mb-3">
                  <span>{car.kilometrage.toLocaleString()} km</span>
                  <span>Year: {car.annee}</span>
                </div>
                <div className="flex justify-between w-full text-gray-600 text-sm mb-3">
                  <span>Type: {car.type}</span>
                  <span>License: {car.immatriculation}</span>
                </div>
                <div className="text-center mt-4 text-2xl font-bold text-blue-600">
                  ${car.tarifLocation.toFixed(2)}/h
                </div>
              </div>
              <div className="absolute bottom-4 left-4 text-sm text-gray-500 flex items-center space-x-2">
                <span className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m6 4h1m-6 4h8a1 1 0 001-1V7a1 1 0 00-1-1h-8a1 1 0 00-1 1v12a1 1 0 001 1z"
                    />
                  </svg>
                  <span>{Math.floor(Math.random() * 200) + 100}K</span>
                </span>
                <span>•</span>
                <span className="flex items-center space-x-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3"
                    />
                  </svg>
                  <span>Automatic</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Reservation Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reservationTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Reservations"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Payment Trends</h2>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={paymentTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="count"
                    name="Payments"
                    stroke="#10b981"
                    strokeWidth={2}
                    dot={{ fill: "#10b981" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Transaction History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead>
                  <tr className="border-b text-gray-600 text-sm uppercase tracking-wide">
                    <th className="py-2 px-4 font-semibold">Payment Number</th>
                    <th className="py-2 px-4 font-semibold">Date & Time</th>
                    <th className="py-2 px-4 font-semibold">Amount</th>
                    <th className="py-2 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentReservations.map((reservation) => (
                    <tr
                      key={reservation.id}
                      className="border-b hover:bg-gray-50"
                    >
                      <td className="py-2 px-4 flex items-center">
                        <span className="text-green-500 mr-2">✔</span>
                        <span>{reservation.user}</span>
                      </td>
                      <td className="py-2 px-4">{reservation.date}</td>
                      <td className="py-2 px-4">{reservation.car}</td>
                      <td className="py-2 px-4">
                        <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-sm">
                          {reservation.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-4">Recent Payments</h2>
            <div className="space-y-4">
              {recentPayments.map((payment) => (
                <div
                  key={payment.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-semibold">{payment.user}</h4>
                    <p className="text-sm text-gray-500">
                      ${payment.amount.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="mb-1 flex items-center">
                      {renderStatusBadge(payment.status)}
                      {renderTrendIndicator(payment.trend)}
                    </div>
                    <span className="text-sm text-gray-500">
                      {payment.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 ">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Recent Users
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="text-left text-gray-600 uppercase tracking-wide text-sm">
                  <th className="py-3 px-6 font-semibold">Full_Name</th>
                  <th className="py-3 px-6 font-semibold">Email</th>
                  <th className="py-3 px-6 font-semibold">Telephone</th>
                  <th className="py-3 px-6 font-semibold">Adresse</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, index) => (
                  <tr
                    key={user.id}
                    className={`py-4 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-blue-50 transition duration-300`}
                  >
                    <td className="py-3 px-6">
                      <div className="flex items-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
                          style={{ backgroundColor: getColorByIndex(index) }}
                        >
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="ml-4">
                          <p className="text-gray-800 font-medium">
                            {user.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.email}</td>
                    <td className="py-3 px-6 text-gray-600">
                      {user.numTelephone}
                    </td>
                    <td className="py-3 px-6 text-gray-600">{user.adresse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
