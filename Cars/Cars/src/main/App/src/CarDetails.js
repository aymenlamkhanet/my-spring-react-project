import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const CarDetailsPage = () => {
  const [activeTab, setActiveTab] = useState("description");
  const [voiture, setVoiture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8080/voitures/${id}`)
      .then((response) => {
        console.log(response.data);
        setVoiture(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching Car ", error);
        setError("Failed fetching Car with the id ");
        setLoading(false);
      });
  });

  const transformCarData = {
    id: voiture.id,
    name: `${voiture.marque} ${voiture.modele}`,
    type: voiture.type === "Electrique" ? "Electric" : voiture.type,
    price: `$${(voiture.tarifLocation * 1000).toFixed(0)}`, // Convert daily rate to approximate voiture price
    discountPrice: `$${(
      voiture.tarifLocation * 1000 -
      300 * voiture.tarifLocation
    ).toFixed(0)}`, // No discount in original data
    statut: voiture.statut,
    isDiscounted: true,
    year: parseInt(voiture.annee),
    fuel: voiture.type === "Electrique" ? "Electric" : "Gasoline",
    rating: voiture.statut === "Disponible" ? 4 : 3,
    image: voiture.image,
  };

  // Example car details embedded directly
  const car = {
    description: `
    The ${voiture.marque} ${
      voiture.modele
    } is a masterpiece of modern engineering, blending 
    exceptional performance with advanced technology. As a versatile ${
      voiture.type
    } car, it caters 
    to a wide range of drivers, from those seeking thrilling speed to families looking for comfort 
    and safety on the road. With its cutting-edge features, including ${
      voiture.features || "adaptive cruise control and a panoramic sunroof"
    }, 
    and a sleek aerodynamic design, this vehicle ensures you arrive at your destination in style and comfort.

    Built with premium materials, the ${voiture.marque} ${
      voiture.modele
    } offers a spacious interior 
    and a user-friendly dashboard equipped with the latest infotainment systems. ${
      voiture.type === "Electrique"
        ? "Its eco-friendly electric motor provides zero-emissions driving, making it perfect for urban environments and long trips alike."
        : "The fuel-efficient engine ensures minimal running costs without compromising on performance."
    }
    Whether you're cruising through city streets or exploring scenic routes, the ${
      voiture.marque
    } ${voiture.modele} promises an unforgettable journey.
  `,
    colorGuide: `
    The ${voiture.marque} ${voiture.modele} comes in a variety of stunning color options tailored to match your personality and preferences:
    
    - **Classic Black**: For a timeless and professional look.
    - **Pristine White**: Reflecting elegance and simplicity.
    - **Vibrant Red**: For those who love to make a bold statement.
    - **Elegant Silver**: Combining sophistication with a modern touch.
    
    Each color option is carefully crafted to enhance the vehicle's dynamic design and premium finish, ensuring you turn heads wherever you go!
  `,
  additionalInfo: `The ${voiture.marque} ${voiture.modele} features state-of-the-art technology, including an intuitive touchscreen dashboard, advanced safety features, and a premium sound system. It's designed to offer a seamless driving experience, whether you're navigating city streets or exploring the open road.`,

    faq: [
      {
        question: "Is this car available for a test drive?",
        answer: `Absolutely! You can schedule a test drive for the ${voiture.marque} ${voiture.modele} at your convenience. Our team will guide you through its features and ensure you experience its unmatched performance firsthand.`,
      },
      {
        question: "Does it come with a warranty?",
        answer: `Yes, the ${voiture.marque} ${voiture.modele} is covered by a comprehensive 5-year or 60,000-mile warranty, offering peace of mind and reliable support.`,
      },
      {
        question: "What is the estimated fuel economy?",
        answer: `${
          voiture.type === "Electrique"
            ? "This electric vehicle offers a range of up to 300 miles on a single charge, depending on driving conditions."
            : "With a fuel economy of 40 miles per gallon, this car is ideal for long commutes and city driving alike."
        }`,
      },
      {
        question: "What safety features does it include?",
        answer: `The ${voiture.marque} ${voiture.modele} is equipped with advanced safety features, including collision avoidance systems, blind-spot monitoring, lane-keeping assist, and airbags throughout the cabin.`,
      },
      {
        question: "Is financing available?",
        answer: `Yes, we offer flexible financing options for the ${voiture.marque} ${voiture.modele}, making it easier for you to drive home your dream car. Contact us for more details.`,
      },
      {
        question: "How long does it take to charge?",
        answer: `${
          voiture.type === "Electrique"
            ? "With a fast charger, the ${voiture.marque} ${voiture.modele} can be charged up to 80% in just 30 minutes. Standard charging takes approximately 7-8 hours."
            : "This question applies to electric models only."
        }`,
      },
      {
        question: "Can I customize my car?",
        answer: `Yes, the ${voiture.marque} ${voiture.modele} can be customized with various add-ons, including premium sound systems, custom wheels, and upgraded upholstery options.`,
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
            src={`http://localhost:8080${voiture.image}`}
            alt={voiture.name}
            height="900px"
            width="900px"
            className="object-cover"
          />
        </div>

        {/* Right Details Section */}
        <div className="w-full lg:w-1/2 p-8">
          <h1 className="text-3xl font-bold text-gray-800">
            {transformCarData.name}
          </h1>

          {/* Rating */}
          <div className="flex items-center mt-4">
            {Array.from({ length: transformCarData.rating }, (_, index) => (
              <span key={index} className="text-yellow-500 text-xl">
                ★
              </span>
            ))}
            {Array.from({ length: 5 - transformCarData.rating }, (_, index) => (
              <span key={index} className="text-gray-300 text-xl">
                ★
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="mt-4">
            {car.isDiscounted ? (
              <div>
                <span className="text-gray-500 line-through">
                  {transformCarData.price}
                </span>{" "}
                <span className="text-green-500 font-bold">
                  {transformCarData.discountPrice}
                </span>
              </div>
            ) : (
              <span className="text-gray-800 font-bold text-xl">
                {transformCarData.price}
              </span>
            )}
          </div>

          {/* Medium Description */}
          <p className="mt-6 text-gray-600">{transformCarData.description}</p>

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
        <div className="p-6 space-y-8">
          {" "}
          {/* Add space between sections */}
          {activeTab === "description" && (
            <p className="text-gray-700 p-4 bg-gray-100 rounded-lg">
              {car.description}
            </p>
          )}
          {activeTab === "info" && (
            <div className="text-gray-700 space-y-2 p-4 bg-gray-100 rounded-lg">
              <ul>
                <li>
                  <strong>Year:</strong> {transformCarData.year}
                </li>
                <li>
                  <strong>Fuel:</strong> {transformCarData.fuel}
                </li>
                <li>
                  <strong>Type:</strong> {transformCarData.type}
                </li>
              </ul>
              <p className="mt-4">{car.additionalInfo}</p>{" "}
              {/* Display additional info */}
            </div>
          )}
          {activeTab === "colorGuide" && (
            <p className="text-gray-700 p-4 bg-gray-100 rounded-lg">
              {car.colorGuide}
            </p>
          )}
          {activeTab === "faq" && (
            <ul className="text-gray-700 space-y-4 p-4 bg-gray-100 rounded-lg">
              {car.faq.map((faq, index) => (
                <li key={index} className="p-3 bg-white rounded shadow">
                  <strong className="block text-gray-900">
                    Q: {faq.question}
                  </strong>
                  <span className="block text-gray-700">A: {faq.answer}</span>
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
