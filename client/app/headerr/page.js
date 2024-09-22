"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Headerr = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <motion.header
      className="fixed w-full bg-black text-white shadow-md z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <nav className="flex items-center justify-between p-4 mx-auto max-w-screen-xl">
        {/* Logo and Confetti */}
        <motion.div
          className="font-bold text-2xl cursor-pointer flex-shrink-0 ml-[-1rem] pr-6 text-red-500"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Smart India Hackathon
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button
          className="lg:hidden p-2 bg-gray-200 rounded-md ml-4"
          aria-label="Toggle menu"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {isOpen ? 'X' : '☰'}
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex flex-grow items-center gap-8">
          <button className="hover:text-red-500" onClick={() => router.push("/Dashboard")}>
            Home
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/AboutSIH")}>
            About SIH
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/Guidelines")}>
            Guidelines
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/ProblemStatements")}>
            Problem Statements
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/ProjectImplementation")}>
            Project Implementation
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/FAQs")}>
            FAQs
          </button>
          <button className="hover:text-red-500" onClick={() => router.push("/ContactUs")}>
            Contact Us
          </button>
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4 flex-shrink-0 ml-auto pl-7">
          <motion.button
            className="hidden lg:inline-flex bg-red-500 text-white py-2 px-4 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => { router.push("/Signup"); setIsOpen(false); }}
          >
            Sign Up
          </motion.button>
          <motion.button
            className="bg-transparent border border-red-500 text-red-500 py-2 px-4 rounded-full"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={() => { router.push("/Login"); setIsOpen(false); }}
          >
            Login
          </motion.button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="fixed top-0 left-0 w-full h-full bg-white p-4 flex flex-col items-start z-40 lg:hidden"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/Dashboard"); setIsOpen(false); }}>
              Home
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/AboutSIH"); setIsOpen(false); }}>
              About SIH
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/Guidelines"); setIsOpen(false); }}>
              Guidelines
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/ProblemStatements"); setIsOpen(false); }}>
              Problem Statements
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/KnowyourSPOC"); setIsOpen(false); }}>
              Know your SPOC
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/ProjectImplementation"); setIsOpen(false); }}>
              Project Implementation
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/FAQs"); setIsOpen(false); }}>
              FAQs
            </button>
            <button className="text-lg mb-2 text-red-500" onClick={() => { router.push("/ContactUs"); setIsOpen(false); }}>
              Contact Us
            </button>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Headerr;
