import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

function AboutPage() {

  const items = ["Home", "About", "Contact"];
  return (
    <div className="bg-white text-gray-900">
      <Navbar items={items} />;{/* Hero Section */}
      <div className="bg-violet-700 text-white py-16 text-center">
        <h1 className="text-5xl md:text-6xl font-bold animate-fadeIn">
          About Us
        </h1>
        <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto animate-fadeIn delay-200">
          Discover who we are, what we stand for, and how we bring value to our
          customers every day.
        </p>
      </div>
      {/* Intro Section */}
      <div className="py-16 px-6 max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-bold text-violet-700 mb-6 animate-slideInFromLeft">
          Who We Are
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed animate-fadeIn delay-300">
          At <strong>YourCompany</strong>, we are committed to delivering
          top-notch services and products tailored to meet your needs. With a
          focus on innovation and quality, we continuously strive to exceed your
          expectations.
        </p>
      </div>
      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-violet-700 text-center mb-12 animate-fadeIn">
            Our Achievements
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 text-center">
            {[
              { value: "1M+", label: "Happy Customers" },
              { value: "50+", label: "Countries Served" },
              { value: "200+", label: "Awards Won" },
              { value: "10+", label: "Years of Experience" },
              { value: "500K+", label: "Products Sold" },
              { value: "24/7", label: "Customer Support" },
            ].map((stat, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 animate-slideInFromBottom delay-200"
              >
                <h3 className="text-5xl font-extrabold text-violet-700">
                  {stat.value}
                </h3>
                <p className="mt-2 text-gray-700">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Mission Section */}
      <div className="py-16 px-6 max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl font-bold text-violet-700 mb-6 animate-slideInFromRight">
          Our Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed animate-fadeIn delay-400">
          Our mission is to empower our customers through high-quality products
          and exceptional service. By embracing innovation and prioritizing your
          needs, we aim to create solutions that inspire confidence and
          satisfaction.
        </p>
      </div>
      {/* Why Choose Us Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-screen-lg mx-auto text-center">
          <h2 className="text-4xl font-bold text-violet-700 mb-8 animate-fadeIn">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Expertise",
                text: "Our team brings years of experience and unmatched skill to deliver outstanding results.",
              },
              {
                title: "Quality",
                text: "We maintain the highest standards in everything we do, ensuring consistent excellence.",
              },
              {
                title: "Customer Focus",
                text: "Your satisfaction is our top priority, and we are always here to support you.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg shadow-md transform transition-transform duration-300 hover:scale-105 animate-slideInFromBottom delay-200"
              >
                <h3 className="text-2xl font-bold text-violet-700 mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-700">{feature.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Call to Action Section */}
      <div className="py-16 text-center">
        <a
          href="#contact"
          className="px-8 py-4 bg-violet-700 text-white rounded-full text-lg font-semibold transform transition-transform duration-300 hover:scale-110 hover:bg-violet-600 animate-bounce"
        >
          Get in Touch
        </a>
      </div>
      <Footer/>
    </div>
  );
}

export default AboutPage;
