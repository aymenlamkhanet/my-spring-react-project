import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("marque");
  const [typeFilter, setTypeFilter] = useState("ALL");
  const [selectedCars, setSelectedCars] = useState([]);

  // Fetch cars from the API
  useEffect(() => {
    axios
      .get("http://localhost:8080/voitures/all")
      .then((response) => {
        setCars(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching cars:", error);
      });
  }, []);

 
  const filteredCars = cars.filter((car) => {
    return (
      car[selectedColumn]
        ?.toString()
        .toLowerCase()
        .includes(searchText.toLowerCase()) &&
      (typeFilter === "ALL" || car.type.toLowerCase() === typeFilter.toLowerCase())
    );
  });

  console.log(filteredCars);

  // Handle checkbox for individual rows
  const handleCheckboxChange = (id) => {
    setSelectedCars(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((carId) => carId !== id) // Deselect if already selected
          : [...prevSelected, id] // Select if not already selected
    );
  };

  // Handle "Select All" checkbox
  const handleSelectAll = () => {
    if (selectedCars.length === filteredCars.length) {
      setSelectedCars([]); // Deselect all
    } else {
      setSelectedCars(filteredCars.map((car) => car.id)); // Select all
    }
  };

  // Handle delete and info actions
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8080/voitures/del/${id}`)
      .then(() => {
        setCars(cars.filter((car) => car.id !== id));
        alert("Car deleted successfully!");
      })
      .catch((error) => {
        console.error("Error deleting car:", error);
        alert("Error deleting car.");
      });
  };

  
  const navigate = useNavigate();
  
  const handleInfo = (id) => {
    console.log(`Showing info for car with id: ${id}`);
    navigate(`/car/${id}`); // Navigate to the car details page
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Filter Bar */}
        <div className="flex items-center justify-between bg-white shadow-lg rounded-lg p-6 mb-6 max-w-full mx-auto">
          <h2 className="text-3xl font-semibold text-gray-900">Cars</h2>
          <div className="flex items-center space-x-6">
            {/* Column Dropdown */}
            <div className="flex flex-col">
              <label htmlFor="columnFilter" className="text-sm text-gray-600">
                Filter by
              </label>
              <select
                id="columnFilter"
                value={selectedColumn}
                onChange={(e) => setSelectedColumn(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="marque">Marque</option>
                <option value="modele">Model</option>
                <option value="couleur">Color</option>
                <option value="type">Type</option>
              </select>
            </div>

            {/* Search Bar */}
            <div className="flex flex-col">
              <label htmlFor="searchBar" className="text-sm text-gray-600">
                Search
              </label>
              <input
                id="searchBar"
                type="text"
                placeholder={`Search by ${selectedColumn}`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            {/* Type Filter */}
            <div className="flex flex-col">
              <label htmlFor="typeFilter" className="text-sm text-gray-600">
                Type
              </label>
              <select
                id="typeFilter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="border-2 border-gray-300 rounded-lg px-4 py-2 bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="ALL">All Types</option>
                <option value="Sedan">Sedan</option>
                <option value="Compact">Compact</option>
                <option value="SUV">SUV</option>
                <option value="Electrique">Electrique</option>
                <option value="Hatchback">Hatchback</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cars Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto p-4">
          <table className="min-w-full table-auto text-gray-700">
            <thead className="bg-gray-200 text-gray-900">
              <tr>
                <th className="px-4 py-3 text-center">
                  <input
                    type="checkbox"
                    checked={
                      selectedCars.length === filteredCars.length &&
                      filteredCars.length > 0
                    }
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="px-6 py-3 text-left">ID</th>
                <th className="px-6 py-3 text-left">Marque</th>
                <th className="px-6 py-3 text-left">Modele</th>
                <th className="px-6 py-3 text-left">Color</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">Statut</th>
                <th className="px-6 py-3 text-left">immatriculation</th>
                <th className="px-6 py-3 text-left">annee</th>
                <th className="px-6 py-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCars.length > 0 ? (
                filteredCars.map((car) => (
                  <tr
                    key={car.id}
                    className={`hover:bg-gray-100 ${
                      selectedCars.includes(car.id) ? "bg-gray-100" : ""
                    }`}
                  >
                    <td className="px-4 py-4 text-center">
                      <input
                        type="checkbox"
                        checked={selectedCars.includes(car.id)}
                        onChange={() => handleCheckboxChange(car.id)}
                      />
                    </td>
                    <td className="px-6 py-4">{car.id}</td>
                    <td className="px-6 py-4">{car.marque}</td>
                    <td className="px-6 py-4">{car.modele}</td>
                    <td className="px-6 py-4">{car.couleur}</td>
                    <td className="px-6 py-4">{car.type}</td>
                    <td className="px-6 py-4">{car.statut}</td>
                    <td className="px-6 py-4">{car.immatriculation}</td>
                    <td className="px-6 py-4">{car.annee}</td>
                    <td className="px-6 py-4 space-x-2">
                      <button
                        onClick={() => handleInfo(car.id)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                      >
                        Info
                      </button>
                      <button
                        onClick={() => handleDelete(car.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-4 text-gray-500">
                    No cars found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CarsPage;
