import logo from "./Logo2.png";
import { useState } from "react";
import InputField from "./Field";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = ({ SetForgotpasswd, SetSign, Sign }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tele, setTele] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate =useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the form is for login or sign-up
    if (Sign) {
      // For login
      if (email && password) {
        try {
          // Send login data to the back-end (Spring Boot)
          const response = await axios.post(
            "http://localhost:8080/utilisateur/login",
            { 
              email: email,
              password: password, 
            },
            {
              headers: {
                'Content-Type': 'application/json', // Ensures that the backend expects JSON
              },
            }
          );
          console.log("Login successful:", response.data);
          // Optionally, you can store the response data like JWT token or user info if needed
          clearFields();
          navigate("/admin");
        } catch (error) {
          console.error("Login error:", error.response ? error.response.data : error.message);
          alert(error.response ? error.response.data : "Login failed");
        }
      } else {
        alert("Please fill in both email and password");
        console.log("Email or Password is missing.");
      }
    } else {
      // For sign-up
      if (
        email &&
        password &&
        confirmPassword &&
        name &&
        prenom &&
        adresse &&
        tele
      ) {
        if (password === confirmPassword) {
          try {
            // Send the registration data to the back-end (Spring Boot)
            const response = await axios.post(
              "http://localhost:8080/utilisateur/add",
              {
                nom: name,
                prenom: prenom,
                adresse: adresse,
                numTelephone: tele,
                email: email,
                password: password,
              },
              {
                headers: {
                  'Content-Type': 'application/json', // Ensures that the backend expects JSON
                },
              }
            );
            console.log("User registered:", response.data);
            clearFields();
            alert("Registration successful");
          } catch (error) {
            alert("Error registering user");
            console.error("Error registering user:", error);
          }
        } else {
          alert("Passwords do not match");
          clearFields();
        }
      } else {
        alert("Please fill all the fields");
        console.log("Some fields are missing");
      }
    }
  };

  const handleForgotPassword = () => {
    clearFields();
    SetForgotpasswd(true);
  };

  const handleSignUpClick = () => {
    clearFields();
    SetSign(false);
  };

  const handleSignInClick = () => {
    clearFields();
    SetSign(true);
  };

  const clearFields = () => {
    setEmail("");
    setPassword("");
    setName("");
    setPrenom("");
    setAdresse("");
    setTele("");
    setConfirmPassword("");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 pt-40 pb-40">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-3xl p-8 max-w-md w-full space-y-8 transform transition duration-300"
      >
        {/* Logo Section */}
        <div className="flex justify-center">
          <img
            src={logo}
            alt="Logo"
            className="h-25 w-25 object-contain transition duration-500 hover:rotate-12 hover:scale-110"
          />
        </div>

        {/* Conditional Input Fields */}
        {!Sign && (
          <>
            <InputField
              label="Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
            />
            <InputField
              label="Prenom"
              type="text"
              value={prenom}
              onChange={(e) => setPrenom(e.target.value)}
              placeholder="Enter your prenom"
            />
            <InputField
              label="Adresse"
              type="text"
              value={adresse}
              onChange={(e) => setAdresse(e.target.value)}
              placeholder="Enter your adresse"
            />
            <InputField
              label="Tele"
              type="text"
              value={tele}
              onChange={(e) => setTele(e.target.value)}
              placeholder="Enter your phone number"
            />
          </>
        )}

        {/* Email and Password Fields */}
        <InputField
          label="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
        />
        <InputField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
        {!Sign && (
          <InputField
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
          />
        )}

        {/* Remember Me and Forgot Password */}
        <div className="flex justify-between items-center">
          <label className="flex items-center text-sm text-gray-700">
            <input type="checkbox" className="mr-2" />
            Remember me
          </label>
          <span
            onClick={handleForgotPassword}
            className="text-sm text-blue-500 cursor-pointer hover:underline"
          >
            Forgot password?
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-full shadow-md hover:bg-blue-700 hover:shadow-lg transition-all duration-300"
        >
          {Sign ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Between Sign Up and Sign In */}
        <p className="text-sm text-gray-600 text-center">
          {Sign ? (
            <span>
              Don’t have an account?{" "}
              <span
                onClick={handleSignUpClick}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Sign Up
              </span>
            </span>
          ) : (
            <span>
              Already have an account?{" "}
              <span
                onClick={handleSignInClick}
                className="text-blue-500 cursor-pointer hover:underline"
              >
                Log In
              </span>
            </span>
          )}
        </p>
      </form>
    </div>
  );
};

export default Register;
