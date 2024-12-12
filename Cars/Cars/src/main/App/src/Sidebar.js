import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-6">
      <h2 className="text-3xl font-semibold mb-6">Dashboard</h2>
      <ul className="space-y-4">
        <li>
          <Link
            to="/dashboard"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🏠</span>
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/show-cars"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🚗</span>
            <span>Show Cars</span>
          </Link>
        </li>
        <li>
          <Link
            to="/add-car"
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
            to="/sales"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>💰</span>
            <span>Sales</span>
          </Link>
        </li>
        <li>
          <Link
            to="/payments"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>💳</span>
            <span>Payments</span>
          </Link>
        </li>
        <li>
          <Link
            to="/transactions"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🔄</span>
            <span>Transactions</span>
          </Link>
        </li>
        <li>
          <Link
            to="/notifications"
            className="flex items-center space-x-2 text-white hover:bg-blue-700 p-2 rounded"
          >
            <span>🔔</span>
            <span>Notifications</span>
          </Link>
        </li>
        <li>
          <Link
            to="/settings"
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
