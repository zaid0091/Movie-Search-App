import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiHome, FiSearch } from 'react-icons/fi';

function NotFound() {
  return (
    <div className="pt-16 min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <div className="text-center px-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
          className="text-9xl mb-8"
        >
          🎬
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold text-white mb-4"
        >
          404
        </motion.h1>
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-semibold text-white mb-6"
        >
          Page Not Found
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl text-gray-400 mb-10 max-w-md mx-auto"
        >
          Oops! The page you're looking for doesn't exist. Looks like you've ventured into uncharted cinematic territory.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 bg-red-600 text-white px-8 py-4 rounded-lg hover:bg-red-700 transition-colors font-semibold text-lg"
          >
            <FiHome />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/search"
            className="flex items-center justify-center space-x-2 bg-gray-700 text-white px-8 py-4 rounded-lg hover:bg-gray-600 transition-colors font-semibold text-lg"
          >
            <FiSearch />
            <span>Search Movies</span>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <p className="text-gray-500">
            Need help? <Link to="/search" className="text-red-400 hover:text-red-300 underline">Search for movies</Link> or explore our collection
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default NotFound;