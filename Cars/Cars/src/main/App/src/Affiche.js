import cc from "./audi.png";

function Affiche() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between text-violet-700 p-8">
      {/* Left Side - Image */}
      <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
        <img
          src="https://www.motortrend.com/uploads/2022/09/2024-Mercedes-AMG-C63-S-E-Performance-sedan-38.jpg"
          alt="Mercedes-Benz C-Class"
          className="rounded-lg shadow-xl object-cover w-full h-full outline outline-2 outline-offset-8 outline-violet-600"
        />
      </div>

      {/* Right Side - Text */}
      <div className="w-full lg:w-1/2 pl-0 lg:pl-8 text-center lg:text-left">
        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 hidden sm:block">
          2024 Mercedes-Benz C-Class
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl lg:text-2xl mb-4 hidden sm:block">
          Experience the luxury and performance of the 2024 Mercedes-Benz
          C-Class. With a dynamic design, cutting-edge technology, and unrivaled
          comfort, it redefines what it means to drive in style.
        </p>

        <a
          href="#start"
          className="bg-violet-800 px-6 py-3 rounded-full text-white font-semibold hover:bg-violet-600 transition-all duration-300"
        >
          Learn More
        </a>
      </div>
    </div>
  );
}

export default Affiche;
