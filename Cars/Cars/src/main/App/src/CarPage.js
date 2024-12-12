import React, { useState } from "react";

const carData = [
  {
    id: 1,
    name: "Toyota Camry",
    type: "Sedan",
    price: "$20,000",
    discountPrice: "$18,000",
    isDiscounted: true,
    year: 2019,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 2,
    name: "Ford Mustang",
    type: "Coupe",
    price: "$25,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2021,
    fuel: "Gasoline",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 3,
    name: "BMW 5 Series",
    type: "Sedan",
    price: "$40,000",
    discountPrice: "$38,000",
    isDiscounted: true,
    year: 2020,
    fuel: "Diesel",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 4,
    name: "Tesla Model S",
    type: "Electric",
    price: "$70,000",
    discountPrice: "$65,000",
    isDiscounted: true,
    year: 2022,
    fuel: "Electric",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 5,
    name: "Honda Civic",
    type: "Sedan",
    price: "$18,000",
    discountPrice: "$16,500",
    isDiscounted: true,
    year: 2018,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 6,
    name: "Chevrolet Tahoe",
    type: "SUV",
    price: "$50,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2021,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 7,
    name: "Porsche 911",
    type: "Coupe",
    price: "$120,000",
    discountPrice: "$115,000",
    isDiscounted: true,
    year: 2020,
    fuel: "Gasoline",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 8,
    name: "Mazda CX-5",
    type: "SUV",
    price: "$28,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2022,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 9,
    name: "Nissan Leaf",
    type: "Electric",
    price: "$32,000",
    discountPrice: "$30,000",
    isDiscounted: true,
    year: 2021,
    fuel: "Electric",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 10,
    name: "Ford F-150",
    type: "Truck",
    price: "$35,000",
    discountPrice: "$32,500",
    isDiscounted: true,
    year: 2020,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 11,
    name: "Hyundai Sonata",
    type: "Sedan",
    price: "$22,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2019,
    fuel: "Gasoline",
    rating: 3,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 12,
    name: "Kia Sorento",
    type: "SUV",
    price: "$30,000",
    discountPrice: "$28,000",
    isDiscounted: true,
    year: 2022,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 13,
    name: "Volkswagen Golf",
    type: "Hatchback",
    price: "$20,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2018,
    fuel: "Diesel",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 14,
    name: "Audi Q7",
    type: "SUV",
    price: "$60,000",
    discountPrice: "$57,000",
    isDiscounted: true,
    year: 2020,
    fuel: "Diesel",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 15,
    name: "Mercedes-Benz C-Class",
    type: "Sedan",
    price: "$50,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2021,
    fuel: "Gasoline",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 16,
    name: "Subaru Outback",
    type: "SUV",
    price: "$28,000",
    discountPrice: "$26,500",
    isDiscounted: true,
    year: 2019,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 17,
    name: "Volvo XC90",
    type: "SUV",
    price: "$55,000",
    discountPrice: "$52,000",
    isDiscounted: true,
    year: 2021,
    fuel: "Diesel",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 18,
    name: "Chevrolet Bolt",
    type: "Electric",
    price: "$36,000",
    discountPrice: "",
    isDiscounted: false,
    year: 2020,
    fuel: "Electric",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 19,
    name: "Jeep Wrangler",
    type: "SUV",
    price: "$45,000",
    discountPrice: "$42,000",
    isDiscounted: true,
    year: 2022,
    fuel: "Gasoline",
    rating: 4,
    image: "https://via.placeholder.com/300x200",
  },
  {
    id: 20,
    name: "Tesla Model X",
    type: "Electric",
    price: "$90,000",
    discountPrice: "$85,000",
    isDiscounted: true,
    year: 2022,
    fuel: "Electric",
    rating: 5,
    image: "https://via.placeholder.com/300x200",
  },
];


const CarPage = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [year, setYear] = useState("All");
  const [fuelType, setFuelType] = useState("All");

  const filteredCars = carData.filter((car) => {
    const matchesType = selectedType === "All" || car.type === selectedType;
    const matchesYear = year === "All" || car.year.toString() === year;
    const matchesFuel = fuelType === "All" || car.fuel === fuelType;
    return matchesType && matchesYear && matchesFuel;
  });

  return (
    <div className="flex bg-white">
      {/* Sidebar */}
      <aside className="hidden lg:block top-0 left-0 h-full w-1/4 p-6 overflow-y-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Filters</h2>

        {/* Filter by Type */}
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
            <option value="Coupe">Coupe</option>
            <option value="SUV">SUV</option>
            <option value="Electric">Electric</option>
          </select>
        </div>

        {/* Filter by Price */}
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

        {/* Filter by Year */}
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
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
          </select>
        </div>

        {/* Filter by Fuel Type */}
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
            <option value="Diesel">Diesel</option>
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
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-lg"
              />
              <h2 className="text-lg font-semibold mt-4">{car.name}</h2>
              <div className="flex items-center mt-2">
                {Array.from({ length: car.rating }, (_, index) => (
                  <span key={index} className="text-yellow-500">
                    ★
                  </span>
                ))}
                {Array.from({ length: 5 - car.rating }, (_, index) => (
                  <span key={index} className="text-gray-300">
                    ★
                  </span>
                ))}
              </div>
              <div className="mt-4">
                {car.isDiscounted ? (
                  <div>
                    <span className="text-gray-500 line-through">
                      {car.price}
                    </span>{" "}
                    <span className="text-green-500 font-bold">
                      {car.discountPrice}
                    </span>
                  </div>
                ) : (
                  <span className="text-gray-800 font-bold">{car.price}</span>
                )}
              </div>
              <button className="bg-violet-500 text-white px-4 py-2 mt-4 w-full rounded-full hover:bg-violet-600">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default CarPage;
