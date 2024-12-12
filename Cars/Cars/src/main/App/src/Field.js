import React from "react";

const InputField = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="block text-gray-700 font-medium">{label}</label>
      <div className="flex items-center border border-gray-300 rounded-full p-2 focus-within:ring-2 focus-within:ring-blue-500">
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="ml-2 w-full outline-none text-gray-700 focus:text-blue-500"
        />
      </div>
    </div>
  );
};

export default InputField;
