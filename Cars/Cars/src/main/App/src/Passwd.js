import React from "react";

const Passwd = ({ SetSign, SetForgotpasswd }) => {
  const handleBack = () => {
    SetSign(false);
    SetForgotpasswd(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300">
      <div className="w-full max-w-md p-8 bg-white rounded-3xl shadow-xl transform transition duration-300 ">
        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Forgot Password
        </h2>
        <form className="space-y-6">
          {/* Email Field */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="mb-2 text-sm font-medium text-gray-600"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Enter your email"
              required
              className="px-4 py-2 border rounded-full focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-blue-600 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300 ease-in-out"
          >
            Send Email
          </button>
        </form>

        {/* Sign-up redirect */}
        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <span
            onClick={handleBack}
            className="text-blue-600 cursor-pointer hover:underline transition-all duration-300 ease-in-out"
          >
            Sign up now
          </span>
        </p>
      </div>
    </div>
  );
};

export default Passwd;
