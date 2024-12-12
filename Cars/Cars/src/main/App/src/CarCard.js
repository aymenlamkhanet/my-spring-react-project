import React from "react";

const cars = [
  {
    id: 1,
    name: "Sporty Car",
    price: "$50,000",
    discountPrice: "$45,000",
    rating: 5,
    image:
      "https://th.bing.com/th/id/OIP.U5fEbLgNqC48M4Po1ZP5_QHaEI?w=310&h=180&c=7&r=0&o=5&pid=1.7",
    isDiscounted: true,
  },
  {
    id: 2,
    name: "Luxury Car",
    price: "$70,000",
    rating: 4,
    image:
      "https://th.bing.com/th/id/OIP.eg0-KeF7_yMTyYdDbTj-CwHaEZ?w=307&h=182&c=7&r=0&o=5&pid=1.7",
    isDiscounted: false,
  },
  {
    id: 3,
    name: "Electric Car",
    price: "$60,000",
    discountPrice: "$55,000",
    rating: 5,
    image:
      "https://www.grunge.com/img/gallery/the-unfortunate-truth-about-electric-cars/l-intro-1622213374.jpg",
    isDiscounted: true,
  },
  {
    id: 4,
    name: "SUV",
    price: "$40,000",
    rating: 4,
    image:
      "https://th.bing.com/th/id/OIP.6dS7Wr11qCEJcdHNAT30_AHaE7?w=309&h=180&c=7&r=0&o=5&pid=1.7",
    isDiscounted: false,
  },
];

const CarCard = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Featured Cars</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cars.map((car) => (
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
      </div>
    </div>
  );
};

export default CarCard;
