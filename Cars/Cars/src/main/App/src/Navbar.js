import { useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [profileImage, setProfileImage] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (Object.keys(user).length > 0 && user.id) {
      setProfileImage(`https://robohash.org/${user.id}?size=150x150`);
    }
  }, [user]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavigation = (e) => {
    const path = e.target.getAttribute("data-path");
    if (path) {
      navigate(path);
      setIsDropdownOpen(false);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    setProfileImage("");
    setIsDropdownOpen(false);
    navigate("/");
  };

  return (
    <div className="bg-white text-violet-700">
      <ul className="flex items-center justify-between p-4 space-x-4 md:space-x-8">
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
        <div className="flex items-center space-x-2 md:space-x-4">
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
          <li className="relative" ref={dropdownRef}>
            {Object.keys(user).length === 0 ? (
              <a
                href="#login"
                data-path="/login"
                onClick={handleNavigation}
                className="px-4 py-2 rounded-full bg-violet-50 text-sm md:text-lg hover:bg-violet-100 text-violet-700 transition-all duration-300 focus:ring-2 focus:ring-violet-600"
              >
                Login
              </a>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  {profileImage && (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-violet-400"
                    />
                  )}
                </button>
                
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold text-gray-700">
                        {user.name || 'User'}
                      </p>
                      <p className="text-sm text-gray-500">
                        {user.email || 'user@example.com'}
                      </p>
                    </div>
                    <a
                      href="#profile"
                      data-path="/myprofile"
                      onClick={handleNavigation}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 cursor-pointer"
                    >
                      Profile
                    </a>
                    <a
                      href="#settings"
                      data-path="/settings"
                      onClick={handleNavigation}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 cursor-pointer"
                    >
                      Settings
                    </a>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-violet-50 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;