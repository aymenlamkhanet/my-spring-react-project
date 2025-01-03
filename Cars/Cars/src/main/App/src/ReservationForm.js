import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Navbar from "./Navbar";
const items = ["Home", "About", "Contact"];

const ReservationPage = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const carDetails = JSON.parse(localStorage.getItem("carDetails")) || {};
  const [carReservations, setCarReservations] = useState([]);
  const [isAvailable, setIsAvailable] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const calculateTotalAmount = (startDate, endDate, carDetails) => {
    if (!startDate || !endDate || !carDetails.tarifLocation) return 0;

    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays * carDetails.tarifLocation;
  };

  const [formData, setFormData] = useState({
    dateReservation: startDate,
    dateFin: endDate,
    montantTotal: 0,
    retourVoiture: false,
    voiture: {
      id: carDetails.id,
    },
    utilisateur: {
      id: user.id,
    },
  });

  const [paymentData, setPaymentData] = useState({
    amount: 0,
    paymentMethod: "Credit Card",
    reservation: {
      id: "",
    },
  });

  // Fetch car reservations
  useEffect(() => {
    const fetchCarSchedule = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/reservations/car-schedule/${carDetails.id}`
        );
        if (!response.ok) throw new Error("Failed to fetch car schedule");
        const data = await response.json();
        console.log("car-schedule :: ",data);
        setCarReservations(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (carDetails.id) {
      fetchCarSchedule();
    }
  }, [carDetails.id]);

  useEffect(() => {
    const checkAvailability = async () => {
      if (!startDate || !endDate || !carDetails.id) return;

      try {
        // Format dates to remove the 'Z' suffix
        const formattedStartDate = startDate.toISOString().split("Z")[0];
        const formattedEndDate = endDate.toISOString().split("Z")[0];

        // Construct the URL with the correct path and format
        const url = `http://localhost:8080/reservations/check-availability/${carDetails.id}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`;

        const response = await fetch(url);

        if (!response.ok) {
          throw new Error("Failed to check availability");
        }

        const available = await response.json();
        setIsAvailable(available);
      } catch (error) {
        console.error("Error checking availability:", error);
        setIsAvailable(false);
      }
    };

    checkAvailability();
  }, [startDate, endDate, carDetails.id]);

  useEffect(() => {
    const montantTotal = calculateTotalAmount(startDate, endDate, carDetails);

    setFormData((prev) => ({
      ...prev,
      montantTotal,
      dateReservation: startDate,
      dateFin: endDate,
    }));

    setPaymentData((prev) => ({
      ...prev,
      amount: montantTotal,
    }));
  }, [startDate, endDate, carDetails.tarifLocation]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const [accepted, setAccepted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if terms and conditions are accepted
    if (!accepted) {
      alert("Please accept the terms and conditions.");
      return;
    }

    if (!isAvailable) {
      alert(
        "The car is not available for the selected dates. Please choose different dates."
      );
      return;
    }

    // Format start and end dates to ISO string format (YYYY-MM-DDTHH:mm:ss)
    const formattedStartDate = startDate ? startDate.toISOString() : "";
    const formattedEndDate = endDate ? endDate.toISOString() : "";

    // Format date for display
    

    // Prepare the reservation data
    const reservationData = {
      ...formData,
      dateReservation: formattedStartDate,
      dateFin: formattedEndDate,
    };

    try {
      // First request to create the reservation
      const reservationResponse = await fetch(
        "http://localhost:8080/reservations/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(reservationData), // Send reservation data
        }
      );

      if (!reservationResponse.ok) {
        throw new Error("Failed to create reservation.");
      }

      // Get the response with reservation ID
      const reservationResponseData = await reservationResponse.json();
      const reservationId = reservationResponseData.id; // Assuming the response contains the reservation ID

      const contractData = {
        reservation: {
          id: reservationId,
        },
        contractDetails: `Rental contract for ${carDetails.marque} ${
          carDetails.modele
        } from ${startDate.toLocaleDateString()} to ${endDate.toLocaleDateString()}. Total amount: ${
          formData.montantTotal
        } DHS.`,
        contractDate: new Date().toISOString().slice(0, 19), // Format: YYYY-MM-DDTHH:mm:ss
      };

      const contractResponse = await fetch(
        "http://localhost:8080/Contract/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contractData),
        }
      );

      if (!contractResponse.ok) {
        throw new Error("Failed to create contract.");
      }

      // Prepare the payment data with the reservation ID
      const updatedPaymentData = {
        ...paymentData,
        reservation: { id: reservationId },
      };

      // Second request to process the payment
      const paymentResponse = await fetch(
        "http://localhost:8080/paiements/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPaymentData), // Send the updated payment data
        }
      );

      if (!paymentResponse.ok) {
        throw new Error("Failed to process payment.");
      }

      // Process payment response if needed
      const paymentResponseData = await paymentResponse.json();
      console.log("Payment data:", paymentResponseData); // Optional: log payment data for further handling

      alert("Reservation confirmed and payment processed!");
      localStorage.setItem(
        "lastReservation",
        JSON.stringify({
          ...reservationResponseData,
          carDetails,
          totalAmount: formData.montantTotal,
        })
      );
      navigate("/reservation-success");
    } catch (error) {
      // Handle errors more specifically
      console.error("Error during submission:", error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <>
      <Navbar items={items} />
      <div className="min-h-screen bg-gray-100 flex">
        {/* Left Side: Promotions */}
        <div className="w-1/4 bg-gradient-to-b from-blue-500 to-blue-700 text-white p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold flex items-center mb-4">
              <Calendar className="mr-2" /> Car Schedule
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-4 border-white border-t-transparent"></div>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {carReservations.length > 0 ? (
                    carReservations.map((reservation, index) => (
                      <div
                        key={index}
                        className="bg-blue-600/50 rounded-lg p-4"
                      >
                        <p className="font-semibold mb-2">
                          Reservation {index + 1}
                        </p>
                        <p className="text-sm">
                          From: {formatDate(reservation.startDate)}
                        </p>
                        <p className="text-sm">
                          To: {formatDate(reservation.endDate)}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-center py-4 bg-blue-600/50 rounded-lg">
                      No current reservations
                    </p>
                  )}
                </div>

                {/* Availability Status */}
                {startDate && endDate && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold mb-3">
                      Selected Period
                    </h3>
                    <div
                      className={`p-4 rounded-lg ${
                        isAvailable ? "bg-green-500/50" : "bg-red-500/50"
                      }`}
                    >
                      <p className="font-medium">
                        {isAvailable
                          ? "✓ Available for selected dates"
                          : "✗ Not available for selected dates"}
                      </p>
                      <p className="text-sm mt-2">
                        {formatDate(startDate)} - {formatDate(endDate)}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
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
                  value={user.nom}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Nom"
                  required
                />
                <input
                  type="text"
                  name="prenom"
                  value={user.prenom}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Prenom"
                  required
                />
                <input
                  type="email"
                  name="adresseEmail"
                  value={user.email}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Adresse Email"
                  required
                />
                <input
                  type="text"
                  name="adresse"
                  value={user.adresse}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Adresse"
                  required
                />
                <input
                  type="tel"
                  name="numeroTelephone"
                  value={user.numTelephone}
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
                  value={carDetails.marque}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Marque"
                  required
                />
                <input
                  type="text"
                  name="model"
                  value={carDetails.modele}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Model"
                  required
                />
                <input
                  type="text"
                  name="annee"
                  value={carDetails.annee}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Annee"
                  required
                />
                <input
                  type="text"
                  name="type"
                  value={carDetails.type}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                  placeholder="Type"
                  required
                />
                <input
                  type="text"
                  name="price"
                  value={`${carDetails.tarifLocation} DHS /day`}
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
    </>
  );
};

export default ReservationPage;
