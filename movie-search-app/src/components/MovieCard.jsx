import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiInfo, FiCheck, FiStar, FiShare2, FiExternalLink } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie, size = 'normal' }) {
  const [isHovered, setIsHovered] = useState(false);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavorited = isFavorite(movie.imdbID);

  const cardSize = {
    small: 'w-32 h-48',
    normal: 'w-48 h-72',
    large: 'w-64 h-96'
  };

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorited) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const handleShare = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    const movieUrl = `${window.location.origin}/movie/${movie.imdbID}`;
    const shareText = `Check out ${movie.Title} (${movie.Year}) - ${movie.imdbRating}/10 on IMDb`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.Title,
          text: shareText,
          url: movieUrl
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(`${shareText} ${movieUrl}`);
        alert('Movie link copied to clipboard!');
      }
    } catch (error) {
      console.log('Share failed:', error);
    }
  };

  const handleTrailer = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Search for trailer on YouTube
    const trailerQuery = `${movie.Title} ${movie.Year} official trailer`;
    const youtubeUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(trailerQuery)}`;
    window.open(youtubeUrl, '_blank');
  };

  // Generate a consistent gradient based on movie ID for variety
  const gradientColors = [
    'from-purple-900/50 to-pink-900/50',
    'from-blue-900/50 to-cyan-900/50',
    'from-green-900/50 to-emerald-900/50',
    'from-orange-900/50 to-red-900/50',
    'from-indigo-900/50 to-purple-900/50'
  ];
  const gradientIndex = movie.imdbID ? movie.imdbID.charCodeAt(3) % gradientColors.length : 0;

  if (!movie || movie.Poster === 'N/A') {
    return (
      <div className={`${cardSize[size]} bg-netflix-gray rounded-lg flex items-center justify-center text-netflix-light-gray border border-netflix-gray/50`}>
        <div className="text-center p-4">
          <FiFilm className="text-3xl mx-auto mb-2 opacity-50" />
          <span className="text-xs">No Image</span>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Movie Poster */}
        <div className={`${cardSize[size]} rounded-lg overflow-hidden relative shadow-xl border border-netflix-gray/30`}>
          <img
            src={movie.Poster}
            alt={movie.Title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          
          {/* Gradient overlay that appears on hover */}
          <div className={`absolute inset-0 bg-gradient-to-t ${gradientColors[gradientIndex]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Rating badge */}
          {movie.imdbRating && (
            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-sm px-2 py-1 rounded-md flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FiStar className="text-yellow-500 text-xs" />
              <span className="text-white text-xs font-semibold">{movie.imdbRating}</span>
            </div>
          )}
          
          {/* Hover Content */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              className="absolute inset-0 p-4 flex flex-col justify-end"
            >
              {/* Action Buttons */}
              <div className="flex space-x-2 mb-3">
                <button 
                  onClick={handleTrailer}
                  className="bg-white text-black p-2.5 rounded-full hover:bg-gray-200 transition-all duration-200 hover:scale-110 shadow-lg"
                  title="Watch Trailer"
                >
                  <FiPlay className="text-lg" />
                </button>
                
                <button
                  onClick={handleFavoriteToggle}
                  className={`p-2.5 rounded-full transition-all duration-200 hover:scale-110 shadow-lg ${
                    isFavorited 
                      ? 'bg-netflix-red text-white hover:bg-red-600' 
                      : 'bg-netflix-gray/80 text-white hover:bg-netflix-hover-gray'
                  }`}
                  title={isFavorited ? "Remove from List" : "Add to List"}
                >
                  {isFavorited ? <FiCheck className="text-lg" /> : <FiPlus className="text-lg" />}
                </button>
                
                <button
                  onClick={handleShare}
                  className="bg-netflix-gray/80 text-white p-2.5 rounded-full hover:bg-netflix-hover-gray transition-all duration-200 hover:scale-110 shadow-lg"
                  title="Share Movie"
                >
                  <FiShare2 className="text-lg" />
                </button>
                
                <Link 
                  to={`/movie/${movie.imdbID}`}
                  onClick={(e) => e.stopPropagation()}
                  className="bg-netflix-gray/80 text-white p-2.5 rounded-full hover:bg-netflix-hover-gray transition-all duration-200 hover:scale-110 shadow-lg"
                  title="More Info"
                >
                  <FiInfo className="text-lg" />
                </Link>
              </div>
              
              {/* Movie Info */}
              <div className="text-white">
                <h3 className="font-bold text-lg truncate mb-1">{movie.Title}</h3>
                <div className="flex items-center space-x-2 text-sm">
                  <span className="bg-netflix-red px-1.5 py-0.5 rounded text-xs font-bold">
                    {movie.Year}
                  </span>
                  <span className="text-netflix-light-gray capitalize">{movie.Type}</span>
                  {movie.Runtime && (
                    <span className="text-netflix-light-gray">{movie.Runtime}</span>
                  )}
                </div>
                {movie.Genre && (
                  <div className="text-xs text-netflix-light-gray mt-1 truncate">
                    {movie.Genre}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Favorite indicator (always visible when favorited) */}
          {isFavorited && !isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute top-2 right-2 bg-netflix-red rounded-full p-1.5 shadow-lg"
            >
              <FiCheck className="text-white text-sm" />
            </motion.div>
          )}
        </div>
        
        {/* Title below card (non-hover state) */}
        {!isHovered && (
          <motion.div 
            className="mt-2 px-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-medium text-sm truncate group-hover:text-netflix-red transition-colors duration-200">
              {movie.Title}
            </h3>
            <p className="text-netflix-light-gray text-xs">{movie.Year}</p>
          </motion.div>
        )}
      </Link>
    </motion.div>
  );
}

export default MovieCard;