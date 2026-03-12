import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiTrash2, FiHeart, FiFilm } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import SkeletonCard from '../components/SkeletonCard';

function MyList() {
  const { favorites, removeFromFavorites } = useFavorites();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for smooth UX
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleRemoveFavorite = (imdbID, e) => {
    e.stopPropagation();
    removeFromFavorites(imdbID);
  };

  if (isLoading) {
    return (
      <div className="pt-24 pb-16 min-h-screen bg-netflix-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <div className="h-10 bg-netflix-gray rounded w-1/4 mb-4 animate-pulse" />
            <div className="h-6 bg-netflix-gray rounded w-1/2 animate-pulse" />
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            <SkeletonCard count={12} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-netflix-black">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-netflix-red/20 rounded-full">
              <FiHeart className="text-netflix-red text-2xl" />
            </div>
            <h1 className="text-3xl font-bold text-white">My List</h1>
          </div>
          
          {favorites.length > 0 ? (
            <motion.p 
              className="text-netflix-light-gray text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              You have {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} in your list
            </motion.p>
          ) : (
            <motion.p 
              className="text-netflix-light-gray text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Your list is empty. Start adding movies you love!
            </motion.p>
          )}
        </motion.div>

        {/* Empty State */}
        {favorites.length === 0 && !isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6 opacity-60">💔</div>
            <h2 className="text-2xl font-bold text-white mb-4">Your List is Empty</h2>
            <p className="text-netflix-light-gray max-w-md mx-auto mb-8 text-lg">
              Add movies to your list by clicking the "+" button on any movie card
            </p>
            <motion.button
              onClick={() => window.location.href = '/'}
              className="bg-netflix-red text-white px-8 py-4 rounded-lg hover:bg-red-600 transition-all duration-200 font-semibold text-lg hover:scale-105 shadow-xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Movies
            </motion.button>
          </motion.div>
        )}

        {/* Favorites Grid */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6"
          >
            {favorites.map((movie, index) => (
              <motion.div
                key={movie.imdbID}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="relative group"
              >
                <MovieCard movie={movie} size="normal" />
                
                {/* Enhanced Remove button overlay */}
                <motion.button
                  onClick={(e) => handleRemoveFavorite(movie.imdbID, e)}
                  className="absolute top-3 right-3 bg-netflix-red text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 hover:bg-red-600 z-20 shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Remove from favorites"
                >
                  <FiTrash2 className="text-sm" />
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Stats section for non-empty lists */}
        {favorites.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16 p-6 bg-netflix-gray/20 rounded-xl border border-netflix-gray/30"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <FiFilm className="text-netflix-red text-xl" />
                <span className="text-white font-semibold">Collection Stats</span>
              </div>
              <div className="text-netflix-light-gray">
                {favorites.length} {favorites.length === 1 ? 'movie' : 'movies'} saved
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default MyList;