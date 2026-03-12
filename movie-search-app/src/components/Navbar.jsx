import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiHome, FiFilm, FiHeart, FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle scroll effect with blur
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchFocused(false);
    }
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-netflix-black/90 backdrop-blur-md shadow-lg border-b border-white/10' 
            : 'bg-gradient-to-b from-netflix-black/80 to-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Left side - Logo and navigation */}
            <div className="flex items-center space-x-8">
              <Link 
                to="/" 
                className="text-netflix-red text-2xl font-bold tracking-wide hover:scale-105 transition-transform duration-200"
              >
                MOVIEFLIX
              </Link>
              
              {/* Desktop navigation */}
              <div className="hidden lg:flex items-center space-x-6">
                <Link 
                  to="/" 
                  className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/' 
                      ? 'text-white scale-105' 
                      : 'text-netflix-light-gray hover:text-white hover:scale-105'
                  }`}
                >
                  <FiHome className="text-base" />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/search" 
                  className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/search' 
                      ? 'text-white scale-105' 
                      : 'text-netflix-light-gray hover:text-white hover:scale-105'
                  }`}
                >
                  <FiFilm className="text-base" />
                  <span>Movies</span>
                </Link>
                
                <Link 
                  to="/my-list" 
                  className={`flex items-center space-x-1 text-sm font-medium transition-all duration-200 ${
                    location.pathname === '/my-list' 
                      ? 'text-white scale-105' 
                      : 'text-netflix-light-gray hover:text-white hover:scale-105'
                  }`}
                >
                  <FiHeart className="text-base" />
                  <span>My List</span>
                </Link>
              </div>
            </div>

            {/* Right side - Search and Profile */}
            <div className="flex items-center space-x-4">
              {/* Desktop search */}
              <div className="hidden md:block relative">
                <form onSubmit={handleSearch} className="relative">
                  <div className={`relative transition-all duration-300 ${
                    isSearchFocused ? 'scale-105' : 'scale-100'
                  }`}>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
                      placeholder="Search movies..."
                      className={`bg-netflix-gray text-white rounded-full py-2 px-4 pl-10 w-64 lg:w-72 text-sm focus:outline-none focus:ring-2 focus:ring-netflix-red/50 focus:bg-netflix-hover-gray transition-all duration-200 ${
                        isSearchFocused ? 'placeholder:text-gray-400' : 'placeholder:text-gray-500'
                      }`}
                    />
                    <FiSearch 
                      className={`absolute left-3 top-2.5 transition-colors duration-200 ${
                        isSearchFocused ? 'text-netflix-red' : 'text-gray-400'
                      } text-sm`} 
                    />
                  </div>
                </form>
              </div>

              {/* Profile button */}
              <button className="p-2 rounded-full hover:bg-netflix-hover-gray transition-all duration-200 hover:scale-110">
                <FiUser className="text-lg text-netflix-light-gray hover:text-white" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-full hover:bg-netflix-hover-gray transition-all duration-200 hover:scale-110"
              >
                {isMobileMenuOpen ? (
                  <FiX className="text-xl text-white" />
                ) : (
                  <FiMenu className="text-xl text-netflix-light-gray hover:text-white" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        <div className="md:hidden px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search movies..."
              className="w-full bg-netflix-gray text-white rounded-full py-2 px-4 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-netflix-red/50 focus:bg-netflix-hover-gray transition-all duration-200"
            />
            <FiSearch className="absolute left-3 top-2.5 text-gray-400 text-sm" />
          </form>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Mobile menu panel */}
          <div className="fixed top-16 left-0 right-0 bg-netflix-black border-b border-white/10 animate-slide-down">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/" 
                  className={`flex items-center space-x-3 text-lg font-medium transition-all duration-200 ${
                    location.pathname === '/' 
                      ? 'text-white' 
                      : 'text-netflix-light-gray hover:text-white'
                  }`}
                >
                  <FiHome className="text-xl" />
                  <span>Home</span>
                </Link>
                
                <Link 
                  to="/search" 
                  className={`flex items-center space-x-3 text-lg font-medium transition-all duration-200 ${
                    location.pathname === '/search' 
                      ? 'text-white' 
                      : 'text-netflix-light-gray hover:text-white'
                  }`}
                >
                  <FiFilm className="text-xl" />
                  <span>Movies</span>
                </Link>
                
                <Link 
                  to="/my-list" 
                  className={`flex items-center space-x-3 text-lg font-medium transition-all duration-200 ${
                    location.pathname === '/my-list' 
                      ? 'text-white' 
                      : 'text-netflix-light-gray hover:text-white'
                  }`}
                >
                  <FiHeart className="text-xl" />
                  <span>My List</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;