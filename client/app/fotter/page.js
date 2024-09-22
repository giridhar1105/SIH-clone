export default function Footer() {
    return (
        <div className="p-4 bg-[#001F3F] flex justify-between items-start">
            <div>
                <h1 className="text-xl font-bold pl-40 pt-0 text-white">
                    Follow Us
                </h1>
                <div className="flex space-x-6 pt-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
                        <i className="fab fa-facebook-f"></i>
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
                        <i className="fab fa-instagram"></i>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
                        <i className="fab fa-twitter"></i>
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
                        <i className="fab fa-linkedin-in"></i>
                    </a>
                </div>
            </div>
            <div className="flex-1 flex flex-col items-center">
                <a href="/contact" className="text-white text-lg font-bold hover:text-gray-300 mb-2">
                    Contact Us
                </a>
                <div className="text-white text-base flex flex-col items-center">
                    <div className="flex items-center space-x-2 mb-2">
                        <i className="fas fa-phone"></i>
                        <span>+1 (234) 567-8900</span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <i className="fas fa-envelope"></i>
                        <span>info@example.com</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
