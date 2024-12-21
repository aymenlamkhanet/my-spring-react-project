import React, { useState ,useEffect } from "react";
import carImage from "./audi.png"; 
import { useParams } from "react-router-dom";
import axios from "axios";

const CarInfoPage = () => {
  const {id} = useParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isForSale, setIsForSale] = useState(false); 
  const [salePrice, setSalePrice] = useState(60000);
  const [resrv,setReserv] =useState([]); 
  const [voiture,setVoiture] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 


  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/voitures/${id}`)
      .then((response) => {
        setVoiture(response.data);
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
      .get(`http://localhost:8080/reservations/byVoiture/${id}`)
      .then((response) => {
        setReserv(response.data);
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


  
  const totalReservations = resrv.length+1; 
  const confirmedReservations = totalReservations-1; 
  const progressPercentage = (confirmedReservations / totalReservations) * 100;



  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section: Car Image */}
        <div className="flex justify-center items-center">
          <img
            src={`http://localhost:8080${voiture.image}`}
            height="300px"
            width="400px"
            alt="Car"
            
          />
        </div>

        
        <div
          className="bg-gray-800 p-6 rounded-lg shadow-lg flex flex-col items-center justify-center relative"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div
            className={`transition-all duration-300 relative ${
              isHovered ? "blur-sm" : ""
            }`}
          >
            <h3 className="text-2xl font-semibold mb-4">Car Details</h3>

            <div className="space-y-3">
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Brand:</strong>
                </p>
                <p className="ml-4">{voiture.marque}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Model:</strong>
                </p>
                <p className="ml-4">{voiture.modele}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Year:</strong>
                </p>
                <p className="ml-4">{voiture.annee}</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Price:</strong>
                </p>
                <p className="ml-4">{voiture.tarifLocation}$</p>
              </div>
              <div className="flex justify-between mb-2">
                <p>
                  <strong>Color:</strong>
                </p>
                <p className="ml-4">{voiture.couleur}</p>
              </div>
            </div>
          </div>

          {/* Update Button (Will appear on hover) */}
          <button
            className={`absolute bottom-4 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 0.3s ease" }}
          >
            Update Info
          </button>
        </div>

        {/* Right Section: Additional Info */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-semibold mb-4">Additional Info</h3>
          <div className="text-lg space-y-3 text-gray-300">
            <div className="flex justify-between mb-2">
              <p>
                <strong>Engine:</strong>
              </p>
              <p className="ml-4">{voiture.type}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Type:</strong>
              </p>
              <p className="ml-4">Gasoline</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Mileage:</strong>
              </p>
              <p className="ml-4">{voiture.kilometrage}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Location:</strong>
              </p>
              <p className="ml-4">New York</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Transmission:</strong>
              </p>
              <p className="ml-4">Manual</p>
            </div>
            <div className="flex justify-between mb-2">
              <p>
                <strong>Immatriculation</strong>
              </p>
              <p className="ml-4">{voiture.immatriculation}</p>
            </div>
          </div>

          {/* Sale Toggle */}
          <div className="mt-4 flex justify-between items-center">
            <p className="font-semibold">For Sale:</p>
            <button
              onClick={() => setIsForSale(!isForSale)}
              className={`px-4 py-2 rounded-lg ${
                isForSale ? "bg-green-600" : "bg-red-600"
              } text-white`}
            >
              {isForSale ? "Available" : "Not Available"}
            </button>
          </div>

          {/* Sale Price Input */}
          {isForSale && (
            <div className="mt-4">
              <label className="block text-lg mb-2" htmlFor="salePrice">
                Sale Price
              </label>
              <input
                type="number"
                id="salePrice"
                value={salePrice}
                onChange={(e) => setSalePrice(e.target.value)}
                className="w-full p-3 bg-gray-700 text-white rounded-lg"
                placeholder="$"
              />
            </div>
          )}
        </div>
      </div>

      {/* Reservation Table Section */}
      <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Reservation Table</h3>
        <table className="min-w-full table-auto text-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 text-left">Reservation ID</th>
              <th className="py-2 px-4 text-left">dateReservation</th>
              <th className="py-2 px-4 text-left">DateFin</th>
              <th className="py-2 px-4 text-left">montantTotal</th>
              <th className="py-2 px-4 text-left">Client</th>
              <th className="py-2 px-4 text-left">Statut</th>
            </tr>
          </thead>
          <tbody>
            {/* Example reservation rows */}
            {resrv.map((res) => (
              <tr key={res.id}>
                <td className="py-2 px-4">#{res.id}</td>
                <td className="py-2 px-4">{res.dateReservation}</td>
                <td className="py-2 px-4">{res.dateFin}</td>
                <td className="py-2 px-4">{res.montantTotal}$</td>
                <td className="py-2 px-4">{res.utilisateur.nom}</td>
                <td className="py-2 px-4 text-green-500">Completed</td>
              </tr>
            ))}
            <tr>
              <td className="py-2 px-4">#{resrv.length + 1}</td>
              <td className="py-2 px-4">2024-08-06T11:00:00</td>
              <td className="py-2 px-4">2024-08-10T15:00:00</td>
              <td className="py-2 px-4 ">296.99$</td>
              <td className="py-2 px-4">Smith</td>
              <td className="py-2 px-4 text-red-500">Canceled</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Statistics Section */}
      <div className="bg-gray-800 p-6 mt-8 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold mb-4">Reservation Progress</h3>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between mb-2">
            <span>Total Reservations:</span>
            <span>{totalReservations}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Confirmed Reservations:</span>
            <span>{confirmedReservations}</span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-700 h-4 rounded-full">
            <div
              className={`h-4 rounded-full ${
                progressPercentage === 100 ? "bg-green-500" : "bg-red-500"
              }`}
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Status Text */}
          <div className="mt-2 text-lg">
            <span
              className={`font-semibold ${
                progressPercentage === 100 ? "text-green-500" : "text-red-500"
              }`}
            >
              {progressPercentage === 100
                ? "Reservation Process: All Confirmed"
                : "Reservation Process: Incomplete"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarInfoPage;
