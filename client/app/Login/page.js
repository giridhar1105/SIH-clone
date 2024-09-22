"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onLogin(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const data = { username, password };
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.status === 404) {
        window.alert("User not found. Please sign up first.");
        router.push("/Signup");
      } else if (response.status === 401) {
        window.alert("Incorrect password. Please try again.");
      } else if (response.status === 200) {
        setUsername("");
        setPassword("");
        localStorage.setItem("username", username);
        window.alert("Login successful!");
        router.push("/Dashboard");
      } else {
        window.alert("Login failed. Please try again later.");
      }
    } catch (err) {
      console.error("Login error:", err.message);
      window.alert("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
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
        If You Already Have An Account
      </motion.div>
      <div className="bg-black flex items-center justify-center h-screen">
        <motion.div
          className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-center font-bold mb-6 text-3xl text-red-500">
            Login
          </h1>
          <form onSubmit={onLogin}>
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
            <div className="mb-6">
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
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
}

export default Login;
