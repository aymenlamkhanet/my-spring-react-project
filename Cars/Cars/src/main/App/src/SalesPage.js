import React from "react";
import Sidebar from "./Sidebar";
import img1 from "./img1.jpg";
import img2 from "./img2.jpeg";
import img3 from "./img3.avif";
import img4 from "./img4.jpeg";
import img5 from "./img5.jpeg";
import img6 from "./img6.avif";
import img7 from "./img7.jpeg";
import img8 from "./img8.jpeg";
import img9 from "./img9.jpeg";

const SalesPage = () => {
  const carsToBuy = [
    {
      id: 1,
      model: "Tesla Model 3",
      year: 2022,
      price: 39999,
      description: "Electric sedan with excellent performance.",
      image: img4,
      isRecommended: true,
    },
    {
      id: 2,
      model: "Toyota Corolla",
      year: 2021,
      price: 23999,
      description: "Reliable sedan for daily use.",
      image: img5,
      isRecommended: true,
    },
    {
      id: 3,
      model: "BMW X5",
      year: 2022,
      price: 64999,
      description: "Luxury SUV with premium features.",
      image: img6,
      isRecommended: true,
    },
  ];

  const carsToSell = [
    {
      id: 6,
      model: "Chevrolet Malibu",
      year: 2016,
      price: 13999,
      description: "Older sedan with moderate maintenance.",
      image: img7,
      isRecommended: false,
    },
    {
      id: 7,
      model: "Nissan Altima",
      year: 2017,
      price: 16999,
      description: "A reliable sedan but a bit outdated.",
      image: img8,
      isRecommended: false,
    },
    {
      id: 8,
      model: "Chrysler 300",
      year: 2015,
      price: 12999,
      description: "Large sedan with some wear and tear.",
      image: img9,
      isRecommended: false,
    },
  ];

  return (
    <div className="flex">
      <Sidebar />

      <div className="flex-1 p-8 bg-gray-50 min-h-screen">
        {/* Latest News Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-semibold text-gray-800 mb-6 text-center">
            Latest News
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <img
                src={img1}
                alt="News 1"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Car Innovations in 2024
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  2024 brings exciting innovations in the automotive world.
                  Electric vehicles continue to evolve, with new models hitting
                  the market this year.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More
                </button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <img
                src={img2}
                alt="News 2"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Electric Cars Rising
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Electric cars are becoming the future of transportation. With
                  more options available, it's easier than ever to switch to an
                  eco-friendly vehicle.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More
                </button>
              </div>
            </div>

            <div className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500">
              <img
                src={img3}
                alt="News 3"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3">
                  Luxury Cars for 2024
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  Discover the best luxury cars that offer a combination of
                  elegance, performance, and cutting-edge technology in 2024.
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Read More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Cars to Buy Section */}
        <section className="mb-16">
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Cars You Should Buy
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsToBuy.map((car) => (
              <div
                key={car.id}
                className={`shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500 ${
                  car.isRecommended
                    ? "bg-gradient-to-r from-green-100 via-green-200 to-green-300 border-4 "
                    : ""
                }`}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                    {car.model}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">Year: {car.year}</p>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    ${car.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {car.description}
                  </p>
                  {car.isRecommended && (
                    <div className="mt-4 bg-green-500 text-white py-2 text-center font-semibold text-sm rounded-md">
                      Recommended
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Cars to Sell Section */}
        <section>
          <h3 className="text-3xl font-semibold text-gray-800 mb-6 text-center">
            Cars You Should Sell
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {carsToSell.map((car) => (
              <div
                key={car.id}
                className={`shadow-xl rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-500 ${
                  !car.isRecommended
                    ? "bg-gradient-to-r from-red-100 via-red-200 to-red-300 border-4 "
                    : ""
                }`}
              >
                <img
                  src={car.image}
                  alt={car.model}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                    {car.model}
                  </h4>
                  <p className="text-sm text-gray-500 mb-3">Year: {car.year}</p>
                  <p className="text-lg font-semibold text-gray-800 mb-3">
                    ${car.price}
                  </p>
                  <p className="text-sm text-gray-600 mb-3">
                    {car.description}
                  </p>
                  {!car.isRecommended && (
                    <div className="mt-4 bg-red-500 text-white py-2 text-center font-semibold text-sm rounded-md">
                      Not Recommended
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SalesPage;
