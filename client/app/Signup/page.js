"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp, setOtp] = useState(""); // New state for OTP
  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false); // State for OTP loading
  const [error, setError] = useState("");
  const router = useRouter();

  async function onSignup(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password && password !== confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const data = { username, email, password: password || undefined, otp }; // Include OTP in the data
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 201) {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setOtp(""); // Clear OTP field on success
        window.alert("Signup successful! Redirecting to login...");
        router.push("/Login");
      } else {
        window.alert("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup error:", err.message);
      window.alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  async function getOtp() {
    setOtpLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:3000/get-otp", { // Adjust the URL as necessary
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email }), // Send email to get OTP
      });

      if (response.ok) {
        window.alert("OTP sent to your email!");
      } else {
        setError("Failed to send OTP. Please try again.");
      }
    } catch (err) {
      console.error("OTP error:", err.message);
      setError("An error occurred while sending OTP. Please try again later.");
    } finally {
      setOtpLoading(false);
    }
  }

  return (
    <>
      <motion.div
        className="flex items-center justify-center w-full bg-black cursor-pointer font-bold text-red-500 py-2"
        onClick={() => router.push("/")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        If You Are Not Registered
      </motion.div>
      <div className="bg-black flex items-center justify-center h-screen">
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center font-bold mb-6 text-3xl text-red-500">
            Signup
          </h1>
          <form onSubmit={onSignup}>
            {error && (
              <div className="mb-4 text-red-500 text-center">{error}</div>
            )}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-red-400"
              >
                Username
              </label>
              <motion.input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-label="Username"
                className="mt-1 p-3 w-full border rounded-md border-gray-600 bg-gray-900 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-shadow duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-red-400"
              >
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email"
                className="mt-1 p-3 w-full border rounded-md border-gray-600 bg-gray-900 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-shadow duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-red-400"
              >
                Password
              </label>
              <motion.input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-label="Password"
                className="mt-1 p-3 w-full border rounded-md border-gray-600 bg-gray-900 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-shadow duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-red-400"
              >
                Confirm Password
              </label>
              <motion.input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                aria-label="Confirm Password"
                className="mt-1 p-3 w-full border rounded-md border-gray-600 bg-gray-900 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-shadow duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-red-400"
              >
                OTP
              </label>
              <motion.input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                aria-label="OTP"
                className="mt-1 p-3 w-full border rounded-md border-gray-600 bg-gray-900 text-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 shadow-sm transition-shadow duration-300"
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>
            <motion.button
              type="button" // Change to button type
              onClick={getOtp}
              disabled={otpLoading || !email} // Disable if loading or email is empty
              className={`bg-red-500 text-white p-3 w-full rounded-md mt-5 ${
                otpLoading ? "bg-red-300 cursor-not-allowed" : "hover:bg-red-600"
              } shadow-md transition-transform duration-300 ${
                !otpLoading ? "hover:scale-105" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {otpLoading ? "Sending OTP..." : "Get OTP"}
            </motion.button>
            <motion.button
              type="submit"
              disabled={loading}
              className={`bg-red-500 text-white p-3 w-full rounded-md mt-5 ${
                loading ? "bg-red-300 cursor-not-allowed" : "hover:bg-red-600"
              } shadow-md transition-transform duration-300 ${
                !loading ? "hover:scale-105" : ""
              }`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {loading ? "Signing up..." : "Signup"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Signup;
