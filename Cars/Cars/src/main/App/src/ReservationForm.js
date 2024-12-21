import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ReservationPage = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    email: "",
    phone: "",
    carBrand: "",
    carModel: "",
    paymentMethod: "",
  });
  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!accepted) {
      alert("Please accept the terms and conditions.");
      return;
    }
    console.log("Reservation submitted:", { ...formData, startDate, endDate });
    alert("Reservation confirmed!");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Left Side: Promotions */}
      <div className="w-1/4 bg-gradient-to-b from-blue-500 to-blue-700 text-white p-6 flex flex-col justify-center">
        <h2 className="text-3xl font-bold mb-6">🎉 Loyalty Program</h2>
        <ul className="space-y-4">
          <li className="bg-blue-600 p-4 rounded-lg shadow-md">
            💳 Earn points with every reservation!
          </li>
          <li className="bg-blue-600 p-4 rounded-lg shadow-md">
            🎁 Get exclusive discounts and gifts.
          </li>
          <li className="bg-blue-600 p-4 rounded-lg shadow-md">
            🏆 Priority access to premium fields.
          </li>
          <li className="bg-blue-600 p-4 rounded-lg shadow-md">
            🌟 Refer friends and earn free reservations!
          </li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-yellow-400 text-blue-800 font-bold rounded-lg shadow hover:bg-yellow-500 transition">
          Learn More
        </button>
      </div>

      {/* Right Side: Reservation Form */}
      <div className="w-3/4 bg-white p-10 shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Car Reservation Form
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Part 1: User Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              User Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="nom"
                value={formData.nom}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Nom"
                required
              />
              <input
                type="text"
                name="prenom"
                value={formData.prenom}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Prenom"
                required
              />
              <input
                type="email"
                name="adresseEmail"
                value={formData.adresseEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Adresse Email"
                required
              />
              <input
                type="text"
                name="adresse"
                value={formData.adresse}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Adresse"
                required
              />
              <input
                type="tel"
                name="numeroTelephone"
                value={formData.numeroTelephone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Numero Telephone"
                required
              />
            </div>
          </div>

          {/* Part 2: Car Info */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Car Information
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="marque"
                value={formData.marque}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Marque"
                required
              />
              <input
                type="text"
                name="model"
                value={formData.model}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Model"
                required
              />
              <input
                type="text"
                name="annee"
                value={formData.annee}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Annee"
                required
              />
              <input
                type="text"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Type"
                required
              />
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                placeholder="Price"
                required
              />
            </div>
          </div>

          {/* Part 3: Dates and Payment */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Reservation Dates & Payment
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  Start Date
                </label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholderText="Select start date"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-600 font-medium mb-1">
                  End Date
                </label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholderText="Select end date"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="block text-gray-600 font-medium mb-2">
                Payment Information
              </label>
              <div className="space-y-4 p-4 border rounded-lg bg-gray-50">
                <input
                  type="text"
                  name="cardOwner"
                  value={formData.cardOwner}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Card Owner Name"
                  required
                />
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Card Number (16 digits)"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="cardExpiry"
                    value={formData.cardExpiry}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="Expiry Date (MM/YY)"
                    required
                  />
                  <input
                    type="text"
                    name="cardCIV"
                    value={formData.cardCIV}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                    placeholder="CIV (3 digits)"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Part 4: Terms and Conditions */}
          <div>
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Terms and Conditions
            </h3>
            <ul className="list-disc pl-5 text-gray-600 space-y-2">
              <li>Ensure the car is returned in the same condition.</li>
              <li>Late returns may incur additional charges.</li>
              <li>Fuel policy: return with the same fuel level.</li>
              <li>Reservation is non-refundable after confirmation.</li>
              <li>Driver must possess a valid license at all times.</li>
            </ul>
            <div className="flex items-center mt-4">
              <input
                type="checkbox"
                id="terms"
                checked={accepted}
                onChange={(e) => setAccepted(e.target.checked)}
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-300"
              />
              <label htmlFor="terms" className="ml-2 text-gray-700">
                I accept the terms and conditions
              </label>
            </div>
          </div>

          {/* Confirm Button */}
          <div className="text-center">
            <button
              type="submit"
              disabled={!accepted}
              className={`px-6 py-3 text-white rounded-lg font-medium transition ${
                accepted
                  ? "bg-blue-600 hover:bg-blue-700 focus:ring focus:ring-blue-300"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Confirm Reservation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationPage;
