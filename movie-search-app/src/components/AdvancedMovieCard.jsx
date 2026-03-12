import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiPlay, FiPlus, FiInfo, FiCheck, FiVolume2, FiVolumeX } from 'react-icons/fi';
import { useFavorites } from '../context/FavoritesContext';

function AdvancedMovieCard({ movie, size = 'normal', enableTrailerPreview = true }) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const isFavorited = isFavorite(movie.imdbID);

  const cardSize = {
    small: 'w-32 h-48',
    normal: 'w-48 h-72',
    large: 'w-64 h-96'
  };

  // Handle trailer preview
  useEffect(() => {
    if (enableTrailerPreview && isHovered && videoRef.current) {
      // In a real app, you'd fetch the actual trailer URL
      // For demo, we'll simulate with a placeholder
      const timer = setTimeout(() => {
        setShowTrailer(true);
      }, 800); // Delay before showing trailer
      
      return () => clearTimeout(timer);
    } else {
      setShowTrailer(false);
    }
  }, [isHovered, enableTrailerPreview]);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isFavorited) {
      removeFromFavorites(movie.imdbID);
    } else {
      addToFavorites(movie);
    }
  };

  const toggleMute = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMuted(!isMuted);
  };

  if (!movie || movie.Poster === 'N/A') {
    return (
      <div className={`${cardSize[size]} bg-gray-800 rounded-lg flex items-center justify-center text-gray-500 relative`}>
        <span>No Image</span>
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs">
          {movie?.Year || 'N/A'}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="relative cursor-pointer group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.05, zIndex: 20 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/movie/${movie.imdbID}`} className="block">
        {/* Movie Container */}
        <div className={`${cardSize[size]} rounded-lg overflow-hidden relative shadow-2xl`}>
          {/* Poster/Image */}
          {!showTrailer ? (
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            // Trailer placeholder - in real app this would be an iframe or video element
            <div className="w-full h-full bg-black flex items-center justify-center relative">
              <div className="text-center text-white">
                <FiPlay className="text-4xl mx-auto mb-2 animate-pulse" />
                <p className="text-sm">Trailer Preview</p>
                <p className="text-xs text-gray-400 mt-1">Demo Mode</p>
              </div>
              
              {/* Mute toggle for trailer */}
              <button
                onClick={toggleMute}
                className="absolute top-2 right-2 bg-black bg-opacity-70 p-2 rounded-full hover:bg-opacity-90 transition-all"
              >
                {isMuted ? <FiVolumeX /> : <FiVolume2 />}
              </button>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
          
          {/* Hover Content */}
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute inset-0 p-4 flex flex-col justify-end"
            >
              {/* Action Buttons */}
              <div className="flex space-x-2 mb-3">
                <button className="bg-white text-black p-2 rounded-full hover:bg-gray-200 transition-colors shadow-lg">
                  <FiPlay className="text-lg" />
                </button>
                
                <button
                  onClick={handleFavoriteToggle}
                  className="bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all shadow-lg"
                >
                  {isFavorited ? <FiCheck className="text-lg" /> : <FiPlus className="text-lg" />}
                </button>
                
                <button className="bg-gray-800 bg-opacity-70 text-white p-2 rounded-full hover:bg-opacity-100 transition-all shadow-lg">
                  <FiInfo className="text-lg" />
                </button>
              </div>
              
              {/* Movie Info */}
              <div className="text-white">
                <h3 className="font-bold text-lg truncate">{movie.Title}</h3>
                <div className="flex items-center space-x-2 text-sm mt-1">
                  <span className="bg-green-600 px-1 py-0.5 rounded text-xs font-bold">
                    {movie.Year}
                  </span>
                  <span className="text-gray-300 capitalize">{movie.Type}</span>
                  {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                    <span className="flex items-center space-x-1 text-yellow-400">
                      <FiStar className="text-xs" />
                      <span className="text-xs">{movie.imdbRating}</span>
                    </span>
                  )}
                </div>
                
                {/* Genre tags */}
                {movie.Genre && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {movie.Genre.split(', ').slice(0, 2).map((genre, index) => (
                      <span 
                        key={index}
                        className="bg-gray-700 bg-opacity-70 text-xs px-2 py-1 rounded"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
          
          {/* Favorite indicator */}
          {isFavorited && !isHovered && (
            <div className="absolute top-2 right-2 bg-red-600 rounded-full p-1 shadow-lg">
              <FiCheck className="text-white text-sm" />
            </div>
          )}
          
          {/* Year badge */}
          {!isHovered && (
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 px-2 py-1 rounded text-xs text-white">
              {movie.Year}
            </div>
          )}
        </div>
        
        {/* Title below card (non-hover state) */}
        {!isHovered && (
          <div className="mt-2 px-1">
            <h3 className="text-white font-medium text-sm truncate">{movie.Title}</h3>
            <div className="flex items-center space-x-2 text-xs text-gray-400 mt-1">
              <span>{movie.Year}</span>
              {movie.imdbRating && movie.imdbRating !== 'N/A' && (
                <span className="flex items-center space-x-1">
                  <FiStar className="text-yellow-400 text-xs" />
                  <span>{movie.imdbRating}</span>
                </span>
              )}
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

export default AdvancedMovieCard;