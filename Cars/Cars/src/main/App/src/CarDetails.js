import React, { useState } from "react";
import Footer from "./Footer";

const CarDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("description");

  // Example car details embedded directly
  const car = {
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
    description:
      "The Toyota Camry is a high-quality and versatile sedan designed for those seeking a balance between performance, comfort, and fuel efficiency. With its sleek design, advanced technology, and premium materials, the Camry is well-suited for everyday commuting and long road trips. It boasts a smooth driving experience with its well-tuned suspension and a responsive engine, making it a top choice for anyone in the market for a reliable sedan. Additionally, the Camry features a spacious interior with intuitive controls, making it both a practical and enjoyable car to drive for families or individuals alike.",
    colorGuide:
      "The Toyota Camry is available in a range of attractive colors, including classic black, pristine white, vibrant red, calming blue, elegant silver, and a sophisticated grey. Each color is carefully selected to complement the sleek design of the vehicle, allowing you to choose the one that best matches your personal style. Whether you prefer a bold statement or a more understated look, there’s a Camry color that will fit your taste perfectly.",
    faq: [
      {
        question: "Is this car available for a test drive?",
        answer:
          "Yes, the Toyota Camry is available for a test drive at your local dealership. We encourage you to experience the car's smooth handling, premium interior, and advanced safety features firsthand. Contact your nearest Toyota dealer for more details and to schedule your test drive.",
      },
      {
        question: "Does it come with a warranty?",
        answer:
          "Yes, the Toyota Camry comes with a comprehensive 5-year/60,000-mile warranty, covering most major components and offering you peace of mind. Additionally, Toyota offers an extended warranty package for those who wish to extend coverage beyond the standard warranty period, ensuring that you’re protected for years to come.",
      },
      {
        question: "What is the estimated fuel economy?",
        answer:
          "The Toyota Camry delivers excellent fuel efficiency, with an estimated fuel economy of 28 MPG in the city and 39 MPG on the highway. This makes it an economical choice for long commutes and long-distance driving, reducing the number of trips to the fuel station while still providing an enjoyable and powerful driving experience.",
      },
      {
        question: "Does it support Android Auto and Apple CarPlay?",
        answer:
          "Yes, the Toyota Camry comes equipped with both Android Auto and Apple CarPlay. This allows you to seamlessly connect your smartphone to the car's infotainment system, enabling easy access to your favorite apps, music, and navigation. Both systems are integrated into the car’s touchscreen interface, making it easier to stay connected while keeping your hands on the wheel and eyes on the road.",
      },
    ],
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "info", label: "Info" },
    { id: "colorGuide", label: "Color Guide" },
    { id: "faq", label: "FAQ" },
  ];

  const handleTabClick = (tab) => setActiveTab(tab);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex flex-col lg:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Left Image Section */}
        <div className="w-full lg:w-1/2">
          <img
            src={car.image}
            alt={car.name}
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Details Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800">{car.name}</h1>

          {/* Rating */}
          <div className="flex items-center mt-4">
            {Array.from({ length: car.rating }, (_, index) => (
              <span key={index} className="text-yellow-500 text-xl">
                ★
              </span>
            ))}
            {Array.from({ length: 5 - car.rating }, (_, index) => (
              <span key={index} className="text-gray-300 text-xl">
                ★
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-4">
            {car.isDiscounted ? (
              <div>
                <span className="text-gray-500 line-through">{car.price}</span>{" "}
                <span className="text-green-500 font-bold">
                  {car.discountPrice}
                </span>
              </div>
            ) : (
              <span className="text-gray-800 font-bold text-xl">
                {car.price}
              </span>
            )}
          </div>

          {/* Medium Description */}
          <p className="mt-6 text-gray-600">{car.description}</p>

          {/* Key Features */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Key Features:
            </h3>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Spacious interior</li>
              <li>Advanced safety features</li>
              <li>Fuel efficiency</li>
              <li>Stylish design</li>
            </ul>
          </div>

          {/* Reserve Now Button */}
          <div className="mt-6">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition text-lg">
              Reserve Now
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-6 text-gray-700">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Contact Information:
            </h3>
            <p>📞 Phone: +1 (555) 123-4567</p>
            <p>📧 Email: info@carsales.com</p>
            <p>🏢 Location: 123 Car Sales Blvd, AutoCity</p>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6">
        <div className="flex border-b">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`flex-1 py-2 text-center ${
                activeTab === tab.id
                  ? "text-blue-600 border-b-2 border-blue-600 font-bold"
                  : "text-gray-500"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "description" && (
            <p className="text-gray-700">{car.description}</p>
          )}
          {activeTab === "info" && (
            <ul className="text-gray-700 space-y-2">
              <li>
                <strong>Year:</strong> {car.year}
              </li>
              <li>
                <strong>Fuel:</strong> {car.fuel}
              </li>
              <li>
                <strong>Type:</strong> {car.type}
              </li>
            </ul>
          )}
          {activeTab === "colorGuide" && (
            <p className="text-gray-700">{car.colorGuide}</p>
          )}
          {activeTab === "faq" && (
            <ul className="text-gray-700 space-y-2">
              {car.faq.map((faq, index) => (
                <li key={index}>
                  <strong>Q:</strong> {faq.question}
                  <br />
                  <strong>A:</strong> {faq.answer}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CarDetailsPage;
