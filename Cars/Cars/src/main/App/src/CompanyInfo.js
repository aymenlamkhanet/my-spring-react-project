import { useNavigate } from "react-router-dom";

function CompanyInfo() {

  const navigate = useNavigate();

  const handleNavigation = (e) => {
    // Get the path from the data attribute
    const path = e.target.getAttribute("data-path");
    if (path) {
      navigate(path);
    }
  };
  return (
    <div className="bg-gradient-to-r from-violet-600 to-purple-800 text-white p-8">
      <div className=" p-6 rounded-lg  max-w-screen-lg mx-auto">
        {/* Title Section */}
        <h1 className="text-5xl font-extrabold text-white mb-6">
          Why Choose greatsite Cars?
        </h1>

        {/* Description Section */}
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 mb-8">
          At greatsite Cars, we are committed to delivering exceptional services
          with unmatched expertise. Our solutions are designed to help you
          succeed and ensure you achieve your goals with ease.
        </p>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
          <div className="bg-gradient-to-r from-violet-500 to-pink-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
            <h3 className="text-xl font-bold mb-2">Expertise</h3>
            <p>
              With years of experience, our team provides high-level solutions
              tailored to your needs.
            </p>
          </div>
          <div className="bg-gradient-to-r from-violet-500 to-pink-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
            <h3 className="text-xl font-bold mb-2">Customization</h3>
            <p>
              We create personalized strategies and solutions that align with
              your goals and vision.
            </p>
          </div>
          <div className="bg-gradient-to-r from-violet-500 to-pink-600 text-white p-6 rounded-xl shadow-lg transform hover:scale-105 transition-all">
            <h3 className="text-xl font-bold mb-2">Customer Satisfaction</h3>
            <p>
              Our top priority is your satisfaction, ensuring that we meet your
              expectations every time.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <a
            href="#contact"
            data-path="/contact"
            onClick={handleNavigation}
            className="bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 text-white rounded-full font-semibold hover:bg-gradient-to-l hover:from-pink-500 hover:to-violet-600 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </div>
  );
}

export default CompanyInfo;
