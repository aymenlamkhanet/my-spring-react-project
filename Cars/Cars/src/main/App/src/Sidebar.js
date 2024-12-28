import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-6">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/admin"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/CarsPage"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🚗</span>
            <span>Show Cars</span>
          </Link>
        </li>
        <li>
          <Link
            to="/addcar"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>➕</span>
            <span>Add Car</span>
          </Link>
        </li>
        <li>
          <Link
            to="/clients"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>👥</span>
            <span>Clients</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Sales"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>💰</span>
            <span>News</span>
          </Link>
        </li>
        <li>
          <Link
            to="/PaymentPage"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>💳</span>
            <span>Payments</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Reservation"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🔄</span>
            <span>Transactions</span>
          </Link>
        </li>
        <li>
          <Link
            to="/contracts"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>📄</span>
            <span>Contracts</span>
          </Link>
        </li>
        <li>
          <Link
            to="/Notif"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🔔</span>
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link
            to="/adminprofile"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>⚙️</span>
            <span>Settings</span>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
