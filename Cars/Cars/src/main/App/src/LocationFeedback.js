import React from "react";

const LocationFeedback = () => {
  return (
    <div className="bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Left: Map Section */}
        <div className="w-full h-96 bg-gray-300 rounded-lg overflow-hidden shadow-md">
          {/* Replace this with your map component or iframe */}
          <iframe
            title="Google Map"
            className="w-full h-full"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345093743!2d144.95373531531568!3d-37.81720997975168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5779f9d9f21b5c9!2sEnvato!5e0!3m2!1sen!2sus!4v1631214461981!5m2!1sen!2sus"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>

        {/* Right: Feedback Section */}
        <div className="bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">We Value Your Feedback</h2>
          <p className="text-gray-600 mb-6">
            Let us know about your experience! Your feedback helps us improve
            and provide better services.
          </p>
          <form className="space-y-4">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your Email"
              />
            </div>

            {/* Feedback Textarea */}
            <div>
              <label
                htmlFor="feedback"
                className="block text-sm font-medium text-gray-700"
              >
                Feedback
              </label>
              <textarea
                id="feedback"
                rows="4"
                className="mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Write your feedback here..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-violet-500 text-white py-2 px-4 rounded-full hover:bg-violet-600"
            >
              Submit Feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationFeedback;
