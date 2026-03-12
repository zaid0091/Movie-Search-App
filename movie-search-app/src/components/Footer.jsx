import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiYoutube } from 'react-icons/fi';

function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Facebook"
          >
            <FiFacebook className="text-2xl" />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Twitter"
          >
            <FiTwitter className="text-2xl" />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="Instagram"
          >
            <FiInstagram className="text-2xl" />
          </a>
          <a 
            href="#" 
            className="text-gray-400 hover:text-white transition-colors"
            aria-label="YouTube"
          >
            <FiYoutube className="text-2xl" />
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Terms of Use</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Movies</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/search" className="hover:text-white transition-colors">Browse All</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">New Releases</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Top Rated</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Account</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/my-list" className="hover:text-white transition-colors">My List</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Settings</Link></li>
              <li><Link to="#" className="hover:text-white transition-colors">Sign Out</Link></li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-500">
            © 2026 MovieFlix. This is a demo application for educational purposes.
          </p>
          <p className="text-gray-600 text-sm mt-2">
            Built with React, Vite, and Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;