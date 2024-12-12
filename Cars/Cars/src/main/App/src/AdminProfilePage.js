import React, { useState } from "react";
import { Camera, Mail, Phone, MapPin, User } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from "recharts";
import img from "./Anime.jpeg"

const AdminProfilePage = () => {
  const [adminDetails, setAdminDetails] = useState({
    nom: "Doe",
    prenom: "John",
    email: "john.doe@example.com",
    numTelephone: "123-456-7890",
    adresse: "123 Admin Street, Tech City, 54321",
    role: "Administrator",
    profileImage: "/api/placeholder/200/200", // Placeholder image
  });

  const [editDetails, setEditDetails] = useState({ ...adminDetails });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Admin activities data
  const adminActivities = [
    { name: "User Management", value: 40 },
    { name: "Content Moderation", value: 25 },
    { name: "System Settings", value: 20 },
    { name: "Reporting", value: 15 },
  ];

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditDetails({ ...editDetails, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    if (name === "currentPassword") setCurrentPassword(value);
    else if (name === "newPassword") setNewPassword(value);
    else if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSaveDetails = () => {
    setAdminDetails(editDetails);
    alert("Details updated successfully!");
  };

  const handleChangePassword = () => {
    if (newPassword !== confirmPassword) {
      alert("New password and confirmation do not match!");
      return;
    }

    if (!currentPassword || !newPassword) {
      alert("Please fill out all password fields.");
      return;
    }

    // Simulate password change
    alert("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Admin Profile Page
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Change Password Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">
                Current Password
              </label>
              <input
                type="password"
                name="currentPassword"
                value={currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">
                Confirm New Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleChangePassword}
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-500"
            >
              Change Password
            </button>
          </form>
        </div>

        {/* Admin Details Section with Enhanced Profile */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src={img}
              alt="Admin Profile"
              className="w-40 h-40 rounded-full object-cover border-4 border-gray-600"
            />
            <div className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
              <Camera className="w-5 h-5" />
            </div>
          </div>
          <h2 className="text-2xl font-semibold mb-4">
            {adminDetails.prenom} {adminDetails.nom}
          </h2>
          <div className="space-y-3 w-full">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <span>{adminDetails.email}</span>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-green-400" />
              <span>{adminDetails.numTelephone}</span>
            </div>
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-red-400" />
              <span>{adminDetails.adresse}</span>
            </div>
            <div className="flex items-center space-x-3">
              <User className="w-5 h-5 text-purple-400" />
              <span>{adminDetails.role}</span>
            </div>
          </div>
        </div>

        {/* Admin Activities Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-4 flex items-center">
            Admin Activities
          </h2>
          <div className="w-full max-w-xs">
            <BarChart width={300} height={250} data={adminActivities}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip
                contentStyle={{ backgroundColor: "#333", color: "#fff" }}
                itemStyle={{ color: "#fff" }}
              />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
        </div>

        {/* Edit Details Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Edit Admin Details</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-1">First Name</label>
              <input
                type="text"
                name="prenom"
                value={editDetails.prenom}
                onChange={handleDetailsChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Last Name</label>
              <input
                type="text"
                name="nom"
                value={editDetails.nom}
                onChange={handleDetailsChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={editDetails.email}
                onChange={handleDetailsChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Phone</label>
              <input
                type="text"
                name="numTelephone"
                value={editDetails.numTelephone}
                onChange={handleDetailsChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <div>
              <label className="block text-gray-400 mb-1">Address</label>
              <input
                type="text"
                name="adresse"
                value={editDetails.adresse}
                onChange={handleDetailsChange}
                className="w-full p-2 rounded bg-gray-700 text-white"
              />
            </div>
            <button
              type="button"
              onClick={handleSaveDetails}
              className="bg-green-600 px-4 py-2 rounded hover:bg-green-500"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
