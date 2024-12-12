import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 1234,
    totalCars: 567,
    totalSales: 890,
    activeDeals: 45,
  });

  useEffect(() => {
    // Fetch the statistics or perform other operations
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="bg-white p-6 shadow-lg rounded-lg mb-6">
          <h1 className="text-4xl font-bold text-gray-800">Welcome, Admin</h1>
          <p className="mt-2 text-gray-600">
            Here's an overview of your website's statistics.
          </p>
        </div>

        {/* Statistics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Users</h3>
            <p className="text-3xl mt-2">{stats.totalUsers}</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Cars</h3>
            <p className="text-3xl mt-2">{stats.totalCars}</p>
          </div>
          <div className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Total Sales</h3>
            <p className="text-3xl mt-2">{stats.totalSales}</p>
          </div>
          <div className="bg-red-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-semibold">Active Deals</h3>
            <p className="text-3xl mt-2">{stats.activeDeals}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
