import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 py-16">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">
          Ready? <span className="text-violet-500">Start your Bigest Road</span>
        </h2>
        <p className="text-gray-600">
          We are here to start your new project and finish it soon.
        </p>
        <button className="px-8 py-3 bg-gradient-to-r from-pink-600 to-violet-700 text-white rounded-full shadow-lg hover:shadow-xl focus:ring-4 focus:ring-green-200 transition">
          Contact Us Today
        </button>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-200 my-12"></div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-8 text-gray-700">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            XTRA BUSINESS
          </h3>
          <p className="text-sm">
            A company is any entity that engages in business. Companies can be
            structured in different ways. For example, your company can be a
            sole proprietorship, a partnership, or a corporation.
          </p>
          <div className="flex space-x-4 mt-4">
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Twitter"
            >
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="LinkedIn"
            >
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
            <a
              href="#"
              className="text-gray-500 hover:text-gray-700 transition"
              aria-label="YouTube"
            >
              <i className="fab fa-youtube fa-lg"></i>
            </a>
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Useful Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Our Services
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                About Company
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Forums
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Latest Products
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Testimonials
              </a>
            </li>
          </ul>
        </div>

        {/* Quick Access */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Access</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Marketplace
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Licenses
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Reviews
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Refunds
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Contact Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Support Policy
              </a>
            </li>
          </ul>
        </div>

        {/* More Links */}
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-4">More Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Our Projects
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Our Office
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Our Location
              </a>
            </li>
            <li>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-800">
                Who We Are?
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
