import { useNavigate } from "react-router-dom";

function CarShowcase() {
  const navigate = useNavigate();

  const handleNavigation = (e) => {
    // Get the path from the data attribute
    const path = e.target.getAttribute("data-path");
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="relative text-violet-700 p-12">
      {/* Content Section */}
      <div className="relative z-10 max-w-screen-lg mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">
          Why Our Cars Stand Out
        </h2>
        <p className="text-lg sm:text-xl mb-12">
          Our cars offer unmatched performance, luxurious features, and
          cutting-edge technology. Here's why we stand apart:
        </p>

        {/* Flashing Features Section - New Style with Violet, Black, and White */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tl from-violet-700 to-black  transform hover:scale-105 hover:rotate-3 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Unrivaled Performance
            </h3>
            <p className="text-lg text-white">
              Experience acceleration that rivals the best in the industry with
              our top-of-the-line engines.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tl from-violet-600 to-black  transform hover:scale-105 hover:rotate-3 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-white">
              State-of-the-Art Technology
            </h3>
            <p className="text-lg text-white">
              Enjoy cutting-edge features like autonomous driving, digital
              dashboards, and advanced connectivity.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow-lg bg-gradient-to-tl from-violet-500 to-black  transform hover:scale-105 hover:rotate-3 transition-all">
            <h3 className="text-2xl font-bold mb-2 text-white">
              Unmatched Luxury
            </h3>
            <p className="text-lg text-white">
              Indulge in the finest materials, comfort, and design, making every
              drive a first-class experience.
            </p>
          </div>
        </div>

        {/* Highlighted Comparison Section */}
        <div className="mt-12 bg-violet-800 bg-opacity-50 p-8 rounded-xl shadow-lg">
          <h3 className="text-3xl font-bold text-white mb-6">
            Why Choose Us Over The Others?
          </h3>
          <p className="text-lg sm:text-xl text-white mb-4">
            While other brands focus on one aspect of performance, we offer a
            perfect balance of speed, technology, and luxury.
          </p>
          <ul className="list-disc list-inside text-white text-lg">
            <li>Faster acceleration times than leading competitors</li>
            <li>Smarter in-car technology with AI integration</li>
            <li>
              Superior craftsmanship with every detail designed for comfort
            </li>
            <li>Lower maintenance costs and longer vehicle lifespan</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <a
            href="#contact"
            data-path="/carpage"
            onClick={handleNavigation}
            className="bg-gradient-to-r from-pink-600 to-violet-700 px-8 py-4 text-white rounded-full font-semibold hover:bg-gradient-to-l hover:from-pink-500 hover:to-violet-600 transition-all"
          >
            Get Yours Today
          </a>
        </div>
      </div>
    </div>
  );
}

export default CarShowcase;
