"use client";

import Headerr from "../headerr/page";
import Fotter from "../fotter/page";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";

export default function ContactUs() {
    const [formData, setFormData] = useState({
        category: "",
        name: "",
        email: "",
        message: "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevData => ({ ...prevData, [id]: value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
    
        const { category, name, email, message } = formData;
    
        // Validation
        if (!category || !name || !email || !message) {
            setError("All fields are required.");
            return;
        }
    
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Invalid email address.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3000/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                setSuccess(data.message);
                setFormData({
                    category: "",
                    name: "",
                    email: "",
                    message: "",
                });
            } else {
                setError(data.error || "Something went wrong. Please try again later.");
            }
        } catch (error) {
            setError("An unexpected error occurred. Please check your connection and try again.");
        }
    };
    

    return (
        <>
            <div className="fixed top-0 left-0 w-full bg-black z-50 text-red-500 transition-opacity duration-500 ease-in-out opacity-100">
                <Headerr />
            </div>
            <div className="pt-20 flex flex-col lg:flex-row justify-center bg-black text-white min-h-screen">
                <div className="flex flex-col lg:flex-row lg:gap-12 px-5">
                    
                    {/* Image Component */}
                    <div className="flex-1 flex justify-center items-center mb-6 lg:mb-0">
                        <img 
                            src="https://www.99career.co.uk/wp-content/uploads/2023/01/Smart-India-hackathon.jpg"
                            alt="Contact Us"
                            className="max-w-full h-[400px] transition-transform duration-500 ease-in-out transform hover:scale-105"
                        />
                    </div>

                    {/* Form Component */}
                    <div className="flex-1 flex flex-col items-center gap-5 max-w-lg">
                        <h2 className="text-white text-3xl font-bold text-center mb-6">Ask a Question</h2>
                        <div className="w-full max-w-xl">
                            <form onSubmit={handleSubmit} className="w-full space-y-4">
                                {error && <div className="mb-4 text-red-500 text-center">{error}</div>}
                                {success && <div className="mb-4 text-green-500 text-center">{success}</div>}
                                
                                <label htmlFor="category" className="block text-sm font-medium text-white mb-2">Category</label>
                                <select 
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full p-4 text-lg rounded border border-gray-600 bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700"
                                    required
                                >
                                    <option value="">Select Category</option>
                                    <option value="general">General Inquiry</option>
                                    <option value="support">Support</option>
                                    <option value="feedback">Feedback</option>
                                </select>
                                
                                <label htmlFor="name" className="block text-sm font-medium text-white mb-2">Name</label>
                                <input 
                                    id="name"
                                    type="text" 
                                    placeholder="Name" 
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full p-4 text-lg rounded border border-gray-600 bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700"
                                    required
                                />
                                
                                <label htmlFor="email" className="block text-sm font-medium text-white mb-2">Email</label>
                                <input 
                                    id="email"
                                    type="email" 
                                    placeholder="Email" 
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full p-4 text-lg rounded border border-gray-600 bg-gray-800 text-white transition-all duration-300 ease-in-out hover:bg-gray-700"
                                    required
                                />
                                
                                <label htmlFor="message" className="block text-sm font-medium text-white mb-2">Your Message</label>
                                <textarea 
                                    id="message"
                                    placeholder="Your Message" 
                                    rows="5"
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full p-4 text-lg rounded border border-gray-600 bg-gray-800 text-white resize-none transition-all duration-300 ease-in-out hover:bg-gray-700"
                                    required
                                ></textarea>
                                
                                <button 
                                    type="submit" 
                                    className="w-full p-4 text-lg text-white bg-red-500 rounded border-none cursor-pointer transition-transform duration-300 ease-in-out transform hover:scale-105 hover:bg-red-600"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* Contact Info Component */}
                    <div className="flex-1 flex flex-col items-center gap-4 text-lg">
                        <div className="flex items-center" style={{ marginTop: '100px' }}>
                            <i className="fas fa-envelope text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">info@example.com</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-phone text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">+123-456-7890</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fab fa-twitter text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">@example</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fab fa-facebook-f text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">/example</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fab fa-instagram text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">@example</span>
                        </div>
                        <div className="flex items-center">
                            <i className="fas fa-map-marker-alt text-red-500 mr-2" aria-hidden="true"></i> 
                            <span className="text-white">123 Example Street, City, Country</span>
                        </div>
                    </div>
                </div>
            </div>
            <Fotter />
        </>
    );
}
