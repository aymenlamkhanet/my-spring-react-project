import axios from "axios";
import React, { useEffect, useState  } from "react";
import { useNavigate } from "react-router-dom";


const CarPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [cars, setCars] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [year, setYear] = useState("All");
  const [fuelType, setFuelType] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availability, setAvailability] = useState("All");


  // Transform API data to match component's expected structure
  const transformCarData = (cars) => {
    return cars.map((car) => ({
      id: car.id,
      name: `${car.marque} ${car.modele}`,
      type: car.type === "Electrique" ? "Electric" : car.type,
      price: `$${(car.tarifLocation * 1000).toFixed(0)}`, // Convert daily rate to approximate car price
      discountPrice: "", // No discount in original data
      statut : car.statut,
      isDiscounted: false,
      year: parseInt(car.annee),
      fuel: car.type === "Electrique" ? "Electric" : "Gasoline",
      rating: car.statut === "Disponible" ? 4 : 3,
      image: car.image,
    }));
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:8080/voitures/all")
      .then((response) => {
        console.log(response.data);
        const transformedCars = transformCarData(response.data);
        setCars(transformedCars);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Cars:", error);
        setError("Failed to fetch Cars");
        setLoading(false);
      });
  }, []);

  const navigate = useNavigate();
  const handleInfo = (id) => {
    console.log(`Showing info for Cra with id: ${id}`);
    navigate(`/car1/${id}`);
  };

  const filteredCars = cars.filter((car) => {
    const matchesType = selectedType === "All" || car.type === selectedType;
    const matchesYear = year === "All" || car.year.toString() === year;
    const matchesFuel = fuelType === "All" || car.fuel === fuelType;
    const matchesAvailability =
      availability === "All" || car.statut === availability;
    return matchesType && matchesYear && matchesFuel && matchesAvailability;
  });


  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <aside className="hidden lg:block top-0 left-0 h-full w-1/4 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>

        {/* Car Type Filter */}
        <div className="mb-4">
          <label
            htmlFor="carType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Car Type
          </label>
          <select
            id="carType"
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Electric">Electric</option>
            <option value="Compact">Compact</option>
            <option value="Hatchback">Hatchback</option>
          </select>
        </div>
        {/* Disponibilite Filter */}
        <div className="mb-4">
          <label
            htmlFor="availability"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Availability
          </label>
          <select
            id="availability"
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Disponible">Available</option>
            <option value="Réservé">Reserved</option>
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Price Range
          </label>
          <div className="flex items-center space-x-2">
            <input
              type="number"
              placeholder="Min"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="Max"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Year Filter */}
        <div className="mb-4">
          <label
            htmlFor="year"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Year of Production
          </label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
          </select>
        </div>

        {/* Fuel Type Filter */}
        <div className="mb-4">
          <label
            htmlFor="fuelType"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Fuel Type
          </label>
          <select
            id="fuelType"
            value={fuelType}
            onChange={(e) => setFuelType(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
          >
            <option value="All">All</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Electric">Electric</option>
          </select>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-1/4 p-6 w-full">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">
          Car Listings
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCars.map((car) => (
            <div
              key={car.id}
              className="bg-white shadow-md rounded-lg p-4 transition transform hover:scale-105 hover:shadow-xl"
            >
              <img
                src={`http://localhost:8080${car.image}`}
                height="200px"
                width="300px"
                alt={car.marque + " " + car.modele}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-4">{car.name}</h2>
              <div className="flex items-center mt-2">
                {Array.from({ length: car.rating || 0 }, (_, index) => (
                  <span key={index} className="text-yellow-500">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - (car.rating || 0) }, (_, index) => (
                  <span key={index} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
              <div className="mt-4">
                <span className="text-gray-800 font-bold">{car.price}/day</span>
              </div>
              {/* Availability Status */}
              <div
                className={`mt-4 text-sm font-semibold px-2 py-1 rounded-full inline-block ${
                  car.statut === "Disponible"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {car.statut === "Disponible" ? "Available" : "Reserved"}
              </div>
              <button
                onClick={() => handleInfo(car.id)}
                className={`mt-4 w-full px-4 py-2 rounded-full font-semibold ${
                  car.statut === "Disponible"
                    ? "bg-violet-500 text-white hover:bg-violet-600"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
                disabled={car.statut !== "Disponible"}
              >
                {car.statut === "Disponible" ? "Add to Cart" : "Unavailable"}
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CarPage;
