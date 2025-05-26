
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent mb-4">
              StreamFlix
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Your ultimate destination for premium entertainment. Stream thousands of movies and TV shows in stunning quality.
            </p>
            <div className="flex space-x-4">
              <button className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-6 w-6" />
              </button>
              <button className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-6 w-6" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Movies</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">TV Shows</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">My List</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 StreamFlix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
