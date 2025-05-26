
import { Search, Bell, User, Menu } from "lucide-react";
import { useState } from "react";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
              StreamFlix
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <a href="#" className="hover:text-red-400 transition-colors duration-200">Home</a>
              <a href="#" className="hover:text-red-400 transition-colors duration-200">Movies</a>
              <a href="#" className="hover:text-red-400 transition-colors duration-200">TV Shows</a>
              <a href="#" className="hover:text-red-400 transition-colors duration-200">My List</a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200">
              <Search className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200">
              <Bell className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors duration-200">
              <User className="h-5 w-5" />
            </button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-white/10 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/90 backdrop-blur-sm rounded-lg mt-2">
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200">Home</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200">Movies</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200">TV Shows</a>
              <a href="#" className="block px-3 py-2 rounded-md hover:bg-white/10 transition-colors duration-200">My List</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
