/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactUsPage = () => {
    const items = ["Home", "About", "Contact"];
  return (
    <>
      <Navbar items={items} />
      <div className="bg-gradient-to-br from-purple-500 to-indigo-600 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden md:flex transition duration-500 transform hover:scale-105">
          
          <div className="w-full md:w-2/3 p-8">
            <h2 className="text-4xl font-extrabold text-gray-800 mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-8">
              Feel free to drop us a line below. We’d love to hear from you!
            </p>
            <form className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="Dexter Morgan"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="dextermorgan@office.com"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Phone
                </label>
                <input
                  type="text"
                  id="phone"
                  placeholder="(800) 900 - 900 - 100"
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  placeholder="Hi, do you have a moment to talk about..."
                  className="w-full mt-2 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-xl hover:scale-105 transition-transform duration-300"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Right Section: Contact Information */}
          <div className="w-full md:w-1/3 bg-gradient-to-br from-purple-700 to-indigo-800 text-white p-8 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <ul className="space-y-4">
                <li>
                  <span className="block font-semibold">Address:</span>
                  360 King Street, Feasterville Trevose, PA 19053
                </li>
                <li>
                  <span className="block font-semibold">Phone:</span>
                  (800) 900-200-300
                </li>
                <li>
                  <span className="block font-semibold">Email:</span>
                  info@example.com
                </li>
              </ul>
            </div>
            <div className="mt-8">
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300"
                  aria-label="Twitter"
                >
                  <i className="fab fa-twitter text-white"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300"
                  aria-label="LinkedIn"
                >
                  <i className="fab fa-linkedin text-white"></i>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-purple-500 hover:bg-purple-600 rounded-full flex items-center justify-center transition duration-300"
                  aria-label="Instagram"
                >
                  <i className="fab fa-instagram text-white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default ContactUsPage;
