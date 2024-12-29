import React, { useState, useEffect } from "react";
import {
  Camera,
  Mail,
  Phone,
  MapPin,
  User,
  Shield,
  XCircle,
  CheckCircle,
  Edit2,
} from "lucide-react";
import admin from "./admin.jpg"

const CustomAlert = ({ type, message, onClose }) => (
  <div
    className={`p-4 rounded-lg mb-6 flex items-center justify-between shadow-lg ${
      type === "error" ? "bg-red-800" : "bg-green-800"
    }`}
  >
    <div className="flex items-center gap-2">
      {type === "error" ? (
        <XCircle className="h-5 w-5 text-red-400" />
      ) : (
        <CheckCircle className="h-5 w-5 text-green-400" />
      )}
      <p className="text-white font-medium">{message}</p>
    </div>
    <button onClick={onClose} className="text-white hover:opacity-75">
      <XCircle className="h-4 w-4" />
    </button>
  </div>
);

const AdminProfilePage = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editDetails, setEditDetails] = useState(null);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [updateStatus, setUpdateStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user")) || {};
        if (!user.id) {
          throw new Error("No authenticated user found");
        }

        const response = await fetch(
          `http://localhost:8080/utilisateur/get/${user.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch admin data");
        const data = await response.json();

        if (data.role !== "ADMINISTRATOR") {
          throw new Error("Unauthorized: User is not an admin");
        }

        setAdminDetails(data);
        setEditDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleDetailsChange = (e) => {
    const { name, value } = e.target;
    setEditDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDetails = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const response = await fetch(
        `http://localhost:8080/utilisateur/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editDetails),
        }
      );

      if (!response.ok) throw new Error("Failed to update details");

      const updatedData = await response.json();
      setAdminDetails(updatedData);
      localStorage.setItem("user", JSON.stringify(updatedData));
      setUpdateStatus({
        type: "success",
        message: "Profile updated successfully!",
      });
    } catch (err) {
      setUpdateStatus({ type: "error", message: err.message });
    }
  };

  const handleChangePassword = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setUpdateStatus({ type: "error", message: "New passwords don't match!" });
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user")) || {};
      const verifyResponse = await fetch(
        "http://localhost:8080/utilisateur/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: user.email,
            password: passwordForm.currentPassword,
          }),
        }
      );

      if (!verifyResponse.ok) {
        throw new Error("Current password is incorrect");
      }

      const response = await fetch(
        `http://localhost:8080/utilisateur/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...adminDetails,
            password: passwordForm.newPassword,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update password");

      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setUpdateStatus({
        type: "success",
        message: "Password changed successfully!",
      });
    } catch (err) {
      setUpdateStatus({ type: "error", message: err.message });
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="animate-pulse text-xl font-semibold flex items-center gap-3">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-75"></div>
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce delay-150"></div>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center">
        <div className="bg-red-500/10 border border-red-500 p-6 rounded-lg">
          <p className="text-xl font-semibold text-red-400 flex items-center gap-2">
            <XCircle className="w-6 h-6" />
            {error}
          </p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-8">
      {updateStatus.message && (
        <CustomAlert
          type={updateStatus.type}
          message={updateStatus.message}
          onClose={() => setUpdateStatus({ type: "", message: "" })}
        />
      )}

      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-12 text-center flex items-center justify-center gap-3">
          <Shield className="w-10 h-10 text-blue-400" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            Admin Profile Dashboard
          </span>
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex flex-col items-center">
              <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1">
                  <img
                    src={admin}
                    alt="Admin Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full cursor-pointer hover:bg-blue-400 transition-colors shadow-lg">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              <h2 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                {adminDetails.prenom} {adminDetails.nom}
              </h2>
              <div className="w-full space-y-4 mt-6">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30">
                  <Mail className="w-5 h-5 text-blue-400" />
                  <span className="text-gray-300">{adminDetails.email}</span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span className="text-gray-300">
                    {adminDetails.numTelephone || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30">
                  <MapPin className="w-5 h-5 text-red-400" />
                  <span className="text-gray-300">
                    {adminDetails.adresse || "Not provided"}
                  </span>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-700/30">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-gray-300">{adminDetails.role}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Security</h2>
            </div>
            <form className="space-y-4">
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Current Password
                </label>
                <input
                  type="password"
                  name="currentPassword"
                  value={passwordForm.currentPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  New Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwordForm.newPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwordForm.confirmPassword}
                  onChange={handlePasswordChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="button"
                onClick={handleChangePassword}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 p-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4" />
                Update Password
              </button>
            </form>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-700">
            <div className="flex items-center gap-3 mb-6">
              <Edit2 className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold">Edit Profile</h2>
            </div>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="prenom"
                    value={editDetails.prenom}
                    onChange={handleDetailsChange}
                    className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 font-medium">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="nom"
                    value={editDetails.nom}
                    onChange={handleDetailsChange}
                    className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={editDetails.email}
                  onChange={handleDetailsChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Phone
                </label>
                <input
                  type="text"
                  name="numTelephone"
                  value={editDetails.numTelephone}
                  onChange={handleDetailsChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
              <div>
                <label className="block text-gray-400 mb-2 font-medium">
                  Address
                </label>
                <input
                  type="text"
                  name="adresse"
                  value={editDetails.adresse}
                  onChange={handleDetailsChange}
                  className="w-full p-3 rounded-lg bg-gray-700/30 text-white border border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all outline-none"
                />
              </div>
              <button
                type="button"
                onClick={handleSaveDetails}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 p-3 rounded-lg font-medium transition-all duration-300 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-4 h-4" />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
