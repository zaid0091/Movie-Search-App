import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiPlay, FiInfo, FiPlus, FiStar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { getRandomMovies } from '../utils/helpers';
import { useFavorites } from '../context/FavoritesContext';

function HeroBanner() {
  const [featuredMovie, setFeaturedMovie] = useState(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavorited = featuredMovie ? isFavorite(featuredMovie.imdbID) : false;

  useEffect(() => {
    // Get a random movie for the hero banner
    const movies = getRandomMovies(1);
    setFeaturedMovie(movies[0]);
  }, []);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorited) {
      removeFromFavorites(featuredMovie.imdbID);
    } else {
      addToFavorites(featuredMovie);
    }
  };

  const handleTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (featuredMovie) {
      const trailerQuery = `${featuredMovie.Title} ${featuredMovie.Year} official trailer`;
      const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(trailerQuery)}`;
      window.open(youtubeUrl, '_blank');
    }
  };

  if (!featuredMovie) {
    return (
      <div className="h-[65vh] bg-gradient-to-r from-netflix-black to-netflix-gray flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-netflix-red border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white text-xl">Loading featured content...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: `url(${featuredMovie.Poster})`,
        }}
      />
      
      {/* Overlay gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-netflix-black via-netflix-black/80 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-netflix-black via-transparent to-transparent" />
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <div className="flex items-center space-x-3 mb-4">
            <span className="bg-netflix-red px-2 py-1 rounded text-sm font-bold text-white shadow-lg border border-netflix-red/50">
              FEATURED
            </span>
            {featuredMovie.imdbRating && (
              <div className="flex items-center space-x-1 text-white bg-black/50 px-2 py-1 rounded shadow-lg border border-white/30">
                <FiStar className="text-yellow-400" />
                <span className="font-semibold">{featuredMovie.imdbRating}</span>
              </div>
            )}
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
            {featuredMovie.Title}
          </h1>
          
          <div className="flex items-center space-x-4 mb-6 text-white">
            <span className="bg-black/50 px-2 py-1 rounded text-sm shadow-lg border border-white/30">
              {featuredMovie.Year}
            </span>
            <span className="bg-black/50 px-2 py-1 rounded text-sm capitalize shadow-lg border border-white/30">
              {featuredMovie.Type}
            </span>
            {featuredMovie.Rated && (
              <span className="border border-white bg-black/50 px-2 py-1 rounded text-sm shadow-lg">
                {featuredMovie.Rated}
              </span>
            )}
          </div>
          
          <p className="text-lg text-white mb-8 leading-relaxed max-w-xl drop-shadow-lg">
            {featuredMovie.Plot && featuredMovie.Plot !== 'N/A' 
              ? featuredMovie.Plot.substring(0, 150) + '...'
              : 'A compelling story that will keep you on the edge of your seat. Experience the magic of cinema with this outstanding film.'
            }
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.button
              onClick={handleTrailer}
              className="flex items-center space-x-2 bg-white text-black px-8 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FiPlay />
              <span>Play Trailer</span>
            </motion.button>
            
            <motion.button
              onClick={handleFavoriteToggle}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 shadow-xl border-2 ${
                isFavorited
                  ? 'bg-netflix-red text-white hover:bg-red-600 border-netflix-red'
                  : 'bg-black/70 text-white hover:bg-black/80 border-white/50'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isFavorited ? <FiPlus /> : <FiPlus />}
              <span>{isFavorited ? 'In My List' : 'Add to List'}</span>
            </motion.button>
            
            <Link
              to={`/movie/${featuredMovie.imdbID}`}
              className="flex items-center space-x-2 bg-black/70 text-white px-8 py-3 rounded-lg font-semibold hover:bg-black/80 transition-all duration-200 hover:scale-105 shadow-xl border-2 border-white/50"
            >
              <FiInfo />
              <span>More Info</span>
            </Link>
          </div>
        </motion.div>
      </div>
      
      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-netflix-black to-transparent pointer-events-none" />
      
      {/* Side gradient for better text readability */}
      <div className="absolute top-0 left-0 bottom-0 w-1/3 bg-gradient-to-r from-netflix-black to-transparent pointer-events-none" />
    </div>
  );
}

export default HeroBanner;