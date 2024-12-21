import { useNavigate } from "react-router-dom";

function Navbar() {

  const navigate = useNavigate();


  const handleNavigation = (e) => {
    // Get the path from the data attribute
    const path = e.target.getAttribute("data-path");
    if (path) {
      navigate(path);
    }
  };
  return (
    <div className="bg-white text-violet-700">
      {/* Navbar container */}
      <ul className="flex items-center justify-between p-4 space-x-4 md:space-x-8">
        {/* Logo or site name */}
        <li className="text-base md:text-2xl font-bold">
          <a
            href="#home"
            data-path="/"
            onClick={handleNavigation}
            className="hover:text-violet-400 transition-colors duration-300"
          >
            greatsite Cars
          </a>
        </li>
        {/* Navigation links */}
        <div className="flex space-x-2 md:space-x-4">
          <li>
            <a
              href="#home"
              onClick={handleNavigation}
              data-path="/"
              className="px-4 py-2 rounded-full bg-violet-50 border-0 text-sm md:text-lg hover:bg-violet-100 text-violet-700 transition-all duration-300 focus:ring-2 focus:ring-violet-600"
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              data-path="/about"
              onClick={handleNavigation}
              className="px-4 py-2 rounded-full bg-violet-50 text-sm md:text-lg hover:bg-violet-100 text-violet-700 transition-all duration-300 focus:ring-2 focus:ring-violet-600"
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-path="/contact"
              onClick={handleNavigation}
              className="px-4 py-2 rounded-full bg-violet-50 text-sm md:text-lg hover:bg-violet-100 text-violet-700 transition-all duration-300 focus:ring-2 focus:ring-violet-600"
            >
              Contact
            </a>
          </li>
          <li>
            <a
              href="#contact"
              data-path="/login"
              onClick={handleNavigation}
              className="px-4 py-2 rounded-full bg-violet-50 text-sm md:text-lg hover:bg-violet-100 text-violet-700 transition-all duration-300 focus:ring-2 focus:ring-violet-600"
            >
              Login
            </a>
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
